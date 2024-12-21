"use client";
import {Separator} from "@/components/ui/separator";
import {PDFDocumentType} from "@/lib/type";
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import ChatWrapper from "./chatWindow/ChatWrapper";
import DocPreview from "./DocPreview";
import PdfRenderer from "./docs/PdfRenderer";

export default function RsizableChat({
  docs,
  allDocs,
  id,
  activeDoc,
  setActiveDoc,
}: {
  activeDoc: string;
  setActiveDoc: any;
  docs: PDFDocumentType[];
  allDocs: PDFDocumentType[];
  id: string;
}) {
  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={10} minSize={10} maxSize={20} className="">
        <DocPreview allDocs={allDocs} docs={docs} activeDoc={activeDoc} setActiveDoc={setActiveDoc} id={id} />
      </Panel>
      <PanelResizeHandle className="w-1 bg-muted ">
        <Separator orientation="vertical" className="h-full mx-auto w-[1px]" />
      </PanelResizeHandle>

      <Panel defaultSize={40} minSize={30}>
        <PdfRenderer url={activeDoc} />
      </Panel>

      <PanelResizeHandle className="w-1 bg-muted">
        <Separator orientation="vertical" className="h-full mx-auto w-[1px]" />
      </PanelResizeHandle>

      <Panel defaultSize={30} minSize={30} maxSize={50}>
        <ChatWrapper chatId={id} />
      </Panel>
    </PanelGroup>
  );
}