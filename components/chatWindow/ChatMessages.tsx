"use client";
import {useEffect, useRef} from "react";
import {useChatBot} from "./ChatBotMessagesContext";

export default function ChatMessages({chatId}: {chatId: string}) {
  const {messages, finalMsg, addLoading, ChatbotloadMore} = useChatBot();
  const chatContainerRef = useRef<any>(null);

  function handleScroll() {
    const chatContainer = chatContainerRef.current;
    const isTop = chatContainer.scrollHeight - chatContainer.clientHeight - 2 + chatContainer.scrollTop < 0;
    if (isTop && !finalMsg) {
      ChatbotloadMore(chatId);
    }
  }
  useEffect(() => {
    handleScroll();
  }, []);
  return (
    <div
      ref={chatContainerRef}
      onScroll={handleScroll}
      className="h-full bg-secondary p-2 overflow-y-auto flex flex-col-reverse gap-3 overflow-x-hidden"
    >
      {addLoading && (
        <div className="flex flex-col">
          <div
            className={`assistant-bubble h-10 common-chat-bubble whitespace-pre-wrap`}
            style={{"--chat-bubbles-bg": "hsl(var(--card))"} as React.CSSProperties}
          >
            <div className="assistant-typing h-full">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}
      {messages.map((item, i) => (
        <div
          key={i}
          style={
            item.role == "User"
              ? ({"--chat-bubbles-bg": "hsl(var(--primary))"} as React.CSSProperties)
              : ({"--chat-bubbles-bg": "hsl(var(--card))"} as React.CSSProperties)
          }
          className={`${
            item.role == "User"
              ? "user-bubble common-chat-bubble whitespace-pre-wrap text-white"
              : "assistant-bubble common-chat-bubble whitespace-pre-wrap"
          }`}
        >
          <p className="chat-bubble-message">{item.message}</p>
        </div>
      ))}
    </div>
  );
}
