"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Pillar {
  id: string;
  icon: string;
  title: string;
  body: string;
  accent: string;
  num: string;
}

// ─── Data ───────────────────────────────────────────────────────────────────────
const PILLARS: Pillar[] = [
  {
    id: "mission",
    icon: "🎯",
    title: "Our Mission",
    body: "To craft cookies that turn ordinary moments into cherished memories — bringing warmth, quality, and joy to every household in India.",
    accent: "#c05621",
    num: "01",
  },
  {
    id: "vision",
    icon: "🌟",
    title: "Our Vision",
    body: "To become India's most beloved artisan cookie brand — celebrated for uncompromising quality, authentic flavors, and a commitment to sustainable baking.",
    accent: "#ed8936",
    num: "02",
  },
];

const COOKIE_EMOJIS = ["🍪", "🍫", "🍯", "🧁", "🎂", "✨"];
const COOKIE_EMOJI_POSITIONS = COOKIE_EMOJIS.map((_, i) => {
  const angle = (i / COOKIE_EMOJIS.length) * Math.PI * 2;
  const r = 42;
  return {
    top: `calc(50% + ${(r * Math.sin(angle)).toFixed(4)}%)`,
    left: `calc(50% + ${(r * Math.cos(angle)).toFixed(4)}%)`,
  };
});

const INGREDIENTS = [
  { name: "Belgian Chocolate", icon: "🍫", pct: 92 },
  { name: "Pure Butter", icon: "🧈", pct: 97 },
  { name: "Natural Honey", icon: "🍯", pct: 88 },
  { name: "Organic Flour", icon: "🌾", pct: 100 },
];

