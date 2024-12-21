import {getChatDocs} from "@/app/actions/chat";
import {getDocuments} from "@/app/actions/documents";
import {getMsgs} from "@/app/actions/messages";
import ChatPage from "@/components/ChatPage";
export const maxDuration = 60;

export default async function page({params}: {params: {id: string}}) {
  const {id} = await params;
  const allDocuments = await getDocuments();
  const messages = JSON.parse(await getMsgs(id));
  // @ts-ignore
  const {docs, ids} = await getChatDocs(id);
  return (
    <div>
      <ChatPage allDocuments={allDocuments} chatDocs={docs} id={id} ids={ids} messages={messages} />
    </div>
  );
}
