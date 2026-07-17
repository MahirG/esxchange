"use client";

import { Github, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { beginOAuth } from "@/lib/actions/auth";
import type { OAuthProvider } from "@/lib/schemas/auth";
import { cn } from "@/lib/utils";
import { AppleIcon, GoogleIcon, MicrosoftIcon } from "./provider-icons";

const providers = [
  { id: "google" as const, label: "Google", Icon: GoogleIcon, className: "hover:border-[#4285F4]/50" },
  { id: "github" as const, label: "GitHub", Icon: Github, className: "hover:border-white/25" },
  { id: "microsoft" as const, label: "Microsoft", Icon: MicrosoftIcon, className: "hover:border-[#00A4EF]/50" },
  { id: "apple" as const, label: "Apple", Icon: AppleIcon, className: "hover:border-white/25" },
];

export function OAuthButtons({ onSuccess, onError }: { onSuccess: (message: string) => void; onError: (message: string) => void }) {
  const [pending, startTransition] = useTransition();
  const [activeProvider, setActiveProvider] = useState<OAuthProvider | null>(null);

  function connect(provider: OAuthProvider) {
    setActiveProvider(provider);
    onError("");
    startTransition(async () => {
      const result = await beginOAuth(provider);
      setActiveProvider(null);
      result.ok ? onSuccess(result.message) : onError(result.message);
    });
  }

  return (
    <div className="grid grid-cols-2 gap-3" aria-label="OAuth providers">
      {providers.map(({ id, label, Icon, className }) => (
        <button
          key={id}
          type="button"
          onClick={() => connect(id)}
          disabled={pending}
          className={cn(
            "group flex h-12 items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.035] text-sm font-semibold text-white/85 transition hover:-translate-y-0.5 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
            className,
          )}
          aria-label={`Continue with ${label}`}
        >
          {pending && activeProvider === id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Icon className="h-4.5 w-4.5" />}
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
