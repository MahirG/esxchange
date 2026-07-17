"use server";

import { authSchema, oauthProviderSchema, resetPasswordSchema, type AuthMode } from "@/lib/schemas/auth";

export type ActionResult = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

function flattenErrors(error: { flatten: () => { fieldErrors: Record<string, string[] | undefined> } }) {
  const { fieldErrors } = error.flatten();
  return Object.fromEntries(
    Object.entries(fieldErrors).filter((entry): entry is [string, string[]] => Boolean(entry[1]?.length)),
  );
}

export async function authenticate(mode: AuthMode, input: unknown): Promise<ActionResult> {
  const parsed = authSchema(mode).safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please review the highlighted fields.",
      fieldErrors: flattenErrors(parsed.error),
    };
  }

  // Replace this demo delay with your authentication SDK call.
  // Examples: Auth.js `signIn`, Clerk, Supabase Auth, or your own identity service.
  await new Promise((resolve) => setTimeout(resolve, 900));

  return {
    ok: true,
    message: mode === "sign-up" ? "Your account is ready." : "Welcome back.",
  };
}

export async function beginOAuth(providerInput: unknown): Promise<ActionResult> {
  const provider = oauthProviderSchema.safeParse(providerInput);

  if (!provider.success) {
    return { ok: false, message: "Unsupported OAuth provider." };
  }

  // Replace with your provider redirect. Keep provider secrets server-side.
  await new Promise((resolve) => setTimeout(resolve, 650));

  return {
    ok: true,
    message: `${provider.data[0].toUpperCase()}${provider.data.slice(1)} authorization is ready to connect.`,
  };
}

export async function requestPasswordReset(input: unknown): Promise<ActionResult> {
  const parsed = resetPasswordSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Enter a valid email address.",
      fieldErrors: flattenErrors(parsed.error),
    };
  }

  // Call your password-reset provider here. Always return a neutral response
  // so the endpoint does not reveal whether an account exists.
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    ok: true,
    message: "If an account exists, a secure reset link is on its way.",
  };
}
