// "use client";

// import { useEffect, useRef } from "react";
// import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// // ─── Data ─────────────────────────────────────────────────────────────────────
// const PHILOSOPHY = [
//   {
//     title: "Quality",
//     icon: "💎",
//     points: ["Carefully selected raw materials", "Stringent quality checks", "Standardised recipes"],
//     color: "#c05621"
//   },
//   {
//     title: "Price",
//     icon: "🏷️",
//     points: ["Efficient manufacturing", "Competitive pricing", "Honest value"],
//     color: "#ed8936"
//   },
//   {
//     title: "Packaging",
//     icon: "📦",
//     points: ["Hygienic and secure", "Preserves freshness", "Consumer-friendly"],
//     color: "#c05621"
//   },
//   {
//     title: "Consistency",
//     icon: "🔄",
//     points: ["Same taste, same crunch", "Strong process control", "Every pack, every time"],
//     color: "#ed8936"
//   }
// ];

// // ─── Philosophy Card Component ────────────────────────────────────────────────
// function PhilosophyCard({ item, index }: { item: typeof PHILOSOPHY[0], index: number }) {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 30 }}
//       animate={isInView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.6, delay: index * 0.1 }}
//       className="group relative p-8 rounded-[2.5rem] bg-white border border-[#3d1f00]/5 hover:shadow-2xl hover:shadow-[#c05621]/10 transition-all duration-500"
//     >
//       <div 
//         className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500"
//         style={{ background: `${item.color}10` }}
//       >
//         {item.icon}
//       </div>
//       <h3 className="text-2xl font-black mb-4 font-['Playfair_Display'] text-[#3d1f00]">{item.title}</h3>
//       <ul className="space-y-3">
//         {item.points.map((point, i) => (
//           <li key={i} className="flex items-start gap-2 text-sm text-[#9c6644]">
//             <span className="text-[#c05621] mt-1">•</span>
//             {point}
//           </li>
//         ))}
//       </ul>
//     </motion.div>
//   );
// }

// // ─── Main Section ─────────────────────────────────────────────────────────────
// export default function OurJourney() {
//   const containerRef = useRef<HTMLElement>(null);
//   const lineRef = useRef<HTMLDivElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"]
//   });

//   const scaleY = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
//   });

//   return (
//     <section ref={containerRef} className="relative py-24 lg:py-40 bg-[#fffdf9] overflow-hidden">
      
//       {/* ── Background Decoration ── */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-[#3d1f00]/5 z-0" />
      
//       <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
        
//         {/* ── Journey Intro ── */}
//         <div className="grid lg:grid-cols-2 gap-16 mb-32 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <span className="text-[#c05621] font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Our Evolution</span>
//             <h2 className="text-5xl lg:text-7xl font-black text-[#3d1f00] font-['Playfair_Display'] mb-8 leading-tight">
//               Our <span className="text-[#c05621] italic">Journey</span>
//             </h2>
//             <div className="space-y-6 text-lg text-[#9c6644] leading-relaxed">
//               <p>
//                 From being an industrial manufacturing powerhouse to entering the FMCG space, 
//                 Suntek Group’s journey has been defined by evolution with purpose.
//               </p>
//               <p className="p-6 bg-[#fde8c0]/30 rounded-2xl border-l-4 border-[#c05621]">
//                 Recognising India’s growing demand for high-quality products, we brought our 
//                 operational excellence to everyday consumer delights.
//               </p>
//             </div>
//           </motion.div>

