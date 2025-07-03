import { createUploadthing, createRouteHandler } from "uploadthing/express";
import jwt from 'jsonwebtoken'

const f = createUploadthing();

const uploadRouter = {
  resumeUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      try {
        const authHeader = req.headers.authorization;
        if (!authHeader) throw new Error("No auth header");

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  
        
        return { userId: decoded.id };
      } catch (err) {
        console.error("UploadThing middleware error:", err.message);
        throw new Error("Unauthorized: Invalid or missing token");
      }
    })
    .onUploadComplete(async ({ file }) => {
      console.log("File uploaded:", file.ufsUrl);
    }),
};

export const handler = createRouteHandler({
  router: uploadRouter,
});
