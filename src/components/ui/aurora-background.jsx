"use client"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export const AuroraBackground = ({ className, children, showRadialGradient = true, ...props }) => {
  return (
    <motion.div
      className={cn("relative w-full min-h-screen bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg", className)}
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary aurora effect - simplified and more performant */}
        <div
          className={cn(
            "absolute inset-0 opacity-40 pointer-events-none",
            showRadialGradient && "md:[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]",
          )}
        >
          {/* Light mode aurora */}
          <div className="absolute inset-0 dark:opacity-0">
            <div className="absolute top-[-10%] right-[-20%] h-[70%] w-[70%] rounded-full bg-gradient-to-br from-teal-200 via-cyan-300 to-sky-400 opacity-70 blur-[30px] animate-aurora-drift-1"></div>
            <div className="absolute top-[20%] left-[-10%] h-[50%] w-[60%] rounded-full bg-gradient-to-tr from-violet-200 via-purple-300 to-fuchsia-300 opacity-60 blur-[30px] animate-aurora-drift-2"></div>
          </div>

          {/* Dark mode aurora */}
          <div className="absolute inset-0 opacity-0 dark:opacity-100">
            <div className="absolute top-[-10%] right-[-20%] h-[70%] w-[70%] rounded-full bg-gradient-to-br from-teal-900/50 via-cyan-700/50 to-sky-600/50 opacity-70 blur-[30px] animate-aurora-drift-1"></div>
            <div className="absolute top-[20%] left-[-10%] h-[50%] w-[60%] rounded-full bg-gradient-to-tr from-violet-900/50 via-purple-700/50 to-fuchsia-700/50 opacity-60 blur-[30px] animate-aurora-drift-2"></div>
          </div>
        </div>
      </div>
      {children}
    </motion.div>
  )
}

