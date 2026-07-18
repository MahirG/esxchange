"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Building2, ChevronRight, Command } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { AuthMode } from "@/lib/schemas/auth";
import { cn } from "@/lib/utils";
import { AuthForm } from "./auth-form";
import { AuthVisual } from "./auth-visual";
import { SuccessState } from "./success-state";

export function AuthExperience() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-5 sm:px-6 sm:py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(139,92,246,.13),transparent_34%)]" />

      <section className="glass-panel relative mx-auto grid w-full max-w-[1240px] overflow-hidden rounded-[2rem] lg:grid-cols-[1.05fr_.95fr]">
        <AuthVisual />

        <section className="relative flex min-h-[calc(100vh-2.5rem)] items-center justify-center px-5 py-10 sm:px-10 lg:min-h-[760px] lg:px-14 xl:px-20">
          <div className="absolute right-5 top-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,.9)]" />
            Systems operational
          </div>

          <div className="w-full max-w-[460px]">
            {!successMessage && (
              <>
                <div className="mb-8 flex items-center gap-3 lg:hidden">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-400 via-indigo-500 to-fuchsia-500 shadow-glow">
                    <Command className="h-5 w-5 text-white" />
                  </span>
                  <div>
                    <p className="font-semibold">Aurora Identity</p>
                    <p className="text-xs text-white/40">Secure access</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-400/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-violet-200">
                  <Building2 className="h-3.5 w-3.5" /> Enterprise-ready identity
                </span>
                <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-5xl">
                  {mode === "sign-up" ? "Create your account." : "Welcome back."}
                </h1>
                <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                  {mode === "sign-up"
                    ? "A polished, secure workspace is moments away."
                    : "Sign in to continue to your protected workspace."}
                </p>

                <div className="mt-7 grid grid-cols-2 rounded-2xl border border-white/10 bg-black/20 p-1.5" role="tablist" aria-label="Authentication mode">
                  {(["sign-in", "sign-up"] as const).map((item) => {
                    const active = mode === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => { setMode(item); setSuccessMessage(""); }}
                        className={cn(
                          "relative h-10 rounded-xl text-sm font-semibold text-muted-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          active && "text-white",
                        )}
                      >
                        {active && <motion.span layoutId="auth-tab" className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.08] shadow-inner" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                        <span className="relative">{item === "sign-in" ? "Sign in" : "Create account"}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            <div className={successMessage ? "mt-0" : "mt-6"}>
              <AnimatePresence mode="wait" initial={false}>
                {successMessage ? (
                  <SuccessState key="success" message={successMessage} onReset={() => setSuccessMessage("")} />
                ) : (
                  <AuthForm key={mode} mode={mode} onSuccess={() => router.replace("/dashboard")} />
                )}
              </AnimatePresence>
            </div>

            {!successMessage && (
              <div className="mt-7 flex items-center justify-center">
                <button type="button" className="group flex items-center gap-1.5 text-xs font-medium text-white/40 transition hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  Continue with SSO
                  <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </button>
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
