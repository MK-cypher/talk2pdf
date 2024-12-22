"use client";

import {useEffect, useState} from "react";
import ResizableChat from "./ResizableChat";
import MobileChat from "./MobileChat";
import {ChatMessageType, PDFDocumentType} from "@/lib/type";
import {useChatBot} from "./chatWindow/ChatBotMessagesContext";

export default function ChatPage({
  allDocuments,
  chatDocs,
  id,
  ids,
  messages,
  title,
}: {
  allDocuments: PDFDocumentType[];
  chatDocs: PDFDocumentType[];
  id: string;
  ids: string[];
  messages: ChatMessageType[];
  title: string;
}) {
  const {updateDocs, initMsgs} = useChatBot();
  const [activeDoc, setActiveDoc] = useState(chatDocs[0].url);
  const [mobile, setMobile] = useState(false);
  const handleResize = () => {
    const width = window.innerWidth;
    setMobile(width < 800);
  };

  useEffect(() => {
    updateDocs(ids);
    initMsgs(messages);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-[calc(100vh-6.1rem)]">
      {mobile ? (
        <MobileChat
          chatId={id}
          activeDoc={activeDoc}
          setActiveDoc={setActiveDoc}
          allDocs={allDocuments}
          docs={chatDocs}
          title={title}
        />
      ) : (
        <ResizableChat
          title={title}
          activeDoc={activeDoc}
          setActiveDoc={setActiveDoc}
          allDocs={allDocuments}
          docs={chatDocs}
          id={id}
        />
      )}
    </div>
  );
}
