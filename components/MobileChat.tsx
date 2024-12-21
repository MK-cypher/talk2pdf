"use client";
import {PanelLeftOpen, X} from "lucide-react";
import ChatWrapper from "./chatWindow/ChatWrapper";
import {useState} from "react";
import {PDFDocumentType} from "@/lib/type";
import DocPreview from "./DocPreview";

export default function MobileChat({
  docs,
  allDocs,
  chatId,
  activeDoc,
  setActiveDoc,
}: {
  activeDoc: string;
  setActiveDoc: any;
  docs: PDFDocumentType[];
  allDocs: PDFDocumentType[];
  chatId: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="-top-7 left-2 absolute hover:opacity-50 transition-all duration-300 text-muted-foreground"
      >
        <PanelLeftOpen />
      </button>
      <div
        className={`${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 left-0 fixed h-[calc(100vh-4rem)] top-[4rem] w-full max-w-56 bg-background z-10 pt-8`}
      >
        <button
          className="absolute top-0 right-0 p-2"
          onClick={() => {
            setOpen(false);
          }}
        >
          <X />
        </button>
        <div className="h-[calc(100vh-6rem)] overflow-y-auto px-2">
          <DocPreview
            mobile
            allDocs={allDocs}
            docs={docs}
            activeDoc={activeDoc}
            setActiveDoc={setActiveDoc}
            id={chatId}
          />
        </div>
      </div>
      <ChatWrapper chatId={chatId} />
    </div>
  );
}
