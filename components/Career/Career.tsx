"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const ROLES = [
  { title: "Sales Executive", location: "Delhi / Punjab", type: "Full-time" },
  { title: "Distribution Manager", location: "North India", type: "Full-time" },
//   { title: "Marketing Associate", location: "New Delhi", type: "Full-time" },
//   { title: "Quality Control Officer", location: "Rajpura, Punjab", type: "Full-time" },
];

export default function CareersPage() {
  return (
    <section className="min-h-screen bg-[#fffdf9] overflow-hidden">

      {/* ── Hero ── */}
      <div className="relative py-24 lg:py-36 px-6 text-center overflow-hidden">
        {/* bg orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(245,166,35,.09),transparent 65%)" }} />
        <div className="absolute bottom-[-10%] left-[-8%] w-[40vw] h-[40vw] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(192,86,33,.07),transparent 65%)" }} />
        {/* dot grid */}
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle,rgba(192,86,33,.15) 1px,transparent 1px)", backgroundSize: "36px 36px" }} />

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#c05621]/20 bg-white/70 backdrop-blur-md mb-8"
          >
            <span className="text-[#c05621] text-xs font-extrabold tracking-[.22em] uppercase">Join Our Team</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif font-black text-[#3d1f00] leading-tight mb-6"
            style={{ fontSize: "clamp(2.6rem,6vw,5rem)" }}
          >
            Grow With <span className="text-[#c05621] italic">Sun Delight</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#9c6644] text-lg leading-relaxed max-w-xl mx-auto"
          >
            We are building India's next great biscuit brand and we want passionate people on the journey. If you love food, growth, and making a real impact — we want to hear from you.
          </motion.p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 pb-28 space-y-16">

        {/* ── Open Roles ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-0.5 rounded" style={{ background: "linear-gradient(90deg,#c05621,transparent)" }} />
            <span className="text-[.68rem] font-extrabold tracking-[.22em] uppercase text-[#c05621]">Open Positions</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {ROLES.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex items-center justify-between p-6 rounded-2xl border border-[#3d1f00]/6 bg-white hover:border-[#c05621]/30 hover:-translate-y-1 transition-all duration-300"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,.04)" }}
              >
                <div>
                  <div className="font-serif font-bold text-[#3d1f00] text-lg mb-1">{r.title}</div>
                  <div className="flex items-center gap-3 text-[.72rem] text-[#9c6644]">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{r.location}</span>
                    <span className="w-1 h-1 rounded-full bg-[#c05621]/30" />
                    <span>{r.type}</span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full border border-[#c05621]/20 flex items-center justify-center text-[#c05621] group-hover:bg-[#c05621] group-hover:text-white group-hover:border-transparent transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Contact CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2.5rem] overflow-hidden p-6 md:p-10 lg:p-16 text-white"
          style={{ background: "linear-gradient(135deg,#3d1f00 0%,#6b3a1f 50%,#c05621 100%)" }}
        >
          {/* decorative circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-black/10" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-[.68rem] font-extrabold tracking-[.22em] uppercase text-orange-300/70 mb-4">Apply Now</div>
              <h2 className="font-serif font-black text-[26px] lg:text-4xl leading-tight mb-4">
                Don&apos;t see your role?<br />
                <span className="text-[#fbd38d] italic">Reach out anyway.</span>
              </h2>
              <p className="text-orange-100/70 text-sm leading-relaxed max-w-sm">
                Send us your resume and a short note about yourself. We are always looking for driven, curious people who want to build something meaningful.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:careers@thesundelight.com"
                className="flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#c05621] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[.6rem] uppercase tracking-widest text-orange-200/60 mb-0.5">Email Us</div>
                  <div className="font-bold text-sm group-hover:text-[#fbd38d] transition-colors">careers@thesundelight.com</div>
                </div>
              </a>

              <a
                href="tel:+911234567890"
                className="flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#c05621] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[.6rem] uppercase tracking-widest text-orange-200/60 mb-0.5">Call Us</div>
                  <div className="font-bold text-sm group-hover:text-[#fbd38d] transition-colors">Number sharing soon...</div>
                </div>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
