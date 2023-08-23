import { createUploadthing, type FileRouter } from "uploadthing/next"
 
const f = createUploadthing()
 
const auth = (req: Request) => ({ id: "fakeId" })
 

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req)
      if (!user) throw new Error("Unauthorized")
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId)
      console.log("file url", file.url)
    }),
    mediaPost: f({
    image: { maxFileSize: "2MB", maxFileCount: 4 },
    video: { maxFileSize: "256MB", maxFileCount: 1 },
  })
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => console.log("file", data)),
} satisfies FileRouter
 
export type OurFileRouter = typeof ourFileRouter