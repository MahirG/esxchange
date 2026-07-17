# Aurora OAuth Authentication UI

A premium authentication frontend built with Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn/ui-style components, React Hook Form, Zod, Radix Dialog, Lucide, and Framer Motion.

## Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production auth integration

The interface calls Server Actions in `lib/actions/auth.ts`. Replace the demo delays with your identity provider:

- Auth.js
- Supabase Auth
- Clerk
- WorkOS
- Firebase Auth
- A custom OIDC/OAuth service

Keep OAuth client secrets and signing secrets server-side. The client should only receive provider redirects or safe action results.

## Structure

```text
app/
  globals.css
  layout.tsx
  loading.tsx
  page.tsx
components/
  auth/
    auth-experience.tsx
    auth-form.tsx
    auth-visual.tsx
    floating-field.tsx
    forgot-password-dialog.tsx
    oauth-buttons.tsx
    provider-icons.tsx
    success-state.tsx
  ui/
    button.tsx
    dialog.tsx
    input.tsx
    label.tsx
    skeleton.tsx
lib/
  actions/auth.ts
  schemas/auth.ts
  utils.ts
```
