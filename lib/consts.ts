import {ChatMessageType} from "./type";

export const MSGS_PER_PAGE = 10;

export const navLinks = [
  {
    link: "How it works",
    href: "#work",
  },
  {
    link: "Pricing",
    href: "#pricing",
  },
];

export const asideLinks = [
  {link: "Documents", href: "/dashboard"},
  {link: "Chat", href: "/dashboard/chat"},
];

export const documents = [
  {title: "document 1 lfkajslkf fldsakfj ldkasfj", id: "doc-id-1231414", created_at: "18 Dec 2024", size: 800},
  {title: "document 2", id: "doc-id-12414", created_at: "18 Dec 2024", size: 800},
  {title: "document 3", id: "doc-id-123114", created_at: "18 Dec 2024", size: 800},
  {title: "document 4", id: "doc-id-1341", created_at: "18 Dec 2024", size: 800},
];

export const steps = [
  {title: "Sign up", description: "create Your account and choose Your plan"},
  {title: "Upload Your Files", description: "Choose the files you want to chat with"},
  {title: "create new chat", description: "start chatting with the documents you choose"},
];

export const chats = [
  {
    id: "fkllakf",
    name: "chat name 1 adfklj lkdflak jflk",
    created_at: "18 Dec 2024",
    documents: ["doc 1", "doc 1", "doc 1", "doc 1"],
  },
  {id: "fkljlf", name: "chat name 1", created_at: "18 Dec 2024", documents: ["doc 1", "doc 1", "doc 1", "doc 1"]},
  {id: "fklla", name: "chat name 1", created_at: "18 Dec 2024", documents: ["doc 1", "doc 1", "doc 1", "doc 1"]},
  {id: "klakf", name: "chat name 1", created_at: "18 Dec 2024", documents: ["doc 1", "doc 1", "doc 1", "doc 1"]},
];

export const chatbotWelcomeMsg: ChatMessageType = {
  role: "Assistant",
  message: "Hello, What can I help you with!",
};

export const prices = [
  {
    type: "FREE",
    price: {
      monthly: {
        amount: 0,
        id: "",
      },
      annual: {
        amount: 0,
        id: "",
      },
    },
    description: "Join Now for FREE",
    features: ["4MB file size", "Chat with 5 Documents", "20 pages per PDF"],
  },
  {
    type: "PRO",
    price: {
      monthly: {
        amount: 20,
        id: "price_1QYYckB01l3tgmUVPGwfo2dT",
      },
      annual: {
        amount: 200,
        id: "price_1QYYdDB01l3tgmUVvlLz2clV",
      },
    },
    description: "Unlock Your full Experience",
    features: ["16MB file size", "Chat with 20 Documents", "50 pages per PDF"],
  },
];
