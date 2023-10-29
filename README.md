This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

1. Please install node on your local device first.
2. Then install on local

   ```
   git clone https://github.com/WeiyuSun/discord_clone
   ```

   ```
   cd discord_clone
   ```
3. Create a new **`.env`** file under `./`, like this:

   ```
   # get relatice keys from https://clerk.com/
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

   # Paste your own database url here, I advice you use postgresql
   # for this project
   DATABASE_URL="postgresql://username:password@localhost:PORT/discord_clone?schema=discord_dev"

   # Get your own secret and id from https://uploadthing.com/
   UPLOADTHING_SECRET=
   UPLOADTHING_APP_ID=

   # get more information from https://livekit.io/
   LIVEKIT_API_KEY=
   LIVEKIT_API_SECRET=
   NEXT_PUBLIC_LIVEKIT_URL=
   #NEXT_PUBLIC_SITE_URL=
   ```
4. Run the project

   ```
   npm install
   ```

   ```
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000/) with your browser to see the result.

## Live server



## Features

* [X] Real-time messaging using Socket.io
* [X] Send attachments as messages using UploadThing
* [X] Delete & Edit messages in real time for all users
* [X] Create Text, Audio and Video call Channels
* [X] 1:1 conversation between members
* [X] 1:1 video calls between members
* [X] Member management (Kick, Role change Guest / Moderator)
* [X] Unique invite link generation & full working invite system
* [X] Infinite loading for messages in batches of 10 (tanstack/query)
* [X] Server creation and customization
* [X] Beautiful UI using TailwindCSS and ShadcnUI
* [X] Full responsivity and mobile UI
* [X] Light / Dark mode
* [X] Websocket fallback: Polling with alerts
  ORM using Prisma
* [X] PostgreSQL Databse implementation
* [X] Authentication with Clerk
