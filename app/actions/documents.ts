"use server";

import {createSupabaseServerClient} from "@/lib/db/server";
import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf";
import {Pinecone} from "@pinecone-database/pinecone";
import {PineconeStore} from "@langchain/pinecone";
import {OpenAIEmbeddings} from "@langchain/openai";
import {getUser} from "./users";
import {revalidatePath} from "next/cache";

interface DbFileInterface {
  title: string;
  size: number;
  url: string;
}
interface FileInterface {
  name: string;
  size: number;
  url: string;
  type?: string;
}

export const saveDocument = async (files: FileInterface[]) => {
  const supabase = await createSupabaseServerClient();
  const data: DbFileInterface[] = [];
  files.forEach((item) => {
    if (item.type == "application/pdf") {
      data.push({
        title: item.name,
        size: item.size,
        url: item.url,
      });
    }
  });
  const {error} = await supabase.from("documents").insert(data);

  try {
    for (const {url, title} of data) {
      console.log("embedding", title);
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const loader = new PDFLoader(blob);
        const pageLevelDocs = await loader.load();

        const finalData = pageLevelDocs.map((pdf) => {
          return {
            ...pdf,
            metadata: {
              ...pdf.metadata,
              url,
            },
          };
        });

        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPEN_AI_API,
          modelName: "text-embedding-3-small",
        });
        const pinecone = new Pinecone({
          apiKey: process.env.PINECONE_API!,
        });
        const pineconeIndex = pinecone.index(process.env.INDEX_NAME!);
        await PineconeStore.fromDocuments(finalData, embeddings, {
          pineconeIndex,
          filter: {url},
        });
      } catch (err) {
        console.log("update db", err);
        const {error} = await supabase.from("documents").update({status: "Failed"}).eq("url", url);
      }
    }
  } catch (err) {
    console.log(err);
    return JSON.stringify({error: true});
  } finally {
    revalidatePath("/dashboard");
  }

  if (error) {
    console.log(error);
    return JSON.stringify({error: true});
  }
  return JSON.stringify({error: false});
};

export const deleteDocument = async (id: string) => {
  const supabase = await createSupabaseServerClient();
  const {error} = await supabase.from("documents").delete().eq("id", id);
  if (error) {
    console.log(error);
    return JSON.stringify({error: false});
  }
  revalidatePath("/dashboard");
  return JSON.stringify({error: false});
};

export const getDocuments = async () => {
  const supabase = await createSupabaseServerClient();

  const {data, error} = await supabase.from("documents").select("*");
  if (error) {
    console.log(error);
    return [];
  }
  return data;
};
