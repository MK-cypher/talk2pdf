import {getChats} from "@/app/actions/chat";
import {getDocuments} from "@/app/actions/documents";
import AddChat from "@/components/AddChat";
import ChatCard from "@/components/ChatCard";

export default async function page() {
  const documents = await getDocuments();
  const chats = await getChats();
  return (
    <div className="container">
      <div className="my-5">
        <AddChat allDocs={documents} />
      </div>
      <div className="flex items-center gap-5 flex-wrap">
        {chats.map((item) => (
          <ChatCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
