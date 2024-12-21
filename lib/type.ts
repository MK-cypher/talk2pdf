export type ChatMessageType = {
  role: "User" | "Assistant";
  message: string;
};

export type PDFDocumentType = {title: string; id: string; created_at: string; size: number; url: string};

export type ChatType = {id: string; name: string; created_at: string; documents: string[]};

export type PriceType = {
  type: string;
  price: {monthly: {amount: number; id: string}; annual: {amount: number; id: string}};
  description: string;
  features: string[];
};
