# LingoBridge

A premium multilingual Chinese-learning application built with Next.js and Supabase authentication.

## Authentication

The application opens on the sign-in screen and keeps the learning workspace hidden until a valid Supabase session exists.

Supported sign-in methods:

- Phone number and password
- SMS verification for new phone accounts
- Google OAuth
- Apple OAuth

Ethiopia is selected by default. Ethiopian mobile numbers are normalized to `+2519XXXXXXXX` and may be entered as either `9XXXXXXXX` or `09XXXXXXXX`.

## Supabase and SMS configuration

Add these public variables to the Vercel project:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Configure the Bird/MessageBird access key only in:

```text
Supabase → Authentication → Providers → Phone → MessageBird
```

Enable the Phone provider and save both the Bird access key and approved originator/sender ID in Supabase. Never commit the Bird access key to GitHub and never place it in a `NEXT_PUBLIC_` Vercel variable.

After changing Supabase provider settings, create a new user with a real phone number and confirm that the six-digit OTP is delivered. Supabase provider settings take effect without an application code change; this commit also triggers a fresh Vercel deployment of the verified phone-auth integration.

## Development

```bash
npm install
npm run dev
```
