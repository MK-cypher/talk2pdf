"use server";

import {createSupabaseServerClient} from "@/lib/db/server";
import {getSubscription} from "@/lib/payment/stripe";

export const getUser = async () => {
  const supabase = await createSupabaseServerClient();

  let {data, error} = await supabase.from("users").select("*, subscription(*)").single();
  if (error) {
    console.log(error);
    return null;
  }
  const {isSub, isActive, currentPlan} = await getSubscription(data);
  data = {...data, isSub, isActive, currentPlan};
  return data;
};
