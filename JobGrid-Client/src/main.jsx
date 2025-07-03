import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UploadThingProvider } from '@uploadthing/react'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UploadThingProvider
      config={{
        url: "https://jobgrid-d5gg.onrender.com/api/uploadthing",
      }}
    >
      <App />
    </UploadThingProvider>
  </StrictMode>,
)
