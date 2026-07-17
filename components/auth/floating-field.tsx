"use client";

import { Eye, EyeOff } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import { forwardRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FloatingFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  error?: string;
  passwordToggle?: boolean;
}

export const FloatingField = forwardRef<HTMLInputElement, FloatingFieldProps>(
  ({ id, label, error, className, type = "text", passwordToggle = false, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const resolvedType = passwordToggle ? (visible ? "text" : "password") : type;
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className="space-y-1.5">
        <div className="group relative">
          <Input
            ref={ref}
            id={id}
            type={resolvedType}
            placeholder=" "
            aria-invalid={Boolean(error)}
            aria-describedby={errorId}
            className={cn(
              "peer h-13 pt-5",
              error && "border-red-400/70 focus:border-red-400 focus:ring-red-500/10",
              passwordToggle && "pr-12",
              className,
            )}
            {...props}
          />
          <Label
            htmlFor={id}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.1em] peer-focus:text-violet-300 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.1em]"
          >
            {label}
          </Label>
          {passwordToggle && (
            <button
              type="button"
              onClick={() => setVisible((current) => !current)}
              aria-label={visible ? "Hide password" : "Show password"}
              className="absolute right-2.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition hover:bg-white/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
        <p id={errorId} role="alert" className={cn("min-h-4 text-xs text-red-300", !error && "sr-only")}>
          {error || "No error"}
        </p>
      </div>
    );
  },
);
FloatingField.displayName = "FloatingField";
