"use client";
import ChatBotInput from "./ChatBotInput";
import ChatMessages from "./ChatMessages";

export default function ChatWrapper({chatId}: {chatId: string}) {
  return (
    <div className="h-[calc(100vh-9.3rem)] overflow-y-auto flex flex-col">
      <ChatMessages chatId={chatId} />
      <ChatBotInput chatId={chatId} />
    </div>
  );
}
