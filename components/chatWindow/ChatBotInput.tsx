"use client";
import {Send} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {useChatBot} from "./ChatBotMessagesContext";

export default function ChatBotInput({chatId}: {chatId: string}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const textAreaRef = useRef<any>(null);
  const {addMessage} = useChatBot();
  const submit = async () => {
    setLoading(true);
    addMessage(message, chatId);
    setMessage("");
    setLoading(false);
  };

  useEffect(() => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 5}px`;
  }, [message]);
  return (
    <div className="bg-secondary p-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!loading) submit();
        }}
      >
        <div id="chat-input-section" className="w-full flex items-center gap-2 p-3">
          <textarea
            rows={1}
            className="min-h-10 max-h-32 resize-none "
            disabled={loading && true}
            value={message}
            readOnly={false}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder={"Your Message"}
            ref={textAreaRef}
          />
          <button disabled={loading && true} className="text-primary">
            <Send />
          </button>
        </div>
      </form>
    </div>
  );
}
