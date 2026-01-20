# WebbCall - Starter

This repository contains a starter Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS project scaffold for a browser-based calling app like the provided mockup.

Features included in scaffold:
- Next.js 16 (app router)
- React 19 with hooks
- TypeScript
- Tailwind CSS + `globals.css`
- `styled-components` for component-level styling
- `react-icons` for icons
- Placeholder Twilio Voice SDK integration point
- Supabase client helper
- Basic API route placeholder for Twilio token issuance

Getting started

1. Install dependencies

```bash
cd "C:/Users/Pratham Verma/Desktop/Practice project/webcall-app"
npm install
```

2. Environment variables (add these to your Vercel/Supabase/Dev env):

- `NEXT_PUBLIC_SUPABASE_URL` - your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - your Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` - (server-only) service role key if needed
- `TWILIO_ACCOUNT_SID` - Twilio account SID
- `TWILIO_API_KEY` - Twilio API Key SID
- `TWILIO_API_SECRET` - Twilio API Key Secret
- `TWILIO_PUSH_CREDENTIAL_SID` - (optional) for push credentials
- `DODO_PUBLIC_KEY` - placeholder for payments

3. Start dev server

```bash
npm run dev
```

Next steps I can do for you:
- Implement Twilio token generation in `app/api/twilio/token/route.ts` once you provide Twilio credentials.
- Wire the Twilio Voice SDK in the client to place real calls.
- Add Supabase auth flows and database tables for call history and credits.

Please provide your Supabase Project URL (or project id) and your Twilio credentials (Account SID and API Key SID + Secret), and I will implement the server token route and wire the client to make calls.
