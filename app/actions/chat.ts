"use server";

import {createSupabaseServerClient} from "@/lib/db/server";
import {revalidatePath} from "next/cache";

export const saveChat = async (name: string, documents: string[]) => {
  if (!documents.length) return JSON.stringify({error: "You must select at least one document"});
  const supabase = await createSupabaseServerClient();
  const {data, error} = await supabase.from("chats").insert({name, documents}).select("id");

  if (error) {
    console.log(error);
    return JSON.stringify({error: "Something Went Wrong"});
  }
  console.log(data);
  return JSON.stringify({error: false, id: data[0].id});
};
export const updateChat = async (name: string, documents: string[], id: string) => {
  if (!documents.length) return JSON.stringify({error: "You must select at least one document"});
  const supabase = await createSupabaseServerClient();
  const {data, error} = await supabase.from("chats").update({name, documents}).eq("id", id);

  if (error) {
    console.log(error);
    return JSON.stringify({error: true});
  }
  revalidatePath(`dashboard/chat/${id}`);
  return JSON.stringify({error: false});
};

export const deleteChat = async (id: string) => {
  const supabase = await createSupabaseServerClient();
  const {error} = await supabase.from("chats").delete().eq("id", id);
  if (error) {
    console.log(error);
    return JSON.stringify({error: true});
  }
  revalidatePath(`/dashboard/chat`);
  return JSON.stringify({error: false});
};

export const getChats = async () => {
  const supabase = await createSupabaseServerClient();

  const {data, error} = await supabase.from("chats").select("*");
  if (error) {
    console.log(error);
    return [];
  }
  return data;
};

export const getChatDocs = async (id: string) => {
  const supabase = await createSupabaseServerClient();

  const {data: chat, error} = await supabase.from("chats").select("name,documents").eq("id", id);
  if (!error && chat.length) {
    const {data: docs, error: err2} = await supabase.from("documents").select("*").in("url", chat[0]?.documents);
    if (!err2) {
      return {docs, ids: chat[0].documents, title: chat[0].name};
    }
    console.log("error 2", err2);
  }
  console.log("error", error);
  return [];
};