//           <motion.div 
//             initial={{ opacity: 0, scale: 0.8 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             className="relative"
//           >
//             <div className="aspect-square rounded-[3rem] overflow-hidden rotate-3 shadow-2xl border-[12px] border-white">
//               <img 
//                 src="https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=1000&auto=format&fit=crop" 
//                 alt="Journey" 
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             {/* Quote Badge */}
//             <motion.div 
//               animate={{ y: [0, -10, 0] }}
//               transition={{ duration: 4, repeat: Infinity }}
//               className="absolute -bottom-10 -right-6 lg:right-10 bg-[#3d1f00] text-white p-8 rounded-3xl max-w-[240px] shadow-2xl"
//             >
//               <p className="text-sm italic font-['Playfair_Display']">
//                 "Sun Delight was born to create biscuits that combine taste and honest value."
//               </p>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* ── Philosophy Section ── */}
//         <div className="text-center mb-20">
//           <motion.h2 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="text-4xl lg:text-5xl font-black text-[#3d1f00] font-['Playfair_Display'] mb-4"
//           >
//             Our Philosophy
//           </motion.h2>
//           <p className="text-[#c05621] font-medium tracking-wide">Quality in Every Bite</p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {PHILOSOPHY.map((item, idx) => (
//             <PhilosophyCard key={idx} item={item} index={idx} />
//           ))}
//         </div>

//         {/* ── The "Trust" Footer ── */}
//         <motion.div 
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mt-32 p-12 rounded-[3rem] bg-[#3d1f00] text-center relative overflow-hidden"
//         >
//           {/* Decorative Background Sun */}
//           <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
          
//           <h3 className="text-3xl font-['Playfair_Display'] text-white mb-6">Built on Consistency</h3>
//           <p className="text-orange-100/70 max-w-2xl mx-auto leading-relaxed mb-8">
//             At Sun Delight, we believe that trust is built not by claims, but by consistency. 
//             Our strong process control is backed by Suntek’s decades of manufacturing expertise.
//           </p>
//           <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale invert">
//               {/* Optional: Add small partner/group logos here */}
//               <span className="text-white font-bold tracking-widest text-xl italic">SUNTEK GROUP</span>
//           </div>
//         </motion.div>

//       </div>

//       {/* ── Scroll Progress Line ── */}
//       <motion.div 
//         style={{ scaleY }}
//         className="fixed top-0 right-4 w-1 h-full bg-gradient-to-b from-transparent via-[#c05621] to-transparent origin-top hidden lg:block"
//       />
//     </section>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PILLARS = [
  {
    title: "Quality",
    icon: "✨",
    desc: "Carefully selected raw materials meeting stringent quality checks for a standardized, premium taste.",
    details: ["Raw Materials", "Quality Checks", "Standard Recipes"]
  },
  {
    title: "Price",
    icon: "🏷️",
    desc: "Efficient manufacturing enables competitive pricing and honest value without compromise.",
    details: ["Efficiency", "Honest Value", "Competitive"]
  },
  {
    title: "Packaging",
    icon: "🛡️",
    desc: "Hygienic and secure packaging designed to preserve crunch and sunshine-freshness.",
    details: ["Hygienic", "Freshness", "Retail Ready"]
  },
  {
    title: "Consistency",
    icon: "🔄",
    desc: "Same taste. Same crunch. Every pack, every time, backed by Suntek's industrial expertise.",
    details: ["Uniformity", "Process Control", "Expertise"]
  }
];