// ─── Animated Number ────────────────────────────────────────────────────────────
function AnimNumber({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    gsap.to({ v: 0 }, {
      v: to,
      duration: 2.2,
      ease: "power2.out",
      onUpdate: function () {
        setVal(Math.round(this.targets()[0].v));
      },
    });
  }, [inView, to]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ─── Ingredient Bar ─────────────────────────────────────────────────────────────
function IngredientBar({ item, index }: { item: typeof INGREDIENTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <motion.span
            animate={inView ? { rotate: [0, 15, -5, 0], scale: [1, 1.2, 1] } : {}}
            transition={{ delay: 0.4 + index * 0.12, duration: 0.6 }}
            className="text-xl"
          >
            {item.icon}
          </motion.span>
          <span className="text-sm font-semibold" style={{ color: "#3d1f00" }}>
            {item.name}
          </span>
        </div>
        <span className="text-sm font-bold" style={{ color: "#c05621" }}>
          {item.pct}%
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(61,31,0,0.08)" }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${item.pct}%` } : {}}
          transition={{
            delay: 0.2 + index * 0.12,
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, #c05621, #ed8936, #f5c842)`,
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── Pillar Card ─────────────────────────────────────────────────────────────────
function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.15 + index * 0.15,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative overflow-hidden rounded-3xl p-8 cursor-default"
      style={{
        background: hovered
          ? "linear-gradient(135deg, rgba(245,166,35,0.07), rgba(192,86,33,0.04))"
          : "rgba(255,253,249,0.7)",
        border: `1px solid ${hovered ? "rgba(245,166,35,0.35)" : "rgba(61,31,0,0.08)"}`,
        boxShadow: hovered
          ? "0 20px 60px rgba(192,86,33,0.12), 0 4px 20px rgba(0,0,0,0.04)"
          : "0 4px 24px rgba(0,0,0,0.04)",
        backdropFilter: "blur(12px)",
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Number watermark */}
      <motion.div
        animate={{ opacity: hovered ? 0.06 : 0.03, scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute -bottom-4 -right-2 font-serif font-black pointer-events-none select-none"
        style={{
          fontSize: "9rem",
          lineHeight: 1,
          color: pillar.accent,
        }}
      >
        {pillar.num}
      </motion.div>

      {/* Icon */}
      <motion.div
        animate={{
          scale: hovered ? 1.15 : 1,
          rotate: hovered ? 10 : 0,
          y: hovered ? -4 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
        style={{
          background: `linear-gradient(135deg, ${pillar.accent}22, ${pillar.accent}11)`,
          border: `1px solid ${pillar.accent}33`,
        }}
      >
        {pillar.icon}
      </motion.div>

      {/* Title bar */}
      <div className="flex items-center gap-3 mb-3">
        <motion.div
          animate={{ width: hovered ? "32px" : "20px" }}
          transition={{ duration: 0.35 }}
          className="h-[2px] rounded-full"
          style={{ background: `linear-gradient(90deg, ${pillar.accent}, transparent)` }}
        />
        <h4
          className="font-serif font-bold tracking-wide uppercase text-xs"
          style={{ color: pillar.accent, letterSpacing: "0.15em" }}
        >
          {pillar.title}
        </h4>
      </div>

      <p
        className="text-sm leading-relaxed relative z-10"
        style={{ color: "#6b3a1f", lineHeight: "1.85" }}
      >
        {pillar.body}
      </p>

      {/* Hover bottom accent */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full"
        style={{
          background: `linear-gradient(90deg, ${pillar.accent}, transparent)`,
          transformOrigin: "left",
        }}
      />
    </motion.div>
  );
}

// ─── Image Mosaic (right side) ──────────────────────────────────────────────────
function ImageMosaic() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), {
    stiffness: 80,
    damping: 25,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [-30, 30]), {
    stiffness: 80,
    damping: 25,
  });
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div ref={ref} className="relative h-full min-h-[300px] lg:min-h-[580px]">
      {/* ── MAIN IMAGE BLOCK ── */}
      <Image src="/cookie-hero.png" width={1000} height={1000} alt="cookie" className="w-full h-[50%]" />

      {/* ── ACCENT IMAGE ── */}
      <Image src="/cookie-lifestyle.png" width={1000} height={1000} alt="cookie" className="w-full h-[35%] mt-16" />

      {/* ── INLINE STATS — mobile/tablet only ── */}
      <div className="flex gap-3 mt-6 lg:hidden">
        <div className="flex-1 flex items-center gap-3 rounded-2xl px-4 py-3"
          style={{ background: "rgba(255,253,249,0.95)", border: "1px solid rgba(245,166,35,0.2)", boxShadow: "0 8px 24px rgba(61,31,0,0.08)" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #fbd38d, #ed8936)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>🏆</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "#c05621", lineHeight: 1, fontFamily: "Playfair Display, serif" }}>
              <AnimNumber to={15} suffix="K+" />
            </div>
            <div style={{ fontSize: "0.6rem", color: "#9c6644", marginTop: 2 }}>Happy Customers</div>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl px-4 py-3"
          style={{ background: "rgba(61,31,0,0.88)", boxShadow: "0 8px 24px rgba(61,31,0,0.18)" }}>
          <div>
            <div style={{ fontFamily: "Playfair Display, serif", fontWeight: 900, fontSize: "1.4rem", color: "#ed8936", lineHeight: 1 }}>98%</div>
            <div style={{ fontSize: "0.6rem", color: "rgba(253,232,192,0.6)", letterSpacing: "0.1em", marginTop: 2, textTransform: "uppercase" }}>Satisfaction</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-full w-14 h-14 shrink-0"
          style={{ background: "linear-gradient(135deg, #c05621, #ed8936)", boxShadow: "0 6px 18px rgba(192,86,33,0.4)" }}>
          <div style={{ fontSize: "0.4rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Since</div>
          <div style={{ fontFamily: "Playfair Display, serif", fontWeight: 900, fontSize: "1.1rem", color: "#fff", lineHeight: 1 }}>2014</div>
        </div>
      </div>

      {/* ── FLOATING STAT CARD — desktop only ── */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.85 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
        className="hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "1%",
            left: "-4%",
            background: "rgba(255,253,249,0.95)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(245,166,35,0.2)",
            borderRadius: "20px",
            padding: "16px 20px",
            boxShadow: "0 16px 50px rgba(61,31,0,0.12)",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "12px",
              background: "linear-gradient(135deg, #fbd38d, #ed8936)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
              🏆
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "1.4rem", color: "#c05621", lineHeight: 1, fontFamily: "Playfair Display, serif" }}>
                <AnimNumber to={15} suffix="K+" />
              </div>
              <div style={{ fontSize: "0.7rem", color: "#9c6644", marginTop: "2px" }}>Happy Customers</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── EXPERIENCE BADGE — desktop only ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.9, type: "spring" }}
        className="hidden lg:block"
        style={{ position: "absolute", right: "-2%", bottom: "38%", zIndex: 10 }}
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ width: "80px", height: "80px", borderRadius: "50%",
            background: "linear-gradient(135deg, #c05621, #ed8936)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column", boxShadow: "0 8px 30px rgba(192,86,33,0.45)", cursor: "default" }}
        >
          <motion.div
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{ textAlign: "center" }}
          >
            <div style={{ fontFamily: "Playfair Display, serif", fontWeight: 900, fontSize: "1.4rem", color: "#fff", lineHeight: 1 }}>98%</div>
            <div style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.8)", letterSpacing: "0.1em" }}>SATISFACTION</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const inView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  // GSAP title underline draw
  useEffect(() => {
    if (!titleRef.current) return;
    const ctx = gsap.context(() => {
      const line = lineRef.current;
      if (!line) return;
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(160deg, #fffdf9 0%, #fff8f0 50%, #fef3e2 100%)",
      }}
      className="py-24  md:py-20 lg:py-[120px]"
    >
      {/* ── BACKGROUND TEXTURE ── */}
      <motion.div
        style={{
          y: bgY,
          position: "absolute",
          inset: "-10%",
          pointerEvents: "none",
        }}
      >
        {/* Subtle dotted grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(192,86,33,0.12) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            opacity: 0.4,
          }}
        />
        {/* Orb */}
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "60vw",
            height: "60vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,166,35,0.08), transparent 70%)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{
            position: "absolute",
            bottom: "-5%",
            left: "-5%",
            width: "50vw",
            height: "50vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(192,86,33,0.07), transparent 70%)",
          }}
        />
      </motion.div>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 5%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── TOP EYEBROW ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #ed8936, #c05621)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              flexShrink: 0,
              boxShadow: "0 4px 14px rgba(192,86,33,0.35)",
            }}
          >
            ☀
          </motion.div>
          <span
            style={{
              fontSize: "0.68rem",
              fontWeight: 800,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#c05621",
            }}
          >
            Who We Are
          </span>
          <div
            style={{
              flex: 1,
              maxWidth: "60px",
              height: "1px",
              background: "linear-gradient(90deg, #c05621, transparent)",
            }}
          />
        </motion.div>

        {/* ── MAIN HEADING ── */}
        <div style={{ position: "relative", marginBottom: "24px" }}>
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.1 }}
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(2.4rem, 5vw, 5rem)",
              fontWeight: 900,
              lineHeight: 1.06,
              color: "#3d1f00",
              letterSpacing: "-0.02em",
              position: "relative",
              display: "inline-block",
            }}
          >
            {/* Each word animated separately */}
            {"Elegant cookies for".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: -80 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{
                  delay: 0.1 + i * 0.1,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ display: "inline-block", marginRight: "0.3em" }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            {"sophisticated palates".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: -80 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{
                  delay: 0.5 + i * 0.12,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  display: "inline-block",
                  marginRight: "0.3em",
                  color: "#c05621",
                  fontStyle: "italic",
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
          {/* Animated underline */}
          <div
            ref={lineRef}
            style={{
              position: "absolute",
              bottom: "-8px",
              left: 0,
              width: "220px",
              height: "3px",
              borderRadius: "3px",
              background: "linear-gradient(90deg, #c05621, #ed8936, #fbd38d)",
              transformOrigin: "left",
            }}
          />
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[80px] items-start mt-10 lg:mt-[60px]">
          {/* LEFT COLUMN */}
          <div>
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: "1.05rem",
                color: "#6b3a1f",
                lineHeight: "1.88",
                marginBottom: "48px",
                maxWidth: "480px",
              }}
            >
              At Sun Delight, every cookie tells a story. We blend the finest
              ingredients with generations of baking wisdom — creating treats that
              aren't just delicious, but truly unforgettable.
            </motion.p>

            {/* Mission & Vision Cards */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "48px",
              }}
            >
              {PILLARS.map((p, i) => (
                <PillarCard key={p.id} pillar={p} index={i} />
              ))}
            </div>

            {/* Ingredient Quality Bars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: "rgba(255,253,249,0.7)",
                border: "1px solid rgba(245,166,35,0.15)",
                borderRadius: "24px",
                padding: "28px",
                backdropFilter: "blur(10px)",
                marginBottom: "36px",
              }}
            >
              <div
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#c05621",
                  marginBottom: "20px",
                }}
              >
                ✦ Ingredient Quality
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {INGREDIENTS.map((item, i) => (
                  <IngredientBar key={i} item={item} index={i} />
                ))}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <LearnMoreButton />
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Image Mosaic */}
          <ImageMosaic />
        </div>
      </div>
    </section>
  );
}

