"use client";
import React, {useEffect, useState} from "react";
import {DialogContent, DialogTitle} from "./ui/dialog";
import {PDFDocumentType} from "@/lib/type";
import {Check, Pen} from "lucide-react";
import {Button} from "./ui/button";
import {saveChat, updateChat} from "@/app/actions/chat";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {useChatBot} from "./chatWindow/ChatBotMessagesContext";

export default function ChatsDialog({
  id,
  title,
  data,
  allDocs,
}: {
  id?: string;
  title?: string;
  data?: PDFDocumentType[];
  allDocs: PDFDocumentType[];
}) {
  const {toast} = useToast();
  const {updateDocs} = useChatBot();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(title || "Chat Title");
  const [selectedIds, setSelectedIds] = useState<string[]>(data && data.length ? data.map((item) => item.url) : []);
  const [selectdDocs, setSelectdDocs] = useState<PDFDocumentType[]>(
    allDocs && allDocs.length ? allDocs.filter((item) => selectedIds?.includes(item.url)) : []
  );
  const [restDocs, setRestDocs] = useState<PDFDocumentType[]>(
    allDocs && allDocs.length ? allDocs.filter((item) => !selectedIds?.includes(item.url)) : []
  );

  useEffect(() => {
    setRestDocs(allDocs && allDocs.length ? allDocs.filter((item) => !selectedIds?.includes(item.url)) : []);
    setSelectdDocs(allDocs && allDocs.length ? allDocs.filter((item) => selectedIds?.includes(item.url)) : []);
    updateDocs(selectedIds);
  }, [selectedIds]);

  const submit = async () => {
    if (!selectedIds.length) return toast({title: "You must select at least one document", variant: "destructive"});
    setLoading(true);
    if (id) {
      const {error} = JSON.parse(await updateChat(newTitle, selectedIds, id));
      if (error) {
        toast({title: error, variant: "destructive"});
      }
    } else {
      const {id, error} = JSON.parse(await saveChat(newTitle, selectedIds));
      if (error) {
        toast({title: error, variant: "destructive"});
      } else {
        router.push(`/dashboard/chat/${id}`);
      }
    }
    setLoading(false);
  };
  return (
    <DialogContent>
      <DialogTitle>
        <div
          onClick={() => {
            setEditable(true);
          }}
          className="flex items-center gap-5 cursor-pointer text-xl font-bold w-fit"
        >
          {editable ? (
            <input
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  e.currentTarget.blur();
                }
              }}
              autoFocus
              className="min-w-[60px] pr-5"
              onBlur={(e) => {
                setEditable(false);
              }}
              onChange={(e) => {
                const value = e.target.value;
                setNewTitle(value);
              }}
              id="amount"
              name="amount"
              defaultValue={newTitle}
              readOnly={false}
            />
          ) : (
            <div className="font-bold text-2xl">{newTitle}</div>
          )}
          {!editable && <Pen size={18} className="text-primary" />}
        </div>
      </DialogTitle>

      <div className="mb-5">
        <div className="font-bold mb-2">Selected Documents:</div>
        {selectdDocs.length ? (
          <div className="flex items-center gap-3 flex-wrap">
            {selectdDocs.map((item) => (
              <button
                className="w-32 rounded-lg p-2 bg-secondary relative"
                key={item.url}
                onClick={() => {
                  setSelectedIds((prev) => prev.filter((id) => id != item.url));
                }}
              >
                <div className="absolute -top-1 -right-1 rounded-full bg-primary flex items-center justify-center p-0.5">
                  <Check size={18} />
                </div>
                <div className="text-nowrap text-ellipsis overflow-hidden">{item.title}</div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground">No Documents have been selected</div>
        )}
      </div>
      {restDocs.length ? (
        <div className="mb-5 flex items-center gap-3 flex-wrap">
          {restDocs.map((item) => (
            <button
              className="w-32 rounded-lg p-2 bg-secondary relative"
              key={item.url}
              onClick={() => {
                setSelectedIds((prev) => [...prev, item.url]);
              }}
            >
              <div className="absolute -top-0 -right-0 rounded-full bg-background h-5 w-5"></div>
              <div className="text-nowrap text-ellipsis overflow-hidden">{item.title}</div>
            </button>
          ))}
        </div>
      ) : (
        <></>
      )}

      <Button className={`mt-5 ${loading && "loading"}`} onClick={submit}>
        Save
        <span></span>
      </Button>
    </DialogContent>
  );
}
