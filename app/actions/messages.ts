"use server";
import {MSGS_PER_PAGE} from "@/lib/consts";
import {createSupabaseServerClient} from "@/lib/db/server";
import {ChatMessageType} from "@/lib/type";
import {OpenAIEmbeddings} from "@langchain/openai";
import OpenAI from "openai";
import {Pinecone} from "@pinecone-database/pinecone";

export const getMsgs = async (id: string, from = 0, to = MSGS_PER_PAGE) => {
  const supabase = await createSupabaseServerClient();

  const {data, error} = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", id)
    .range(from, to)
    .order("created_at", {ascending: false});
  if (error) {
    console.log(error);
    return JSON.stringify([]);
  }
  if (!data.length) return JSON.stringify([]);
  return JSON.stringify(data);
};

export const clearMsgs = async (id: string) => {
  const supabase = await createSupabaseServerClient();

  const {error} = await supabase.from("messages").delete().eq("chat_id", id);
  if (error) {
    console.log(error);
    return JSON.stringify({error: true});
  }
  return JSON.stringify({error: false});
};

export const sendMessage = async (msg: string, history: ChatMessageType[], documents: string[], chatId: string) => {
  const template = `Use the following CONTEXT
  (or previous conversaton if needed) to respond to the USER INPUT.\n
  reform the CONTEXT to make the best respond for the USER INPUT.\n
  If the CONTEXT doesn't not have any information about the topic of the USER INPUT, just say I'm sorry but I can't respond to that.\n
  if the USER INPUT and the CONTEXT are not in the same language you can translate the context but always answer in the USER INPUT language.\n
  if the user greet you greet him back in a nice way.`;

  let latestHistory: ChatMessageType[] = [];
  if (history.length > 10) {
    latestHistory = history.slice(history.length - 10);
  } else {
    latestHistory = history;
  }

  try {
    const supabase = await createSupabaseServerClient();
    const {error} = await supabase.from("messages").insert({message: msg, role: "User", chat_id: chatId});
    if (error) return JSON.stringify({error: true});
    console.log(documents);

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPEN_AI_API!,
      modelName: "text-embedding-3-small",
    });
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API!,
    });
    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API!,
    });

    const pineconeIndex = pinecone.index(process.env.INDEX_NAME!);

    const messageEmbedding = await embeddings.embedQuery(msg);

    const vectorDocs = await pineconeIndex.query({
      topK: 4,
      vector: messageEmbedding,
      includeValues: true,
      includeMetadata: true,
      filter: {url: {$in: documents}},
    });

    const filteredDocs = vectorDocs.matches.map((doc) => ({
      pageContent: doc.metadata?.text,
    }));

    let context = filteredDocs.map((item) => item.pageContent).join("\n");
    console.log(context);

    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.5,
      messages: [
        {
          role: "system",
          content: template,
        },
        {
          role: "user",
          content: `
          PREVIOUS CONVERSATION:
          ${JSON.stringify(
            latestHistory.map((item) => {
              return `${item.role} : ${item.message}`;
            })
          )}
          \n
          CONTEXT:
          ${JSON.stringify(context)}
          \n
          USER INPUT: ${msg}`,
        },
      ],
    });

    const response = res.choices[0].message.content;

    const {error: e2} = await supabase.from("messages").insert({message: response, role: "Assistant", chat_id: chatId});

    // const response = "hello from AI";
    return JSON.stringify({
      error: false,
      response,
    });
  } catch (err) {
    return JSON.stringify({
      error: true,
    });
  }
};
