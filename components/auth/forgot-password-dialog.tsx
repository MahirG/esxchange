"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, MailCheck } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { requestPasswordReset } from "@/lib/actions/auth";
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/schemas/auth";
import { FloatingField } from "./floating-field";

export function ForgotPasswordDialog() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [pending, startTransition] = useTransition();
  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "" },
  });

  function submit(values: ResetPasswordInput) {
    startTransition(async () => {
      const result = await requestPasswordReset(values);
      if (result.ok) setSent(true);
      else form.setError("email", { message: result.message });
    });
  }

  function changeOpen(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      setTimeout(() => {
        setSent(false);
        form.reset();
      }, 180);
    }
  }

  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogTrigger asChild>
        <button type="button" className="text-xs font-medium text-violet-300 transition hover:text-violet-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Forgot password?
        </button>
      </DialogTrigger>
      <DialogContent>
        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.div key="sent" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-3 text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                <MailCheck className="h-7 w-7" />
              </span>
              <h2 className="mt-5 text-xl font-semibold">Check your inbox</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">If an account exists, a secure reset link is on its way.</p>
              <Button type="button" className="mt-6 w-full" onClick={() => changeOpen(false)}>Done</Button>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <DialogHeader>
                <DialogTitle>Reset your password</DialogTitle>
                <DialogDescription>Enter your email and we will send a secure, time-limited recovery link.</DialogDescription>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(submit)} className="mt-5 space-y-4" noValidate>
                <FloatingField
                  id="reset-email"
                  label="Work email"
                  type="email"
                  autoComplete="email"
                  error={form.formState.errors.email?.message}
                  {...form.register("email")}
                />
                <Button type="submit" className="w-full" disabled={pending}>
                  {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Send reset link <ArrowRight className="h-4 w-4" /></>}
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
