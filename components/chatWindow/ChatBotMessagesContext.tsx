"use client";
import {chatbotWelcomeMsg, MSGS_PER_PAGE} from "@/lib/consts";
import {ChatMessageType, PDFDocumentType} from "@/lib/type";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {clearMsgs, getMsgs, sendMessage} from "@/app/actions/messages";

interface ChatBotContextType {
  messages: ChatMessageType[];
  finalMsg: boolean;
  addLoading: boolean;
  initMsgs: (msgs: ChatMessageType[]) => void;
  addMessage: (msg: string, chatId: string) => void;
  resetChatbot: (id: string) => void;
  ChatbotloadMore: (id: string) => void;
  updateDocs: (docs: string[]) => void;
}

const ChatBotContext = createContext<ChatBotContextType | undefined>(undefined);

export const ChatBotProvider = ({children}: {children: ReactNode}) => {
  const {toast} = useToast();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [range, setRange] = useState([MSGS_PER_PAGE + 1, MSGS_PER_PAGE * 2 + 1]);
  const [finalMsg, setFinalMsg] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [docs, setDocs] = useState<string[]>([]);

  const initMsgs = (msgs: ChatMessageType[]) => {
    if (msgs.length < MSGS_PER_PAGE) {
      setMessages(msgs);
    } else {
      setMessages(msgs);
    }
  };

  const updateDocs = (docs: string[]) => {
    setDocs(docs);
  };

  const addMessage = async (msg: string, chatId: string) => {
    setAddLoading(true);
    setMessages((prev) => [{message: msg, role: "User"}, ...prev]);
    let latestHistory: ChatMessageType[] = [];
    if (messages.length > 10) {
      latestHistory = messages.slice(messages.length - 10);
    } else {
      latestHistory = messages;
    }
    const {response, error} = JSON.parse(await sendMessage(msg, latestHistory, docs, chatId));
    if (error) {
      toast({title: "Something went wrong", variant: "destructive"});
    } else {
      setMessages((prev) => [{message: response, role: "Assistant"}, ...prev]);
    }
    setAddLoading(false);
  };

  const resetChatbot = async (id: string) => {
    if (messages.length > 1) {
      setMessages([chatbotWelcomeMsg]);
      const {error} = JSON.parse(await clearMsgs(id));
      if (error) {
        toast({title: "Something went wrong", variant: "destructive"});
      }
    }
  };

  const ChatbotloadMore = async (id: string) => {
    if (!loadingMore) {
      setLoadingMore(true);
      const res = JSON.parse(await getMsgs(id, range[0], range[1]));
      if (res.length) {
        setMessages((prev) => [...prev, ...res]);
      } else {
        setMessages((prev) => [...prev, chatbotWelcomeMsg]);
        setFinalMsg(true);
      }
      setRange((current) => [current[0] + MSGS_PER_PAGE + 1, current[1] + MSGS_PER_PAGE + 1]);
      setLoadingMore(false);
    }
  };

  return (
    <ChatBotContext.Provider
      value={{messages, finalMsg, addLoading, initMsgs, updateDocs, addMessage, resetChatbot, ChatbotloadMore}}
    >
      {children}
    </ChatBotContext.Provider>
  );
};

export const useChatBot = (): ChatBotContextType => {
  const context = useContext(ChatBotContext);
  if (!context) throw new Error("need Chatbot context provider");
  return context;
};
