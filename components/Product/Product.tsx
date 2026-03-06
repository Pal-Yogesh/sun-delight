"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Types ───────────────────────────────────────────────────────────────────
interface SKU {
  s: string;
  w: string;
  p: string;
}

interface Product {
  id: string;
  emoji: string;
  name: string;
  tagline: string;
  badge: string;
  badgeBg: string;
  chip: string;
  bg: string;
  dark?: boolean;
  desc: string;
  feats: string[];
  skus: SKU[];
}

// ─── Data ────────────────────────────────────────────────────────────────────
const SD: Product[] = [
  {
    id: "sd1", emoji: "🍪",
    name: "Butter Biscuit", tagline: "Golden, Buttery & Irresistible",
    badge: "BESTSELLER", badgeBg: "linear-gradient(135deg,#c05621,#ed8936)",
    chip: "🧈 Pure Butter",
    bg: "linear-gradient(150deg,#fef3e2,#fde8c0,#f5c842)",
    desc: "Our Butter Biscuit is made with the finest quality pure butter — light, golden and deliciously crispy with every bite. A timeless classic enjoyed by families across India, paired perfectly with chai or as a standalone snack. Available across three SKU sizes for every household need.",
    feats: ["🧈 Pure Butter", "🌾 Premium Flour", "🚫 No Trans Fat", "✅ FSSAI Certified", "📦 Freshness Sealed", "☀️ Sun Delight Brand"],
    skus: [
      { s: "SKU 5", w: "30 GM", p: "140 – (10×14) pcs" },
      { s: "SKU 10", w: "60 GM", p: "70 – (10×14) pcs" },
      { s: "SKU 20", w: "36 GM (ATC)", p: "110 – (10×14) pcs" },
    ],
  },
  {
    id: "sd2", emoji: "🍬",
    name: "Cream Biscuit", tagline: "Soft Centre, Crisp Shell",
    badge: "POPULAR", badgeBg: "linear-gradient(135deg,#ed8936,#f5c842)",
    chip: "🍦 Rich Cream Fill",
    bg: "linear-gradient(150deg,#fff8f0,#fde8d0,#ed8936)",
    desc: "Two crisp golden biscuits sandwiching a luscious, smooth cream filling — our Cream Biscuit is a household favourite reborn with premium ingredients. The perfect balance of crunch and creaminess that kids and adults alike will love.",
    feats: ["🍦 Rich Cream Fill", "🌾 Premium Flour", "🚫 No Artificial Colour", "✅ FSSAI Certified", "📦 Freshness Sealed", "☀️ Sun Delight Brand"],
    skus: [
      { s: "SKU 5", w: "30 GM", p: "140 – (10×14) pcs" },
      { s: "SKU 10", w: "60 GM", p: "70 – (10×14) pcs" },
      { s: "SKU 20", w: "36 GM", p: "120 – (10×14) pcs" },
    ],
  },
  {
    id: "sd3", emoji: "🍫",
    name: "Bourbon Biscuit", tagline: "Double Chocolate Decadence",
    badge: "FAVOURITE", badgeBg: "linear-gradient(135deg,#3d1f00,#6b3a1f)",
    chip: "🍫 Belgian Cocoa",
    bg: "linear-gradient(150deg,#3d1f00,#6b3a1f,#c05621)",
    dark: true,
    desc: "Two rich dark cocoa biscuits hugging a velvety Belgian-inspired chocolate cream filling. Our Bourbon Biscuit is crafted for the true chocolate lover — intense, smooth and utterly indulgent from the very first bite to the last crumb.",
    feats: ["🍫 Premium Cocoa", "🍬 Chocolate Cream", "🚫 No Trans Fat", "✅ FSSAI Certified", "📦 Freshness Sealed", "☀️ Sun Delight Brand"],
    skus: [
      { s: "SKU 5", w: "30 GM", p: "140 – (10×14) pcs" },
      { s: "SKU 10", w: "60 GM", p: "100 – (10×14) pcs" },
      { s: "SKU 20", w: "60 GM", p: "120 – (10×14) pcs" },
    ],
  },
];

