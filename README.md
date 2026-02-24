# WebbCall - Practice Project

A modern browser-based calling application built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## Features

- 📞 **International Calling** - Make calls to 29+ countries
- 💰 **Call Rates Display** - View competitive rates for each country
- 🔐 **Authentication** - Sign in with Google, Twitter, or Email
- 📦 **Pricing Packages** - Three-tier subscription model (Starter, Professional, Enterprise)
- 🎨 **Modern UI** - Beautiful modals and responsive design
- 🔗 **Supabase Integration** - Backend database and authentication
- 🎚️ **Dial Pad** - Interactive phone dialer interface

## Project Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS
- **Backend**: Supabase
- **UI Components**: React Icons, Custom modals
- **APIs**: Twilio Voice SDK integration point

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file with the following:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://azceqgokriujvrdttbzd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_haK7MD55e9KctE_JdE30AQ_qQE94yHJ
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the app in action.

## Features Implemented

✅ **Rates Modal** - View call rates for all countries
✅ **Sign In Modal** - OAuth integration with Google, Twitter, Email
✅ **Packages Modal** - Browse pricing plans and packages
✅ **Supabase Setup** - Connected backend database
✅ **Responsive Design** - Mobile-friendly interface

## Next Steps

- Add user authentication flows
- Create call history and billing system
- Implement payment processing
