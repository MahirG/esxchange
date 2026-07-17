"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { authenticate } from "@/lib/actions/auth";
import { authSchema, type AuthInput, type AuthMode } from "@/lib/schemas/auth";
import { FloatingField } from "./floating-field";
import { ForgotPasswordDialog } from "./forgot-password-dialog";
import { OAuthButtons } from "./oauth-buttons";

export function AuthForm({ mode, onSuccess }: { mode: AuthMode; onSuccess: (message: string) => void }) {
  const [pending, startTransition] = useTransition();
  const [formMessage, setFormMessage] = useState("");
  const schema = useMemo(() => authSchema(mode), [mode]);
  const form = useForm<AuthInput>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "", remember: false },
    mode: "onBlur",
  });

  useEffect(() => {
    form.reset({ name: "", email: "", password: "", confirmPassword: "", remember: false });
    setFormMessage("");
  }, [form, mode]);

  function submit(values: AuthInput) {
    setFormMessage("");
    startTransition(async () => {
      const result = await authenticate(mode, values);
      if (result.ok) {
        onSuccess(result.message);
        return;
      }

      setFormMessage(result.message);
      Object.entries(result.fieldErrors ?? {}).forEach(([field, messages]) => {
        form.setError(field as keyof AuthInput, { message: messages[0] });
      });
    });
  }

  const signup = mode === "sign-up";

  return (
    <motion.div
      key={mode}
      initial={{ opacity: 0, x: mode === "sign-up" ? 16 : -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: mode === "sign-up" ? -16 : 16 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <OAuthButtons onSuccess={onSuccess} onError={setFormMessage} />

      <div className="my-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
        <span className="h-px flex-1 bg-white/10" />
        or continue with email
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={form.handleSubmit(submit)} className="space-y-3" noValidate>
        <AnimatePresence initial={false}>
          {signup && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <FloatingField
                id="name"
                label="Full name"
                autoComplete="name"
                error={form.formState.errors.name?.message}
                {...form.register("name")}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <FloatingField
          id="email"
          label="Work email"
          type="email"
          autoComplete="email"
          error={form.formState.errors.email?.message}
          {...form.register("email")}
        />

        <FloatingField
          id="password"
          label="Password"
          autoComplete={signup ? "new-password" : "current-password"}
          passwordToggle
          error={form.formState.errors.password?.message}
          {...form.register("password")}
        />

        <AnimatePresence initial={false}>
          {signup && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <FloatingField
                id="confirmPassword"
                label="Confirm password"
                autoComplete="new-password"
                passwordToggle
                error={form.formState.errors.confirmPassword?.message}
                {...form.register("confirmPassword")}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!signup && (
          <div className="flex items-center justify-between pb-1 pt-1">
            <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
              <input type="checkbox" className="h-4 w-4 rounded border-white/10 bg-black/20 accent-violet-500" {...form.register("remember")} />
              Keep me signed in
            </label>
            <ForgotPasswordDialog />
          </div>
        )}

        {formMessage && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} role="alert" className="rounded-xl border border-red-400/15 bg-red-400/[0.07] px-3.5 py-3 text-xs leading-5 text-red-200">
            {formMessage}
          </motion.div>
        )}

        <Button type="submit" size="lg" className="mt-2 w-full" disabled={pending}>
          {pending ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Securing access…</>
          ) : (
            <>{signup ? "Create account" : "Sign in securely"} <ArrowRight className="h-4 w-4" /></>
          )}
        </Button>
      </form>

      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-white/35">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-300/70" />
        Protected by encrypted, zero-trust sessions
      </div>
    </motion.div>
  );
}
