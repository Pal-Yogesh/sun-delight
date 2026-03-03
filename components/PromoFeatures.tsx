// "use client";

// import { useEffect, useRef } from "react";
// import { motion, useScroll, useTransform, useInView } from "framer-motion";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// // ─── Data ─────────────────────────────────────────────────────────────────────
// const FEATURES = [
//   {
//     id: 1,
//     title: "We Are The Best Cookie Shop",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis dapibus leo.",
//     icon: "🍪",
//   },
//   {
//     id: 2,
//     title: "Premium Ingredients",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.",
//     icon: "✨",
//   },
//   {
//     id: 3,
//     title: "Freshly Baked Daily",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.",
//     icon: "🔥",
//   },
//   {
//     id: 4,
//     title: "Easy For Ordering",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.",
//     icon: "📱",
//   },
// ];

// // ─── Floating Discount Badge ──────────────────────────────────────────────────
// function DiscountBadge() {
//   return (
//     <motion.div
//       initial={{ scale: 0, rotate: -10 }}
//       animate={{ scale: 1, rotate: -4 }}
//       transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
//       whileHover={{ scale: 1.05, rotate: 0 }}
//       className="absolute -top-8 -right-4 lg:-right-12 z-20 flex flex-col items-center justify-center p-4 rounded-full shadow-2xl cursor-pointer"
//       style={{
//         background: "linear-gradient(135deg, #c05621, #ed8936)",
//         width: "140px",
//         height: "140px",
//         boxShadow: "0 12px 30px rgba(192,86,33,0.3)",
//       }}
//     >
//       <span className="text-white text-sm font-bold tracking-widest uppercase mb-1">
//         Don't Miss
//       </span>
//       <span className="text-white text-3xl font-black leading-none text-center">
//         50%
//       </span>
//       <span className="text-white text-sm font-bold tracking-widest uppercase mt-1">
//         Discount
//       </span>
//     </motion.div>
//   );
// }

// // ─── Feature Card ─────────────────────────────────────────────────────────────
// function FeatureCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const inView = useInView(cardRef, { once: true, margin: "-10% 0px" });

//   return (
//     <motion.div
//       ref={cardRef}
//       initial={{ opacity: 0, y: 50 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ delay: index * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//       whileHover={{ scale: 1.02, x: 10 }}
//       className="group relative flex gap-6 p-8 rounded-3xl border transition-all duration-500 cursor-pointer bg-white/60 backdrop-blur-sm"
//       style={{
//         borderColor: "rgba(61,31,0,0.08)",
//         boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
//       }}
//     >
//       {/* Hover Background Sweep */}
//       <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#fffdf9] to-[#fde8c0] -z-10" />

//       {/* Icon */}
//       <div
//         className="flex items-center justify-center w-16 h-16 rounded-2xl flex-shrink-0 text-3xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
//         style={{
//           background: "linear-gradient(145deg, #fef3e2 0%, #fde8c0 50%, #f5c842 100%)",
//         }}
//       >
//         {feature.icon}
//       </div>

//       {/* Content */}
//       <div className="flex flex-col justify-center">
//         <h3
//           className="text-xl font-black mb-2 transition-colors duration-300 group-hover:text-[#c05621]"
//           style={{ fontFamily: "'Playfair Display', serif", color: "#3d1f00" }}
//         >
//           {feature.title}
//         </h3>
//         <p className="text-sm leading-relaxed" style={{ color: "#9c6644" }}>
//           {feature.desc}
//         </p>
//       </div>
//     </motion.div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// export default function PromoFeaturesSection() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const rightColRef = useRef<HTMLDivElement>(null);

//   // Parallax background via Framer Motion
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"],
//   });
//   const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

//   // GSAP ScrollTrigger for pinning the left column (optional enhancement)
//   useEffect(() => {
//     let ctx = gsap.context(() => {
//       // Create a subtle floating animation for abstract background elements
//       gsap.to(".floating-blob", {
//         y: -30,
//         x: 20,
//         rotation: 10,
//         duration: 4,
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//         stagger: 0.5,
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative overflow-hidden py-24 lg:py-32"
//       style={{
//         background: "linear-gradient(180deg, #fffdf9 0%, #fff8f0 60%, #fef3e2 100%)",
//       }}
//     >
//       {/* ── Background Patterns ── */}
//       <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none z-0">
//         <div
//           className="absolute inset-[-10%] opacity-[0.25]"
//           style={{
//             backgroundImage: "radial-gradient(circle, rgba(192,86,33,0.15) 2px, transparent 2px)",
//             backgroundSize: "40px 40px",
//           }}
//         />
//         <div className="floating-blob absolute top-10 left-[-5%] w-96 h-96 rounded-full bg-orange-200/20 blur-3xl" />
//         <div className="floating-blob absolute bottom-10 right-[-5%] w-96 h-96 rounded-full bg-amber-200/20 blur-3xl" />
//       </motion.div>

//       <div className="max-w-[1280px] mx-auto px-6 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
//           {/* ── Left Column (Sticky Headline & Promo) ── */}
//           <div className="lg:col-span-5 lg:sticky top-32">
//             <motion.div
//               initial={{ opacity: 0, x: -40 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-10%" }}
//               transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//               className="relative"
//             >
//               <DiscountBadge />

