"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────
const RAJPURA_POINTS = [
  { title: "Strategic Hub", desc: "Excellent connectivity to North Indian markets." },
  { title: "Logistics", desc: "Strong supply chain advantages for fresh delivery." },
  { title: "Scalability", desc: "Modern infrastructure designed for future growth." },
];

const SUSTAINABILITY = [
  {
    title: "Energy Efficiency",
    icon: "⚡",
    desc: "Optimized resource use to reduce our carbon footprint.",
  },
  {
    title: "Waste Control",
    icon: "♻️",
    desc: "Process optimization to minimize industrial waste.",
  },
  {
    title: "Safe Environment",
    icon: "🛡️",
    desc: "Focus on creating secure and ethical working spaces.",
  },
  {
    title: "Sourcing",
    icon: "🌱",
    desc: "Responsible procurement of premium raw materials.",
  },
];

export default function ManufacturingSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} className="bg-[#fffdf9] py-24 lg:py-40 overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1300px]">
        
        {/* ── 01. Manufacturing Header ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#c05621] font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Our Manufacturing</span>
            <h2 className="text-5xl lg:text-7xl font-black text-[#3d1f00] font-['Playfair_Display'] leading-tight mb-8">
              State-of-the-Art <br />
              <span className="text-[#c05621] italic">Rajpura Facility.</span>
            </h2>
            <p className="text-lg text-[#9c6644] leading-relaxed mb-8 max-w-xl">
              Strategically located in <span className="text-[#3d1f00] font-bold">Punjab</span>, our upcoming facility is 
              engineered for excellence, meeting the highest food safety and hygiene standards in the country.
            </p>
            
            {/* Rajpura Advantages */}
            <div className="grid sm:grid-cols-1 gap-4">
              {RAJPURA_POINTS.map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 10 }}
                  className="p-4 rounded-xl bg-white border border-[#3d1f00]/5 shadow-sm flex items-start gap-4"
                >
                  <div className="w-2 h-2 rounded-full bg-[#c05621] mt-2" />
                  <div>
                    <h4 className="font-bold text-[#3d1f00] text-sm uppercase tracking-wider">{item.title}</h4>
                    <p className="text-[#9c6644] text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Map/Facility Illustration Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white"
          >
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop" 
              alt="Manufacturing Facility"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3d1f00]/60 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-xs tracking-[0.3em] uppercase opacity-80 mb-1">Strategic Location</p>
              <p className="text-2xl font-['Playfair_Display'] font-bold">Rajpura, Punjab</p>
            </div>
          </motion.div>
        </div>

        {/* ── 02. Sustainability Bento Grid ── */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-black text-[#3d1f00] font-['Playfair_Display'] mb-4">Sustainability & Responsibility</h3>
            <p className="text-[#9c6644] max-w-2xl mx-auto">Efficiency is in our DNA. We build businesses that are resilient, responsible, and future-ready.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUSTAINABILITY.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[2.5rem] bg-[#fff8f0] border border-[#c05621]/10 flex flex-col items-center text-center group transition-colors hover:bg-[#c05621]"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h4 className="text-xl font-bold text-[#3d1f00] font-['Playfair_Display'] mb-3 group-hover:text-white">{item.title}</h4>
                <p className="text-sm text-[#9c6644] group-hover:text-white/80">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── 03. Looking Ahead CTA ── */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative rounded-[4rem] bg-[#3d1f00] p-12 lg:p-24 overflow-hidden text-center"
        >
          {/* Abstract Sun Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#c05621]/20 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <span className="text-[#c05621] font-bold tracking-[0.5em] uppercase text-xs mb-6 block">The Future</span>
            <h3 className="text-4xl lg:text-6xl font-black text-white font-['Playfair_Display'] mb-8 leading-tight">
              Sun Delight is <span className="italic text-orange-200">Just the Beginning.</span>
            </h3>
            <p className="text-orange-100/60 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
              We aim to build a trusted Indian FMCG brand that reaches homes across the country—delivering 
              products that families can rely on and enjoy every day.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="px-10 py-4 bg-[#c05621] text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-orange-600 transition-colors shadow-2xl">
                Explore Our Range
              </button>
              <div className="text-white/40 text-xs tracking-tighter uppercase font-bold">
                Made with care • Delivered with trust
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}