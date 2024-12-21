import {getUser} from "@/app/actions/users";
import {createSupabaseServerClient} from "@/lib/db/server";
import {createUploadthing, type FileRouter} from "uploadthing/next";
import {UploadThingError} from "uploadthing/server";

const f = createUploadthing();

const middleware = async () => {
  try {
    const supabase = await createSupabaseServerClient();
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      throw new UploadThingError("Unauthorized");
    }
    return {};
  } catch (err) {
    console.log(err);
    throw new UploadThingError("Unauthorized");
  }
};

export const ourFileRouter = {
  pdfUploader: f({"application/pdf": {maxFileSize: "4MB", maxFileCount: 10}})
    .middleware(middleware)
    .onUploadComplete(async ({metadata, file}) => {}),
  propdfUploader: f({"application/pdf": {maxFileSize: "16MB", maxFileCount: 50}})
    .middleware(middleware)
    .onUploadComplete(async ({metadata, file}) => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

// import {getUser} from "@/app/actions/users";
// import {createSupabaseServerClient} from "@/lib/db/server";
// import {createUploadthing, type FileRouter} from "uploadthing/next";
// import {UploadThingError} from "uploadthing/server";

// const f = createUploadthing();
// export const ourFileRouter = {
//   pdfUploader: f({
//     "application/pdf": {
//       maxFileSize: "4MB",
//       maxFileCount: 10,
//     },
//   })
//     .middleware(async ({req}) => {
//       try {
//         console.log("file middleware");
//         const supabase = await createSupabaseServerClient();
//         const user = (await supabase.auth.getUser()).data.user;

//         if (!user) {
//           console.log("Unauthorized");
//           throw new UploadThingError("Unauthorized");
//         }
//         console.log("file middleware done");

//         return {};
//       } catch (err) {
//         console.log(err);
//         throw new UploadThingError("Unauthorized");
//       }
//     })
//     .onUploadError(async () => {
//       console.log("error");
//     })
//     .onUploadComplete(async ({metadata, file}) => {
//       try {
//         console.log("upload complete", file.name);
//         return {};
//       } catch (err) {
//         console.log("upload error");
//         console.log(err);
//       }
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;
