"use client";
import {PDFDocumentType} from "@/lib/type";
import {Dialog} from "./ui/dialog";
import {useState} from "react";

export default function DocPreviewCard({
  setActiveDoc,
  activeDoc,
  item,
  mobile,
  setOpen,
}: {
  activeDoc: string;
  setActiveDoc: any;
  item: PDFDocumentType;
  mobile?: boolean;
  setOpen?: any;
}) {
  return (
    <>
      <div
        className={`cursor-pointer p-2 px-3 hover:bg-primary/30 transition-all duration-300 w-full rounded-lg flex flex-col justify-center items-center relative ${
          activeDoc == item.url ? "bg-primary" : "bg-secondary"
        }`}
        onClick={() => {
          setActiveDoc(item.url);
          if (mobile) {
            setOpen(true);
          }
        }}
        key={item.id}
      >
        <img src="/pdf-file.png" alt={item.title} className="w-10 h-10" />
        <div className="text-ellipsis overflow-hidden text-nowrap w-full">{item.title}</div>
      </div>
    </>
  );
}
