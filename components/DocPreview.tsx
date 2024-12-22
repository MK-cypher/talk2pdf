"use client";
import {PDFDocumentType} from "@/lib/type";
import {Plus} from "lucide-react";
import ChatsDialog from "./ChatsDialog";
import DocPreviewCard from "./DocPreviewCard";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "./ui/dialog";
import {useEffect, useState} from "react";
import PdfRenderer from "./docs/PdfRenderer";

export default function DocPreview({
  id,
  docs,
  setActiveDoc,
  activeDoc,
  allDocs,
  mobile,
  title,
}: {
  id: string;
  docs: PDFDocumentType[];
  activeDoc: string;
  setActiveDoc: any;
  allDocs: PDFDocumentType[];
  mobile?: boolean;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const exist = docs.some((e) => e.url == activeDoc);
    if (!exist) {
      setActiveDoc(docs[0].url);
    }
  }, [docs]);
  return (
    <div className="flex flex-col gap-3 justify-center items-center px-3">
      <Dialog>
        <DialogTrigger className="border hover:bg-secondary/80 transition-all duration-300 w-full p-2 px-3 rounded-lg flex justify-center items-center">
          <Plus />
        </DialogTrigger>
        <ChatsDialog title={title} allDocs={allDocs} data={docs} id={id} />
      </Dialog>
      {docs && docs.length ? (
        docs.map((item) => (
          <DocPreviewCard
            setOpen={setOpen}
            mobile
            activeDoc={activeDoc}
            setActiveDoc={setActiveDoc}
            key={item.id}
            item={item}
          />
        ))
      ) : (
        <></>
      )}
      {mobile ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent aria-describedby={undefined} className="max-h-svh max-w-[100svw] overflow-y-auto">
            <DialogTitle></DialogTitle>
            <PdfRenderer mobile url={activeDoc} />
          </DialogContent>
        </Dialog>
      ) : (
        <></>
      )}
    </div>
  );
}
