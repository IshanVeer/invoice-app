# Invoice App

Built a fully responsive invoice app that helps users track their pending payments and clear their invoice backlogs.

## Features

- Fully responsive design optimized for mobile, tablet, and desktop
- Create, edit, and delete invoices with ease
- Save invoices as drafts and complete them later
- Filter and sort invoices by status: Draft, Pending, or Paid

## Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Next.js Server Actions, MongoDB
- **Authentication:** Clerk
- **UI Components:** Shadcn
- **Hosting & Deployment:** Vercel

## Folder Structure

```
project-root/
├── public/                  # Static assets (images, fonts, etc.)
│   └── (assets)
├── app/                     # Routing, layouts, and global styles
│   ├── (auth)/              # Authentication routes (sign-in, sign-up pages)
│   │   ├── sign-in/
│   │   │   └── page.tsx
│   │   └── sign-up/
│   │       └── page.tsx
│   ├── api/                 # API routes (e.g., Clerk webhooks)
│   │   └── clerk/
│   │       └── route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css          # Global CSS styles
├── components/              # Reusable components
├── constants/               # Constant data
├── context/                 # Board and theme context
├── lib/                     # Utility functions
├── types/                   # Root type definitions
├── package.json
├── package-lock.json
└── README.md

```

## Deployment

- live-link - https://invoice-app-liard-three.vercel.app/
- Deployed via vercel
