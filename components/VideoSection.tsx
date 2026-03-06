"use client";

import { motion } from "framer-motion";

export default function VideoSection() {
  return (
    <section className="relative py-0 overflow-hidden">
      {/* Full-bleed video with overlay text */}
      <div className="relative h-[60vh] min-h-[380px]">
        <video
          src="/video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a00]/40 via-[#1a0a00]/30 to-[#1a0a00]/70" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[#ed8936]/40 bg-[#ed8936]/10 backdrop-blur-sm mb-5"
          >
            <span className="text-[#F5A623] text-[11px] font-extrabold tracking-[.22em] uppercase">
              Crafted With Love
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white leading-tight mb-4"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 900,
              fontSize: "clamp(2rem, 4.5vw, 4rem)",
            }}
          >
            Baked Fresh,{" "}
            <em className="not-italic" style={{ color: "#F5A623" }}>
              Every Single Day.
            </em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/60 text-sm md:text-base max-w-[420px] leading-relaxed"
          >
            From our oven to your hands — premium biscuits made with care, quality, and tradition.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
