"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Github, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { AppleIcon, GoogleIcon, MicrosoftIcon } from "./provider-icons";

const particles = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  x: `${8 + ((index * 17) % 84)}%`,
  y: `${9 + ((index * 23) % 78)}%`,
  delay: (index % 5) * 0.5,
  size: 2 + (index % 3),
}));

const providers = [
  { name: "Google", Icon: GoogleIcon, className: "left-[10%] top-[18%]" },
  { name: "GitHub", Icon: Github, className: "right-[8%] top-[23%]" },
  { name: "Microsoft", Icon: MicrosoftIcon, className: "bottom-[17%] left-[13%]" },
  { name: "Apple", Icon: AppleIcon, className: "bottom-[14%] right-[12%]" },
];

export function AuthVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <aside className="noise-overlay relative hidden min-h-[760px] overflow-hidden border-r border-white/10 bg-[#0b0f1d]/70 p-12 lg:flex lg:flex-col lg:justify-between">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(126,92,255,.22),transparent_34%),radial-gradient(circle_at_80%_68%,rgba(199,73,255,.14),transparent_32%)]" />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-violet-300/70 shadow-[0_0_18px_rgba(167,139,250,.7)]"
          style={{ left: particle.x, top: particle.y, width: particle.size, height: particle.size }}
          animate={reduceMotion ? undefined : { y: [0, -12, 0], opacity: [0.25, 0.9, 0.25] }}
          transition={{ duration: 4 + (particle.id % 4), repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/10 shadow-glow backdrop-blur-xl">
          <Sparkles className="h-5 w-5 text-violet-300" />
        </span>
        <div>
          <p className="font-semibold tracking-tight">Aurora Identity</p>
          <p className="text-xs text-white/45">Secure access, beautifully composed.</p>
        </div>
      </div>

      <div className="relative z-10 mx-auto grid h-[420px] w-full max-w-[480px] place-items-center">
        <motion.div
          className="absolute h-80 w-80 rounded-full border border-violet-400/15"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute h-60 w-60 rounded-full border border-fuchsia-400/15"
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute h-52 w-52 rounded-full bg-violet-500/20 blur-3xl" />

        <motion.div
          className="glass-panel relative grid h-44 w-44 place-items-center rounded-[2.25rem]"
          animate={reduceMotion ? undefined : { y: [0, -8, 0], rotate: [0, 1.5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-3 rounded-[1.8rem] border border-white/10 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="relative grid h-24 w-24 place-items-center rounded-[1.75rem] bg-gradient-to-br from-violet-400 via-indigo-500 to-fuchsia-500 shadow-[0_24px_60px_rgba(124,92,255,.4)]">
            <LockKeyhole className="h-11 w-11 text-white" strokeWidth={1.6} />
          </div>
          <motion.span
            className="absolute -right-3 -top-3 grid h-11 w-11 place-items-center rounded-2xl border border-emerald-300/20 bg-emerald-400/15 backdrop-blur-xl"
            animate={reduceMotion ? undefined : { scale: [1, 1.08, 1] }}
            transition={{ duration: 2.8, repeat: Infinity }}
          >
            <ShieldCheck className="h-5 w-5 text-emerald-300" />
          </motion.span>
        </motion.div>

        {providers.map(({ name, Icon, className }, index) => (
          <motion.div
            key={name}
            aria-label={name}
            className={`glass-panel absolute grid h-14 w-14 place-items-center rounded-2xl ${className}`}
            animate={reduceMotion ? undefined : { y: [0, index % 2 ? 8 : -8, 0], rotate: [0, index % 2 ? 2 : -2, 0] }}
            transition={{ duration: 5 + index * 0.7, repeat: Infinity, ease: "easeInOut", delay: index * 0.25 }}
          >
            <Icon className="h-6 w-6" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-md">
        <p className="text-balance text-3xl font-semibold leading-tight tracking-[-0.04em]">
          Authentication that feels as trustworthy as it is beautiful.
        </p>
        <div className="mt-7 flex items-center gap-4 text-xs text-white/45">
          <span>Passkeys ready</span><i className="h-1 w-1 rounded-full bg-white/30" />
          <span>Enterprise SSO</span><i className="h-1 w-1 rounded-full bg-white/30" />
          <span>Zero-trust</span>
        </div>
      </div>
    </aside>
  );
}
