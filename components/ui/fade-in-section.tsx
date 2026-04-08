"use client"

import { motion } from "framer-motion"

interface FadeInSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function FadeInSection({
  children,
  className,
  delay = 0,
}: FadeInSectionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}