//               <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6" style={{ background: "rgba(192,86,33,0.1)", color: "#c05621" }}>
//                 Coobite Cookies
//               </span>

//               <h2
//                 className="text-5xl lg:text-6xl font-black leading-[1.1] mb-6"
//                 style={{ fontFamily: "'Playfair Display', serif", color: "#3d1f00" }}
//               >
//                 One Bite Will Leave You <span style={{ color: "#c05621", fontStyle: "italic" }}>Wanting More.</span>
//               </h2>

//               <p className="text-lg mb-10 leading-relaxed max-w-md" style={{ color: "#9c6644" }}>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
//               </p>

//               {/* CTA Button */}
//               <motion.button
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="group relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-lg shadow-xl"
//                 style={{ background: "linear-gradient(135deg, #c05621, #ed8936)" }}
//               >
//                 <motion.span
//                   animate={{ x: ["-100%", "200%"] }}
//                   transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
//                   className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
//                 />
//                 <span className="relative z-10">Learn More</span>
//                 <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
//               </motion.button>
//             </motion.div>
//           </div>

//           {/* ── Right Column (Features List) ── */}
//           <div className="lg:col-span-7 flex flex-col gap-6" ref={rightColRef}>
//             {FEATURES.map((feature, idx) => (
//               <FeatureCard key={feature.id} feature={feature} index={idx} />
//             ))}
//           </div>
          
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  useInView,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    id: 1,
    title: "We Are The Best Cookie Shop",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis dapibus leo.",
    icon: "👑",
  },
  {
    id: 2,
    title: "Premium Ingredients",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.",
    icon: "✨",
  },
  {
    id: 3,
    title: "Freshly Baked Daily",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.",
    icon: "🔥",
  },
  {
    id: 4,
    title: "Easy For Ordering",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.",
    icon: "📱",
  },
];

// ─── Interactive Spotlight Card ───────────────────────────────────────────────
function SpotlightCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Spotlight effect logic
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className="feature-card relative overflow-hidden rounded-[2rem] border border-[#3d1f00]/5 bg-white/40 backdrop-blur-md p-8 shadow-sm cursor-pointer"
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      ref={cardRef}
    >
      {/* Dynamic Hover Gradient (Spotlight) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(192, 86, 33, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl mb-6 shadow-md"
          style={{
            background: "linear-gradient(135deg, #fffdf9 0%, #fde8c0 100%)",
            border: "1px solid rgba(192,86,33,0.1)",
          }}
        >
          {feature.icon}
        </div>
        <h3
          className="mb-3 text-xl font-black tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif", color: "#3d1f00" }}
        >
          {feature.title}
        </h3>
        <p className="text-sm leading-relaxed text-[#9c6644]">
          {feature.desc}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ModernPromoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const textInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  // Parallax Background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // GSAP ScrollTrigger for the features grid stagger
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:py-32"
      style={{
        background: "linear-gradient(180deg, #fffdf9 0%, #fff8f0 60%, #fef3e2 100%)",
      }}
    >
      {/* Background Decor */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-[-10%] opacity-[0.3]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(192,86,33,0.15) 2px, transparent 2px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-orange-300/10 blur-[100px]" />
      </motion.div>

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* ── Top Hero Area ── */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 mb-24">
          
          {/* Left Text Box */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={textInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2 relative"
          >
            {/* 50% Badge */}
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -left-6 z-20 flex flex-col items-center justify-center rounded-full shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #c05621, #ed8936)",
                width: "110px",
                height: "110px",
              }}
            >
              <span className="text-white text-xs font-bold tracking-widest uppercase">
                Don't Miss
              </span>
              <span className="text-white text-2xl font-black leading-none text-center">
                50%
              </span>
            </motion.div>

            <div className="pl-6 lg:pl-12 pt-8">
              <span className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-6 border border-[#c05621]/30 text-[#c05621] bg-[#c05621]/5">
                Coobite Cookies
              </span>
              <h2
                className="text-5xl lg:text-7xl font-black leading-[1.05] mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: "#3d1f00" }}
              >
                One Bite Will Leave You <span style={{ color: "#c05621", fontStyle: "italic" }}>Wanting More.</span>
              </h2>
              <p className="text-lg mb-10 leading-relaxed max-w-md text-[#9c6644]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-lg shadow-[0_10px_30px_rgba(192,86,33,0.3)]"
                style={{ background: "linear-gradient(135deg, #c05621, #ed8936)" }}
              >
                <span className="relative z-10">Learn More</span>
                <motion.span 
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Image Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
            animate={textInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="lg:w-1/2 relative flex justify-center"
          >
            {/* Soft backdrop ring */}
            <div className="absolute inset-0 m-auto w-[80%] aspect-square rounded-full border border-[#c05621]/20 animate-[spin_20s_linear_infinite]" />
            
            {/* The Floating Image */}
            <motion.img
              src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1000&auto=format&fit=crop"
              alt="Delicious freshly baked cookies"
              className="relative z-10 w-full max-w-[500px] h-auto rounded-full object-cover shadow-2xl drop-shadow-2xl"
              animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ border: "12px solid #fffdf9" }}
            />
          </motion.div>
        </div>

        {/* ── Features Bento Grid ── */}
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 group">
          {FEATURES.map((feature, idx) => (
            <SpotlightCard key={feature.id} feature={feature} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}