# 💼 JobGrid — Smart Job Application Tracker

**JobGrid** is a full-stack, production-ready application designed to help users efficiently manage their job applications with resume uploads, status tracking, and a modern dashboard UI. It mimics real-world SaaS architecture with secure authentication, RESTful API design, modular monorepo structure, and optimized deployment pipelines.

---

## 🚀 Live Demo

- 🌐 Frontend (Netlify): [JobGrid Dashboard](https://astounding-palmier-0dbde4.netlify.app)
- 🔧 Backend (Render): [JobGrid API](https://jobgrid-d5gg.onrender.com)

---

## 📌 Why This Project Stands Out

✅ **Architecture**  
- Backend structured with scalability and maintainability in mind (modular controllers, route separation, auth middleware, clean error handling).
- Frontend built with component-driven architecture using **React + Tailwind**.
- Auth flow supports **JWT** for real-world extensibility.

✅ **Secure Resume Uploads (UploadThing + JWT Validation)**  
- Authenticated uploads with server-side token verification
- Resumés saved via UploadThing and metadata stored in MongoDB via Prisma

✅ **Deployment-Ready CI Thinking**  
- Netlify/Render separation, CORS and environment management, proxying, and static routing handled.

✅ **Mobile Responsive & Accessible UI**  
- Tailwind CSS for design system consistency
- Optimized for keyboard navigation, screen readers, and responsiveness

---

## 🛠️ Tech Stack

| Category          | Technologies Used                                           |
|-------------------|-------------------------------------------------------------|
| **Frontend**       | React, Vite, Tailwind CSS, Axios, React Router             |
| **Backend**        | Node.js, Express, Prisma ORM, MongoDB, JWT                 |
| **File Uploads**   | UploadThing (custom middleware w/ JWT support)             |
| **Deployment**     | Netlify (Frontend), Render (Backend)                       |
| **Auth**           | JWT Auth                                                   |