const SZ_LIST = ["Butter Biscuit", "Coconut", "Kaju", "Jeera", "Cream", "Glucose", "Butter Badam", "Sweet & Salty", "Salty"];

// ─── Toast ───────────────────────────────────────────────────────────────────
function Toast({ show }: { show: boolean }) {
  return (
    <div
      className="fixed bottom-8 left-1/2 z-[2000] flex items-center gap-4 rounded-[22px] px-7 py-4 text-white pointer-events-none transition-all duration-500"
      style={{
        background: "linear-gradient(135deg,#3d1f00,#6b3a1f)",
        boxShadow: "0 18px 55px rgba(61,31,0,.38)",
        transform: show ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(90px)",
        opacity: show ? 1 : 0,
        whiteSpace: "nowrap",
      }}
    >
      <span className="text-2xl">📞</span>
      <div>
        <div className="font-bold text-[.95rem]">Sun Delight — Get In Touch</div>
        <div className="text-[.78rem] opacity-70">📍 Pitam Pura, New Delhi · Open 7AM – 9PM Daily</div>
      </div>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ p, index, onOpen, onContact }: { p: Product; index: number; onOpen: (id: string) => void; onContact: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current!.getBoundingClientRect();
    gsap.to(cardRef.current, {
      rotateY: ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 7,
      rotateX: -((e.clientY - r.top - r.height / 2) / (r.height / 2)) * 7,
      transformPerspective: 900, duration: 0.28, ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "elastic.out(1,.45)" });
  };

  const ringColor = p.dark ? "rgba(255,255,255,.07)" : "rgba(61,31,0,.06)";

  return (
    <div
      ref={cardRef}
      className="product-card relative rounded-[30px] overflow-visible border cursor-pointer group"
      style={{
        background: "#fffdf9",
        borderColor: "rgba(61,31,0,.07)",
        boxShadow: "0 6px 24px rgba(0,0,0,.05)",
        transition: "transform .5s cubic-bezier(.22,1,.36,1), box-shadow .5s, border-color .3s",
        willChange: "transform",
      }}
      onClick={() => onOpen(p.id)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image area */}
      <div className="h-[240px] rounded-t-[28px] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: p.bg }}>
          {[188, 144, 98].map((size, i) => (
            <div key={i} className="absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: size, height: size, border: `1px solid ${ringColor}`,
                animation: `spin ${[28, 18, 12][i] + index * [3, 2, 1][i]}s linear infinite ${i === 1 ? "reverse" : ""}` }} />
          ))}
          <div className="relative z-[3] transition-transform duration-500 group-hover:-translate-y-4 group-hover:rotate-12 group-hover:scale-125"
            style={{ filter: "drop-shadow(0 8px 18px rgba(0,0,0,.16))", fontSize: "6.5rem", lineHeight: 1 }}>
            {p.emoji}
          </div>
          {/* Shine sweep */}
          <div className="absolute inset-0 pointer-events-none z-[4] overflow-hidden">
            <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-500"
              style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,.32),transparent)" }} />
          </div>
        </div>
      </div>

      {/* Top-left label */}
      <div className="absolute top-[14px] left-[14px] z-[6] bg-white/90 backdrop-blur-md border border-orange-200/60 px-3 py-1 rounded-full text-[.6rem] font-extrabold text-[#c05621] uppercase tracking-widest">
        SKU 5 / 10 / 20
      </div>
      {/* Badge */}
      <div className="absolute top-[14px] right-[14px] z-[6] px-3 py-1 rounded-full text-[.6rem] font-extrabold text-white uppercase tracking-widest transition-transform duration-300 -rotate-6 group-hover:rotate-0 group-hover:scale-110"
        style={{ background: p.badgeBg, boxShadow: "0 4px 12px rgba(0,0,0,.22)" }}>
        {p.badge}
      </div>
      {/* Chip */}
      <div className="absolute bottom-[calc(100%-240px+14px)] left-1/2 z-[6] -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-white/90 backdrop-blur-md border border-orange-200/50 px-4 py-1 rounded-full text-[.6rem] font-bold text-[#6b3a1f] uppercase tracking-widest whitespace-nowrap">
        {p.chip}
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="font-serif font-black text-[1.25rem] text-[#3d1f00] mb-1 leading-tight">{p.name}</div>
        <div className="text-[.72rem] italic font-serif text-[#ed8936] mb-2 opacity-90">{p.tagline}</div>
        <div className="text-[.83rem] text-[#9c6644] leading-relaxed mb-4">{p.desc.slice(0, 108)}…</div>
        <div className="flex gap-2 flex-wrap mb-5">
          <span className="inline-flex items-center gap-1 bg-orange-50 border border-orange-200/60 px-3 py-1 rounded-full text-[.65rem] font-semibold text-[#6b3a1f]">📦 {p.skus[0].p}</span>
          <span className="inline-flex items-center gap-1 bg-orange-50 border border-orange-200/60 px-3 py-1 rounded-full text-[.65rem] font-semibold text-[#6b3a1f]">⚖️ {p.skus[0].w}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="py-3 rounded-[14px] border border-[#c05621]/30 text-[#c05621] text-[.82rem] font-bold flex items-center justify-center gap-2 hover:bg-[#c05621]/5 hover:-translate-y-0.5 transition-all"
            onClick={(e) => { e.stopPropagation(); onOpen(p.id); }}
          >🔍 Know More</button>
          <button
            className="py-3 rounded-[14px] text-white text-[.82rem] font-bold flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,#c05621,#ed8936)", boxShadow: "0 6px 20px rgba(192,86,33,.38)" }}
            onClick={(e) => { e.stopPropagation(); onContact(); }}
          >📞 Contact Us</button>
        </div>
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ product, onClose, onContact }: { product: Product | null; onClose: () => void; onContact: () => void }) {
  const open = !!product;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!product) return null;

  const ringColor = product.dark ? "rgba(255,255,255,.06)" : "rgba(61,31,0,.06)";

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 transition-opacity duration-300"
      style={{ background: "rgba(22,8,0,.76)", backdropFilter: "blur(12px)", opacity: open ? 1 : 0 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[#fffdf9] rounded-[34px] w-full max-w-[800px] max-h-[92vh] overflow-hidden flex flex-col"
        style={{ boxShadow: "0 50px 140px rgba(0,0,0,.42), 0 0 0 1px rgba(245,166,35,.14)" }}>

        {/* Hero */}
        <div className="h-[260px] sm:h-[290px] shrink-0 relative overflow-hidden flex items-center justify-center"
          style={{ background: product.bg }}>
          {[330, 255, 175].map((size, i) => (
            <div key={i} className="absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: size, height: size, border: `1px solid ${ringColor}`,
                animation: `spin ${[36, 24, 16][i]}s linear infinite ${i === 1 ? "reverse" : ""}` }} />
          ))}
          <div className="relative z-[3] text-[8rem] sm:text-[9.5rem]"
            style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,.24))", animation: "bob 3.8s ease-in-out infinite" }}>
            {product.emoji}
          </div>
          {/* Weight chips */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-[5] flex-wrap justify-center">
            {product.skus.map((s, i) => (
              <div key={i} className="px-4 py-1 rounded-full bg-white/90 backdrop-blur-md border border-orange-200/50 text-[.64rem] font-bold text-[#c05621] uppercase tracking-widest whitespace-nowrap">
                {s.s}: {s.w}
              </div>
            ))}
          </div>
          <button
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-[#3d1f00]/10 flex items-center justify-center text-[#3d1f00] hover:rotate-90 transition-transform duration-300"
            onClick={onClose}
          >✕</button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          <div className="font-serif font-black text-[1.8rem] sm:text-[2.1rem] text-[#3d1f00] mb-1 leading-tight">{product.name}</div>
          <div className="text-[.84rem] italic font-serif text-[#ed8936] mb-4 opacity-90">{product.tagline}</div>
          <hr className="border-none h-px mb-4" style={{ background: "linear-gradient(90deg,rgba(245,166,35,.3),transparent)" }} />
          <p className="text-[.93rem] text-[#6b3a1f] leading-relaxed mb-6">{product.desc}</p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.feats.map((f, i) => (
              <span key={i} className="inline-flex items-center gap-1 bg-orange-50 border border-orange-200/50 px-4 py-1.5 rounded-full text-[.72rem] font-semibold text-[#6b3a1f]">{f}</span>
            ))}
          </div>

          {/* SKU label */}
          <div className="flex items-center gap-2 text-[.68rem] font-extrabold uppercase tracking-widest text-[#c05621] mb-4">
            <span className="inline-block w-6 h-0.5 rounded" style={{ background: "linear-gradient(90deg,#c05621,transparent)" }} />
            SKU / Weight / CBB Details
          </div>

          {/* SKU grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-7">
            {product.skus.map((s, i) => (
              <div key={i} className="rounded-[18px] p-4 text-center border border-orange-200/40 hover:-translate-y-1 transition-transform"
                style={{ background: "linear-gradient(145deg,rgba(245,166,35,.06),rgba(192,86,33,.04))" }}>
                <div className="text-[.62rem] font-extrabold uppercase tracking-widest text-[#9c6644] mb-2">Pack Size</div>
                <div className="font-serif font-black text-[1.5rem] text-[#c05621] leading-none mb-1">{s.s.replace("SKU ", "")}</div>
                <div className="text-[.78rem] font-bold text-[#3d1f00] mb-1">{s.w}</div>
                <div className="text-[.72rem] text-[#9c6644]">{s.p}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-[1.4fr_1fr] gap-3">
            <button
              className="py-4 rounded-[18px] text-white font-bold flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all"
              style={{ background: "linear-gradient(135deg,#c05621,#ed8936)", boxShadow: "0 8px 26px rgba(192,86,33,.42)" }}
              onClick={onContact}
            >📞 Contact Us to Order</button>
            <button
              className="py-4 rounded-[18px] border border-[#c05621]/30 text-[#c05621] font-bold flex items-center justify-center gap-2 hover:bg-[#c05621]/5 hover:-translate-y-0.5 transition-all"
              onClick={onClose}
            >← Back to Products</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Product() {
  const [brand, setBrand] = useState<"sd" | "sz">("sd");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [showToast, setShowToast] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const showContact = useCallback(() => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setShowToast(true);
    if (activeProduct) setActiveProduct(null);
    toastTimer.current = setTimeout(() => setShowToast(false), 3500);
  }, [activeProduct]);

  const switchBrand = (b: "sd" | "sz") => {
    if (brand === b) return;
    gsap.to(gridRef.current, {
      opacity: 0, y: 18, duration: 0.28,
      onComplete: () => {
        setBrand(b);
        gsap.to(gridRef.current, { opacity: 1, y: 0, duration: 0.38, ease: "power3.out" });
      },
    });
  };

  // Animate cards on brand change
  useEffect(() => {
    if (brand !== "sd") return;
    setTimeout(() => {
      gsap.fromTo(".product-card",
        { opacity: 0, y: 55, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.13, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: false } }
      );
    }, 50);
  }, [brand]);

  const isSd = brand === "sd";

  return (
    <>
      {/* Global keyframes */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes bob { 0%,100% { transform: translateY(0) rotate(0) } 42% { transform: translateY(-15px) rotate(5deg) } 72% { transform: translateY(-7px) rotate(-3deg) } }
        @keyframes dotDrift { from { transform: translate(0) } to { transform: translate(12px,8px) } }
        @keyframes pulse { 0%,100% { transform: scale(1) } 50% { transform: scale(1.11) } }
        .product-card:hover { transform: translateY(-14px) scale(1.01) !important; box-shadow: 0 30px 70px rgba(192,86,33,.16), 0 8px 28px rgba(0,0,0,.09) !important; border-color: rgba(192,86,33,.24) !important; }
      `}</style>

      {/* Hero */}
      <div className="relative overflow-hidden text-center py-20 lg:py-28"
        style={{ background: "linear-gradient(150deg,#fffdf9,#fff8f0 50%,#fef3e2)" }}>
        {/* Dots */}
        <div className="absolute inset-[-15%] opacity-40 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle,rgba(192,86,33,.11) 1px,transparent 1px)", backgroundSize: "36px 36px", animation: "dotDrift 18s ease-in-out infinite alternate" }} />
        {/* Orbs */}
        <div className="absolute top-[-18%] right-[-6%] w-[58vw] h-[58vw] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(245,166,35,.08),transparent 65%)", animation: "pulse 9s ease-in-out infinite" }} />
        <div className="absolute bottom-[-12%] left-[-8%] w-[45vw] h-[45vw] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(192,86,33,.07),transparent 65%)", animation: "pulse 12s ease-in-out infinite 2s" }} />

        <div className="relative z-10 px-6">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-orange-300/40 bg-orange-50/60 backdrop-blur-md mb-6">
            <span className="inline-block" style={{ animation: "spin 10s linear infinite" }}>☀️</span>
            <span className="text-[.68rem] font-extrabold tracking-[.22em] uppercase text-[#c05621]">Our Product Range</span>
            <span className="inline-block" style={{ animation: "spin 10s linear infinite" }}>🍪</span>
          </div>
          <h1 className="font-serif font-black text-[#3d1f00] leading-tight mb-4"
            style={{ fontSize: "clamp(2.4rem,5.5vw,5.2rem)", letterSpacing: "-.02em" }}>
            Premium <em className="text-[#c05621] italic">Biscuits</em><br />Crafted With Love
          </h1>
          <p className="text-[#9c6644] text-base leading-relaxed max-w-[490px] mx-auto mb-10">
            Two trusted brands, one commitment to quality. Discover freshly baked biscuits from Sun Delight &amp; Sunzo — made for every palate.
          </p>

          {/* Brand tabs */}
          <div className="inline-flex gap-1 p-1.5 rounded-[18px]" style={{ background: "rgba(61,31,0,.08)" }}>
            <button
              onClick={() => switchBrand("sd")}
              className="px-8 py-3 rounded-[14px] text-[.88rem] font-bold tracking-wide flex items-center gap-2 transition-all duration-300"
              style={isSd ? { background: "linear-gradient(135deg,#c05621,#ed8936)", color: "#fff", boxShadow: "0 6px 22px rgba(192,86,33,.4)" } : { color: "#6b3a1f" }}
            >☀️ Sun Delight</button>
            <button
              onClick={() => switchBrand("sz")}
              className="px-8 py-3 rounded-[14px] text-[.88rem] font-bold tracking-wide flex items-center gap-2 transition-all duration-300"
              style={!isSd ? { background: "linear-gradient(135deg,#1a5c2a,#2d9e47)", color: "#fff", boxShadow: "0 6px 22px rgba(26,92,42,.38)" } : { color: "#6b3a1f" }}
            >🌿 Sunzo</button>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section className="relative py-20 px-6" style={{ background: "#fffdf9" }}>
        <div className="absolute inset-[-10%] opacity-35 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle,rgba(192,86,33,.07) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="max-w-[1280px] mx-auto relative z-10">
          {/* Section header */}
          <div className="flex items-start justify-between flex-wrap gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-0.5 rounded" style={{ background: isSd ? "linear-gradient(90deg,#c05621,transparent)" : "linear-gradient(90deg,#1a5c2a,transparent)" }} />
                <span className="text-[.68rem] font-extrabold tracking-[.22em] uppercase" style={{ color: isSd ? "#c05621" : "#1a5c2a" }}>
                  {isSd ? "Sun Delight Collection" : "Sunzo Collection"}
                </span>
                <span className="px-3 py-0.5 rounded-full text-[.65rem] font-bold"
                  style={{ background: isSd ? "rgba(192,86,33,.1)" : "rgba(26,92,42,.1)", color: isSd ? "#c05621" : "#1a5c2a" }}>
                  {isSd ? "3 Sample Products" : "9 Variants"}
                </span>
              </div>
              <h2 className="font-serif font-black text-[#3d1f00] leading-tight" style={{ fontSize: "clamp(1.6rem,3vw,2.6rem)" }}>
                {isSd ? <>Where every <em className="text-[#c05621] italic">cookie</em> is a smile.</> : <>Fresh <em className="text-[#c05621] italic">biscuits</em> for every home.</>}
              </h2>
              <p className="text-[.88rem] text-[#9c6644] leading-relaxed max-w-[400px] mt-2">
                {isSd ? "Click any product card to see full SKU details, weights & CBB info." : "Sunzo brings quality at the right price — available across SKU 5 & 10."}
              </p>
            </div>
          </div>

          {/* Grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isSd ? (
              SD.map((p, i) => (
                <ProductCard key={p.id} p={p} index={i} onOpen={(id) => setActiveProduct(SD.find(x => x.id === id) || null)} onContact={showContact} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 px-5">
                <span className="text-[4rem] block mb-5">🌿</span>
                <h3 className="font-serif font-black text-[#3d1f00] text-[2rem] mb-3">Sunzo Collection</h3>
                <p className="text-[#9c6644] text-[.95rem] max-w-[420px] mx-auto mb-6 leading-relaxed">
                  Affordable, quality biscuits available across SKU 5 and SKU 10 packs — crafted for every home. Contact us for bulk orders and dealership enquiries.
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                  {SZ_LIST.map((n) => (
                    <span key={n} className="px-4 py-1.5 rounded-full text-[.72rem] font-semibold border"
                      style={{ background: "rgba(45,158,71,.08)", borderColor: "rgba(45,158,71,.22)", color: "#1a5c2a" }}>
                      🌿 {n}
                    </span>
                  ))}
                </div>
                <button
                  className="inline-flex items-center gap-2 px-9 py-4 rounded-[16px] text-white font-bold text-[.9rem] hover:-translate-y-0.5 transition-all"
                  style={{ background: "linear-gradient(135deg,#c05621,#ed8936)", boxShadow: "0 6px 20px rgba(192,86,33,.38)" }}
                  onClick={showContact}
                >📞 Enquire About Sunzo</button>
              </div>
            )}
          </div>

          {/* More note */}
          {isSd && (
            <div className="text-center mt-14">
              <div className="inline-flex items-center gap-4 px-9 py-5 rounded-[22px] border border-orange-200/50"
                style={{ background: "rgba(245,166,35,.07)" }}>
                <span className="text-2xl">🍪</span>
                <div className="text-left">
                  <div className="font-serif font-bold text-[#3d1f00] text-base">More products available on request</div>
                  <div className="text-[.8rem] text-[#9c6644] mt-1">Coconut · Kaju · Jeera · Oreo · Milk · Digestive · Glucose · Butter Masala &amp; more</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {activeProduct && (
        <Modal product={activeProduct} onClose={() => setActiveProduct(null)} onContact={showContact} />
      )}

      {/* Toast */}
      <Toast show={showToast} />
    </>
  );
}
