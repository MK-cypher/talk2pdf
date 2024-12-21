"use client";
import {deleteChat} from "@/app/actions/chat";
import {useToast} from "@/hooks/use-toast";
import {ChatType} from "@/lib/type";
import {dateFormat} from "@/lib/utils";
import {X} from "lucide-react";
import Link from "next/link";
import {useState} from "react";

export default function ChatCard({item}: {item: ChatType}) {
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();
  const submit = async () => {
    setLoading(true);
    const {error} = JSON.parse(await deleteChat(item.id));
    if (error) {
      toast({title: "Something went wrong", variant: "destructive"});
    }
    setLoading(false);
  };
  return (
    <div className="bg-secondary rounded-lg p-3 w-60 relative" key={item.id}>
      <div className="absolute -top-2 -right-2 z-[3]">
        <button
          onClick={submit}
          className={`hover:bg-red-400 cursor-pointer rounded-full text-white bg-red-500 ${loading && "loading"} `}
        >
          <X />
          <span></span>
        </button>
      </div>
      <Link href={`/dashboard/chat/${item.id}`}>
        <div
          className="border-b border-muted-foreground/20 mb-2 pb-2 text-nowrap overflow-hidden text-ellipsis"
          title={item.name}
        >
          {item.name}
        </div>
        <div className="flex justify-center items-center">
          <img src="/pdf-file.png" alt={item.name} className="w-10 h-10 object-cover" />
        </div>
        <div className="border-t border-muted-foreground/20 pt-2 mt-2 text-sm text-muted-foreground flex justify-between items-center">
          <div>{dateFormat(item.created_at)}</div>
          <div className="flex items-center gap-1">
            {item.documents.length}
            <img src="/pdf-file.png" alt="documents" className="h-5 w-5" />
          </div>
        </div>
      </Link>
    </div>
  );
}
