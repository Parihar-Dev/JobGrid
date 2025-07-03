import { UploadButton } from "@uploadthing/react";
import axios from "axios";
import { useState } from "react";

const UploadResume = ({ title, onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);

  return (
    <div className="w-full space-y-3">
      {uploading && (
        <p className="text-sm text-center text-gray-500">Uploading...</p>
      )}

      <UploadButton
        endpoint="resumeUploader"
        config={{
          uploadthingUrl: "https://jobgrid-d5gg.onrender.com/api/uploadthing" // backend API
        }}
        headers={() => {
          const token = localStorage.getItem("token");
          return token ? { Authorization: `Bearer ${token}` } : {};
        }}
        appearance={{
          button: {
            width: '100%',
            backgroundColor: '#2563eb',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            color: '#ffffff',
            fontWeight: '500',
            fontSize: '14px',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-block',
            textAlign: 'center',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          },
          container: {
            width: '100%',
            border: '2px dashed #d1d5db',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            backgroundColor: '#f9fafb',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            alignItems: 'center',
            justifyContent: 'center',
          },
          allowedContent: {
            fontSize: '0.875rem',
            color: '#6b7280',
          },
        }}
        onUploadBegin={() => setUploading(true)}
        onClientUploadComplete={async (res) => {
          setUploading(false);

          if (!res || res.length === 0) {
            alert("Upload failed: No file returned.");
            return;
          }

          const fileUrl = res[0]?.ufsUrl;
          if (!fileUrl) {
            alert("Upload failed: URL missing.");
            return;
          }

          try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
              "https://jobgrid-d5gg.onrender.com/resumes",
              {
                title,
                filePath: fileUrl,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            alert("Resume uploaded successfully!");
            if (onUploadSuccess) onUploadSuccess(response.data);
          } catch (err) {
            console.error("Error saving resume:", err.response?.data || err.message);
            alert("Failed to save resume.");
          }
        }}
        onUploadError={(err) => {
          setUploading(false);
          console.error("Upload error:", err);
          alert("Upload failed.");
        }}
      />
    </div>
  );
};

export default UploadResume;
