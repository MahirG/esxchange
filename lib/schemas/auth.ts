import { z } from "zod";

export type AuthMode = "sign-in" | "sign-up";

const password = z
  .string()
  .min(8, "Use at least 8 characters")
  .regex(/[A-Z]/, "Add one uppercase letter")
  .regex(/[0-9]/, "Add one number");

export function authSchema(mode: AuthMode) {
  return z
    .object({
      name: mode === "sign-up" ? z.string().trim().min(2, "Enter your full name") : z.string().optional(),
      email: z.string().trim().email("Enter a valid email address"),
      password,
      confirmPassword: mode === "sign-up" ? z.string().min(1, "Confirm your password") : z.string().optional(),
      remember: z.boolean().default(false),
    })
    .superRefine((value, context) => {
      if (mode === "sign-up" && value.password !== value.confirmPassword) {
        context.addIssue({
          code: "custom",
          path: ["confirmPassword"],
          message: "Passwords do not match",
        });
      }
    });
}

export const resetPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});

export const oauthProviderSchema = z.enum(["google", "github", "microsoft", "apple"]);

export type AuthInput = z.input<ReturnType<typeof authSchema>>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type OAuthProvider = z.infer<typeof oauthProviderSchema>;