// ─── Learn More Button ──────────────────────────────────────────────────────────
function LearnMoreButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="/about-us"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.97 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "14px",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      {/* Circle with arrow */}
      <motion.div
        animate={{
          width: hovered ? "140px" : "52px",
          background: hovered
            ? "linear-gradient(135deg, #c05621, #ed8936)"
            : "rgba(61,31,0,0.06)",
          borderColor: hovered ? "transparent" : "rgba(61,31,0,0.15)",
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: "52px",
          borderRadius: "50px",
          border: "1.5px solid",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px 0 16px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <AnimatePresence>
          {hovered && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#fff",
                whiteSpace: "nowrap",
                letterSpacing: "0.05em",
              }}
            >
              Learn More
            </motion.span>
          )}
        </AnimatePresence>
        <motion.span
          animate={{
            rotate: hovered ? 45 : 0,
            color: hovered ? "#fff" : "#3d1f00",
          }}
          transition={{ duration: 0.35 }}
          style={{ fontSize: "1.2rem", flexShrink: 0 }}
        >
          →
        </motion.span>
      </motion.div>

      {/* Text label */}
      <motion.span
        animate={{ opacity: hovered ? 0 : 1, x: hovered ? 10 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          fontSize: "0.9rem",
          fontWeight: 600,
          color: "#6b3a1f",
          letterSpacing: "0.02em",
        }}
      >
        Discover Our Story
      </motion.span>
    </motion.a>
  );
}