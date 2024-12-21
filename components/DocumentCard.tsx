"use client";
import {deleteDocument} from "@/app/actions/documents";
import {useToast} from "@/hooks/use-toast";
import {PDFDocumentType} from "@/lib/type";
import {dateFormat, formatFileSize} from "@/lib/utils";
import {X} from "lucide-react";
import React, {useState} from "react";

export default function DocumentCard({item}: {item: PDFDocumentType}) {
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();
  const submit = async () => {
    setLoading(true);
    const {error} = JSON.parse(await deleteDocument(item.id));
    if (error) {
      toast({title: "Something went wrong", variant: "destructive"});
    }
    setLoading(false);
  };
  return (
    <div className="bg-secondary rounded-lg p-3 max-w-60 w-full relative" key={item.id}>
      <div className="absolute -top-2 -right-2">
        <button
          onClick={submit}
          className={`hover:bg-red-400 cursor-pointer rounded-full text-white bg-red-500 ${loading && "loading"} `}
        >
          <X />
          <span></span>
        </button>
      </div>
      <div
        className="border-b border-muted-foreground/20 mb-2 pb-2 text-nowrap overflow-hidden text-ellipsis"
        title={item.title}
      >
        {item.title}
      </div>
      <div className="flex justify-center items-center">
        <img src="/pdf-file.png" alt={item.title} className="w-10 h-10 object-cover" />
      </div>
      <div className="border-t border-muted-foreground/20 pt-2 mt-2 text-sm text-muted-foreground flex justify-between items-center">
        <div>{dateFormat(item.created_at)}</div>
        <div>{formatFileSize(item.size)}</div>
      </div>
    </div>
  );
}
