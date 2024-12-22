"use client";
import React, {useState} from "react";
import {buttonVariants} from "@/components/ui/button";
import {Cloud, Plus, X, AlertCircle} from "lucide-react";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Progress} from "@/components/ui/progress";
import {UploadButton, useUploadThing} from "@/lib/uploadthing";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {saveDocument} from "@/app/actions/documents";
import {useToast} from "@/hooks/use-toast";
import {useUser} from "./UserContext";
import {formatFileSize} from "@/lib/utils";

export default function AddDocument() {
  const {toast} = useToast();
  const {user} = useUser();
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const startProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        console.log(prev);
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        } else {
          return prev + 5;
        }
      });
    }, 500);
    return interval;
  };

  const {startUpload, isUploading} = useUploadThing(user.isSub ? "propdfUploader" : "pdfUploader", {
    onClientUploadComplete: async (res) => {
      console.log("Files uploaded:", res);
      const {error} = JSON.parse(await saveDocument(res));
      if (error) {
        toast({title: "Something went wrong!", variant: "destructive"});
      } else {
        toast({title: "Files have been uploaded successfully", variant: "success"});
      }
    },
    onUploadError: (err) => {
      setError(err.message);
    },
  });

  const handleUpload = async () => {
    try {
      if (files.length === 0) return;
      const interval = startProgress();
      await startUpload(files);
      clearInterval(interval);
      setUploadProgress(100);
      const timeout = setTimeout(() => {
        setFiles([]);
        clearTimeout(timeout);
      }, 1500);
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Error uploading files. Please try again.");
    }
  };

  const removeFile = (index: number) => {
    if (isUploading) return;
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants()}>
        <Plus className="mr-2 h-4 w-4" />
        Add Documents
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogTitle>Upload PDF Documents</DialogTitle>

        <div className="rounded-lg bg-secondary/50 border border-dashed flex justify-center items-center w-full h-64 relative">
          <div className="flex flex-col justify-center items-center gap-2">
            <Cloud className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Click to upload or drag and drop PDFs</p>
            <p className="text-xs text-muted-foreground">PDF files up to {user.isSub ? "16" : "4"}MB</p>
          </div>
          <input
            type="file"
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            accept="application/pdf"
            disabled={isUploading}
            onChange={(e) => {
              setUploadProgress(0);
              if (e.target.files) {
                const newFiles = Array.from(e.target.files).filter((file) => file.type === "application/pdf");
                setFiles((prev) => [...prev, ...newFiles]);
              }
            }}
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {files.length > 0 && (
          <div className="mt-6 space-y-4">
            {files.map((file, index) => (
              <div key={index} className="bg-secondary rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <img src="/pdf-file.png" alt="" className="w-5 h-5" />
                    <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-muted-foreground hover:text-foreground disabled:opacity-50"
                    disabled={isUploading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-1">
                  <Progress value={uploadProgress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatFileSize(file.size)}</span>
                    <span>{uploadProgress}%</span>
                  </div>
                </div>
              </div>
            ))}

            <button onClick={handleUpload} className={buttonVariants({className: "w-full"})} disabled={isUploading}>
              {isUploading ? "Uploading..." : `Upload ${files.length} file${files.length > 1 ? "s" : ""}`}
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
