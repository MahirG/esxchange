"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SuccessState({ message, onReset }: { message: string; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 210, damping: 20 }}
      className="flex min-h-[490px] flex-col items-center justify-center text-center"
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full bg-emerald-400/20 blur-2xl"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1.6, opacity: [0, 1, 0.35] }}
          transition={{ duration: 1.2 }}
        />
        <motion.span
          className="relative grid h-20 w-20 place-items-center rounded-[1.75rem] border border-emerald-300/20 bg-emerald-400/10 text-emerald-300"
          initial={{ rotate: -12, scale: 0.4 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
        >
          <Check className="h-9 w-9" strokeWidth={2.2} />
        </motion.span>
      </div>
      <h2 className="mt-7 text-3xl font-semibold tracking-[-0.045em]">Access granted</h2>
      <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{message}</p>
      <Button className="mt-8" onClick={onReset}>
        Continue to workspace <ArrowRight className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}
