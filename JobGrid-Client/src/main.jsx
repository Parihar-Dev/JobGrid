import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UploadThingProvider
      config={{
        uploadthingUrl: import.meta.env.PROD
          ? "https://jobgrid-d5gg.onrender.com/api/uploadthing"
          : "http://localhost:3000/api/uploadthing",
      }}
    >
      <App />
    </UploadThingProvider>
  </StrictMode>,
)