export default function JourneySection() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial Entrance Animation
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".journey-title", {
        opacity: 0,
        x: -100,
        duration: 1,
        scrollTrigger: {
          trigger: ".journey-title",
          start: "top 80%",
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#fffdf9] py-24  lg:py-0">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* ── Left Side: Sticky Content (Hero of the Section) ── */}
        <div className="lg:w-[45%] lg:h-screen lg:sticky lg:top-10 flex flex-col justify-center px-8 lg:px-20 py-12 bg-white z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="text-[#c05621] font-bold tracking-[0.4em] uppercase text-xs">Our Evolution</span>
          </motion.div>

          <h2 className="journey-title text-6xl lg:text-8xl font-black text-[#3d1f00] font-['Playfair_Display'] leading-[0.9] mb-8">
            Our <br /> <span className="text-[#c05621] italic">Journey.</span>
          </h2>

          <div className="space-y-6 text-lg text-[#9c6644] leading-relaxed max-w-md">
            <p>
              From an industrial powerhouse to the FMCG space, Suntek Group’s journey is defined by 
              <span className="text-[#3d1f00] font-semibold"> evolution with purpose.</span>
            </p>
            <p className="text-base opacity-80">
              Recognizing India’s demand for high-quality, hygienic biscuits, we’ve brought our 
              operational excellence to your tea-time.
            </p>
          </div>

          {/* Vision Box */}
          <div className="mt-12 p-8 rounded-2xl bg-[#fff8f0] border-l-4 border-[#c05621] relative overflow-hidden group">
             <div className="absolute -right-4 -bottom-4 text-7xl opacity-5 group-hover:scale-110 transition-transform">🍪</div>
             <p className="text-[#3d1f00] font-['Playfair_Display'] text-xl italic font-medium leading-snug">
               "To create biscuits that combine great taste, consistent quality, and honest value."
             </p>
          </div>
        </div>

        {/* ── Right Side: Scrolling Pillars ── */}
        <div className="lg:w-[55%] px-8 lg:px-20 py-24 space-y-32">
          <div className="mb-20">
            <h3 className="text-3xl font-black text-[#3d1f00] font-['Playfair_Display'] mb-4">
              Our Philosophy
            </h3>
            <p className="text-[#c05621] font-bold tracking-widest uppercase text-sm">
              Quality in Every Bite
            </p>
          </div>

          {PILLARS.map((pillar, idx) => (
            <PillarCard key={idx} pillar={pillar} index={idx} />
          ))}

          {/* Final Trust Statement */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="pt-20 border-t border-[#3d1f00]/10 text-center lg:text-left"
          >
            <p className="text-[#9c6644] text-sm uppercase tracking-[0.2em] mb-4">The Promise</p>
            <h4 className="text-3xl lg:text-4xl font-['Playfair_Display'] text-[#3d1f00] leading-tight">
              Trust is built not by claims, but by <span className="text-[#c05621] font-black underline decoration-[#fde8c0] underline-offset-8">consistency.</span>
            </h4>
          </motion.div>
        </div>
      </div>

      {/* Background Decorative "Sun" */}
      <div className="fixed top-1/2 right-[-10%] w-[500px] h-[500px] bg-[#fde8c0]/20 rounded-full blur-[120px] pointer-events-none -z-10" />
    </section>
  );
}

// ─── Pillar Card Component ────────────────────────────────────────────────────
function PillarCard({ pillar, index }: { pillar: typeof PILLARS[0], index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { margin: "-20% 0px", once: false });

  return (
    <motion.div
      ref={cardRef}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 20 }}
      transition={{ duration: 0.8 }}
      className="relative flex flex-col gap-6 group"
    >
      <div className="flex items-center gap-6">
        <span className="text-6xl font-black text-[#fde8c0] font-['Playfair_Display']">
          0{index + 1}
        </span>
        <div className="h-px flex-1 bg-[#3d1f00]/10 group-hover:bg-[#c05621]/30 transition-colors" />
        <div className="text-4xl bg-white shadow-lg w-16 h-16 flex items-center justify-center rounded-2xl border border-[#fde8c0]">
          {pillar.icon}
        </div>
      </div>

      <div className="pl-4 lg:pl-20">
        <h3 className="text-3xl font-black text-[#3d1f00] font-['Playfair_Display'] mb-4 transition-colors group-hover:text-[#c05621]">
          {pillar.title}
        </h3>
        <p className="text-[#9c6644] leading-relaxed mb-6 max-w-lg">
          {pillar.desc}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {pillar.details.map((detail, i) => (
            <span 
              key={i} 
              className="px-4 py-1.5 rounded-full bg-white border border-[#3d1f00]/5 text-[10px] font-bold uppercase tracking-widest text-[#3d1f00] shadow-sm"
            >
              {detail}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}