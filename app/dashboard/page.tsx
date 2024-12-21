import AddDocument from "@/components/AddDocument";
import DocumentCard from "@/components/DocumentCard";
import {getDocuments} from "../actions/documents";
import {Ghost} from "lucide-react";

export default async function page() {
  const documents = await getDocuments();
  return (
    <div className="container">
      <div className="my-5">
        <AddDocument />
      </div>
      <div className="flex items-center gap-5 flex-wrap">
        {documents.length ? (
          documents.map((item) => <DocumentCard item={item} key={item.id} />)
        ) : (
          <div className="mt-20 flex justify-center w-full">
            <div>
              <div className="flex justify-center mb-2 animate-pulse">
                <Ghost size={50} className="text-muted-foreground" />
              </div>

              <div className="text-2xl">You Have no Documents</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
