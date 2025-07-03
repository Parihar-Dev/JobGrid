import express from 'express';
import { createUploadthing } from "uploadthing/express";

const router = express.Router();
const f = createUploadthing();

router.post('/', async (req, res) => {
  const { fileType, fileName } = req.body;
  if (!fileType || !fileName) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const upload = await f.createUpload({
      fileType: fileType.split('/')[1], 
      fileName,
      maxSize: "4MB",
    });

    return res.json({
      uploadUrl: upload.presignedUrl,
      fileKey: upload.key,
    });
  } catch (err) {
    console.error("Presigned URL error:", err);
    res.status(500).json({ message: "Failed to create upload URL" });
  }
});

export default router;
