import {Plus} from "lucide-react";
import React from "react";
import {Button, buttonVariants} from "./ui/button";
import {Dialog, DialogContent, DialogTrigger} from "./ui/dialog";
import ChatsDialog from "./ChatsDialog";
import {PDFDocumentType} from "@/lib/type";

export default function AddChat({allDocs}: {allDocs: PDFDocumentType[]}) {
  return (
    <Dialog>
      <DialogTrigger className={`${buttonVariants()}`}>
        Add Chat <Plus />
      </DialogTrigger>
      <ChatsDialog allDocs={allDocs} />
    </Dialog>
  );
}
