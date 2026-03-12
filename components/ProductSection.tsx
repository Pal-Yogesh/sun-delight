"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface Product {
  id: number;
  name: string;
  tagline: string;
  desc: string;
  emoji: string;
  image: string;
  badge: string;
  discount: string;
  // originalPrice: string;
  // salePrice: string;
  color: string;
  accentColor: string;
  bgGradient: string;
  tag: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Butter Cookies",
    tagline: "Golden & Irresistible",
    desc: "Rich, buttery, and melt-in-the-mouth cookies baked to perfection for a delightful indulgence.",
    emoji: "🍯",
    image: "/buiscuit/1.jpeg",
    badge: "BESTSELLER",
    discount: "Disc Up To 50% Off",
    // originalPrice: "₹240",
    // salePrice: "₹120",
    color: "#c05621",
    accentColor: "#f5c842",
    bgGradient:
      "linear-gradient(145deg, #fef3e2 0%, #fde8c0 50%, #f5c842 100%)",
    tag: "Sweet & Chewy",
  },
  {
    id: 2,
    name: "Coconut Cookies",
    tagline: "Tropical & Crunchy",
    desc: "A tropical twist with the goodness of coconut and a delicious crunchy texture.",
    emoji: "🍫",
    image: "/buiscuit/4.jpeg",
    badge: "50% OFF",
    discount: "Disc Up To 50% Off",
    // originalPrice: "₹260",
    // salePrice: "₹130",
    color: "#3d1f00",
    accentColor: "#c05621",
    bgGradient:
      "linear-gradient(145deg, #3d1f00 0%, #6b3a1f 50%, #c05621 100%)",
    tag: "Rich & Dark",
  },
  {
    id: 3,
    name: "Chocolate Cookies",
    tagline: "Rich & Satisfying",
    desc: "Loaded with chocolate goodness for those who love a rich and satisfying treat.",
    emoji: "🫐",
    image: "/buiscuit/6.jpeg",
    badge: "NEW",
    discount: "Disc Up To 50% Off",
    // originalPrice: "₹280",
    // salePrice: "₹140",
    color: "#5c2d0a",
    accentColor: "#ed8936",
    bgGradient:
      "linear-gradient(145deg, #fff8f0 0%, #fde8c0 40%, #ed8936 100%)",
    tag: "Crispy & Loaded",
  },
  {
    id: 4,
    name: "Tea Time Biscuits",
    tagline: "Perfect with Chai",
    desc: "Perfectly baked biscuits designed to complement your everyday cup of tea.",
    emoji: "🍓",
    image: "/buiscuit/5.jpeg",
    badge: "LIMITED",
    discount: "Disc Up To 50% Off",
    // originalPrice: "₹300",
    // salePrice: "₹150",
    color: "#9b1b30",
    accentColor: "#f5a623",
    bgGradient:
      "linear-gradient(145deg, #fff5f5 0%, #ffe4e6 50%, #fda4af 100%)",
    tag: "Sweet & Tangy",
  },
  {
    id: 5,
    name: "Glucose Biscuits",
    tagline: "Light & Energizing",
    desc: "Light, crispy, and energizing biscuits loved by families across generations.",
    emoji: "🍓",
    image: "/buiscuit/2.jpeg",
    badge: "POPULAR",
    discount: "Disc Up To 50% Off",
    // originalPrice: "₹300",
    // salePrice: "₹150",
    color: "#9b1b30",
    accentColor: "#f5a623",
    bgGradient:
      "linear-gradient(145deg, #fff5f5 0%, #ffe4e6 50%, #fda4af 100%)",
    tag: "Sweet & Tangy",
  },
  // {
  //   id: 6,
  //   name: "Cream Biscuits",
  //   tagline: "Smooth & Creamy",
  //   desc: "Crispy biscuit shells with a smooth cream filling — a classic favourite for all ages.",
  //   emoji: "🍓",
  //   image: "/buiscuit/6.jpeg",
  //   badge: "FAVOURITE",
  //   discount: "Disc Up To 50% Off",
  //   // originalPrice: "₹300",
  //   // salePrice: "₹150",
  //   color: "#9b1b30",
  //   accentColor: "#f5a623",
  //   bgGradient:
  //     "linear-gradient(145deg, #fff5f5 0%, #ffe4e6 50%, #fda4af 100%)",
  //   tag: "Sweet & Tangy",
  // },
];

// ─── Discount Badge ───────────────────────────────────────────────────────────
function DiscountBadge({ text, color }: { text: string; color: string }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -15 }}
      animate={{ scale: 1, rotate: -8 }}
      transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}
      whileHover={{ rotate: 0, scale: 1.08 }}
      style={{
        position: "absolute",
        top: "16px",
        right: "16px",
        background: `linear-gradient(135deg, ${color}, ${color}dd)`,
        color: "#fff",
        fontSize: "0.6rem",
        fontWeight: 800,
        letterSpacing: "0.12em",
        padding: "6px 12px",
        borderRadius: "50px",
        zIndex: 5,
        boxShadow: `0 4px 14px ${color}55`,
        textTransform: "uppercase",
      }}
    >
      {text}
    </motion.div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const isDark = product.id === 2;

  const handleAdd = useCallback(() => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    // GSAP particle burst
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    Array.from({ length: 8 }).forEach((_, i) => {
      const el = document.createElement("div");
      el.style.cssText = `
        position:fixed;z-index:9999;pointer-events:none;
        width:8px;height:8px;border-radius:50%;
        background:${product.accentColor};
        left:${rect.left + rect.width / 2}px;
        top:${rect.top + rect.height / 2}px;
      `;
      document.body.appendChild(el);
      const angle = (i / 8) * Math.PI * 2;
      gsap.to(el, {
        x: Math.cos(angle) * (40 + Math.random() * 40),
        y: Math.sin(angle) * (40 + Math.random() * 40),
        opacity: 0,
        scale: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => el.remove(),
      });
    });
  }, [product.accentColor]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ position: "relative" }}
    >
      <motion.div
        animate={{
          y: hovered ? -12 : 0,
          boxShadow: hovered
            ? `0 32px 70px ${product.color}28, 0 8px 30px rgba(0,0,0,0.1)`
            : "0 4px 24px rgba(0,0,0,0.06)",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        style={{
          borderRadius: "28px",
          overflow: "hidden",
          border: `1px solid ${hovered ? product.color + "30" : "rgba(61,31,0,0.07)"}`,
          background: "#fffdf9",
          transition: "border-color 0.4s",
          cursor: "pointer",
        }}
      >
        {/* ── Card Image Area ── */}
        <div
          style={{
            position: "relative",
            height: "220px",
            background: product.bgGradient,
            overflow: "hidden",
          }}
        >
          <DiscountBadge text={product.badge} color={product.color} />

          {/* Animated background rings */}
          {[0.95, 0.78, 0.6].map((s, i) => (
            <motion.div
              key={i}
              animate={{
                rotate: i % 2 === 0 ? [0, 360] : [360, 0],
                scale: hovered ? s * 1.05 : s,
              }}
              transition={{
                duration: 25 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: `${s * 200}px`,
                height: `${s * 200}px`,
                borderRadius: "50%",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(61,31,0,0.06)"}`,
              }}
            />
          ))}

          {/* Product image */}
          <motion.div
            // animate={{
            //   y: hovered ? -14 : 0,
            //   rotate: hovered ? 12 : 0,
            //   scale: hovered ? 1.08 : 1,
            // }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            // style={{
            //   position: "absolute",
            //   top: "50%",
            //   left: "50%",
            //   transform: "translate(-50%,-50%)",
            //   width: "160px",
            //   height: "160px",
            //   zIndex: 3,
            // }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className=""
              // style={{
              //   filter: hovered
              //     ? "drop-shadow(0 20px 30px rgba(0,0,0,0.3))"
              //     : "drop-shadow(0 6px 12px rgba(0,0,0,0.15))",
              //   transition: "filter 0.3s",
              // }}
            />
          </motion.div>

          {/* Shine sweep on hover */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={
              hovered ? { x: "200%", opacity: 1 } : { x: "-100%", opacity: 0 }
            }
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
              zIndex: 4,
              pointerEvents: "none",
            }}
          />

          {/* Bottom tag chip */}
          {/* <motion.div
            animate={{ y: hovered ? 0 : 8, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              bottom: "14px",
              left: "50%",
              transform: "translateX(-50%)",
              background: isDark ? "rgba(255,255,255,0.15)" : "rgba(61,31,0,0.1)",
              backdropFilter: "blur(8px)",
              color: isDark ? "#fff" : product.color,
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "5px 14px",
              borderRadius: "50px",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.2)" : product.color + "30"}`,
              whiteSpace: "nowrap",
              zIndex: 5,
            }}
          >
            {product.tag}
          </motion.div> */}
        </div>

        {/* ── Card Body ── */}
        <div style={{ padding: "22px 24px 24px" }}>
          {/* Discount label */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0.7 }}
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: product.color,
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <motion.span
              animate={{ rotate: hovered ? 20 : 0 }}
              style={{ display: "inline-block" }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              🏷️
            </motion.span>
            {product.discount}
          </motion.div>

          {/* Name */}
          <h3
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "1.25rem",
              fontWeight: 900,
              color: "#3d1f00",
              marginBottom: "4px",
              lineHeight: 1.2,
            }}
          >
            {product.name}
          </h3>
          <div
            style={{
              fontSize: "0.7rem",
              color: product.color,
              fontStyle: "italic",
              fontFamily: "Playfair Display, serif",
              marginBottom: "10px",
              opacity: 0.85,
            }}
          >
            {product.tagline}
          </div>

          <p
            style={{
              fontSize: "0.83rem",
              color: "#9c6644",
              lineHeight: 1.65,
              marginBottom: "18px",
            }}
          >
            {product.desc}
          </p>

          {/* Price + CTA row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* <div>
              <span
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "1.5rem",
                  fontWeight: 900,
                  color: product.color,
                  lineHeight: 1,
                }}
              >
                {product.salePrice}
              </span>
              <span
                style={{
                  fontSize: "0.82rem",
                  color: "#9c6644",
                  textDecoration: "line-through",
                  marginLeft: "8px",
                }}
              >
                {product.originalPrice}
              </span>
            </div> */}

            {/* Add to cart */}
            {/* <motion.button
              onClick={handleAdd}
              whileTap={{ scale: 0.9 }}
              animate={{
                background: added
                  ? "linear-gradient(135deg, #22c55e, #16a34a)"
                  : `linear-gradient(135deg, ${product.color}, ${product.accentColor})`,
                width: added ? "100px" : "42px",
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: "42px",
                borderRadius: "50px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: 700,
                boxShadow: `0 6px 20px ${product.color}44`,
                overflow: "hidden",
                padding: "0 14px",
              }}
            >
              <motion.span
                animate={{ rotate: added ? 360 : 0, scale: added ? 1.2 : 1 }}
                transition={{ duration: 0.4 }}
              >
                {added ? "✓" : "+"}
              </motion.span>
              <AnimatePresence>
                {added && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ fontSize: "0.72rem", whiteSpace: "nowrap" }}
                  >
                    Added!
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button> */}
          </div>

          {/* Progress bar "popularity" */}
          <div style={{ marginTop: "14px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.62rem",
                color: "#9c6644",
                marginBottom: "5px",
              }}
            >
              <span>Popularity</span>
              <span style={{ color: product.color, fontWeight: 700 }}>
                {85 + product.id * 3}%
              </span>
            </div>
            <div
              style={{
                height: "4px",
                borderRadius: "4px",
                background: "rgba(61,31,0,0.07)",
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${85 + product.id * 3}%` } : {}}
                transition={{
                  delay: 0.4 + index * 0.1,
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  height: "100%",
                  borderRadius: "4px",
                  background: `linear-gradient(90deg, ${product.color}, ${product.accentColor})`,
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Floating Section Title ───────────────────────────────────────────────────
function SectionTitle({ inView }: { inView: boolean }) {
  const words1 = "Where every buiscuit".split(" ");
  const words2 = "is a smile.".split(" ");

  return (
    <div style={{ textAlign: "center" }}>
      <h2
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(2.5rem, 5.5vw, 6rem)",
          fontWeight: 900,
          lineHeight: 1.06,
          letterSpacing: "-0.02em",
          color: "#3d1f00",
        }}
      >
        {words1.map((w, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 55, rotateX: -75 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
              delay: 0.1 + i * 0.1,
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: "inline-block", marginRight: "0.28em" }}
          >
            {w}
          </motion.span>
        ))}
        <br />
        {words2.map((w, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 55, rotateX: -75 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
              delay: 0.45 + i * 0.1,
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              display: "inline-block",
              marginRight: "0.28em",
              color: "#c05621",
              fontStyle: "italic",
            }}
          >
            {w}
          </motion.span>
        ))}
      </h2>
    </div>
  );
}

// ─── View Toggle ─────────────────────────────────────────────────────────────
function ViewToggle({
  view,
  onChange,
}: {
  view: "grid" | "list";
  onChange: (v: "grid" | "list") => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "2px",
        background: "rgba(61,31,0,0.06)",
        padding: "4px",
        borderRadius: "12px",
      }}
    >
      {(["grid", "list"] as const).map((v) => (
        <motion.button
          key={v}
          onClick={() => onChange(v)}
          animate={{
            background: view === v ? "#3d1f00" : "transparent",
            color: view === v ? "#fff" : "#9c6644",
          }}
          transition={{ duration: 0.25 }}
          style={{
            padding: "7px 14px",
            borderRadius: "9px",
            border: "none",
            cursor: "pointer",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {v === "grid" ? "⊞" : "≡"} {v}
        </motion.button>
      ))}
    </div>
  );
}

// ─── List Row Card ────────────────────────────────────────────────────────────
function ProductListRow({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        animate={{
          x: hovered ? 8 : 0,
          boxShadow: hovered
            ? `0 12px 40px ${product.color}20`
            : "0 2px 12px rgba(0,0,0,0.04)",
          background: hovered ? "rgba(255,253,249,1)" : "rgba(255,253,249,0.6)",
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          padding: "20px 28px",
          borderRadius: "20px",
          border: `1px solid ${hovered ? product.color + "25" : "rgba(61,31,0,0.07)"}`,
          cursor: "pointer",
          transition: "border-color 0.3s",
        }}
      >
        {/* Emoji */}
        <motion.div
          animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 8 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "18px",
            background: product.bgGradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </motion.div>
        {/* Info */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "4px",
            }}
          >
            <h3
              style={{
                fontFamily: "Playfair Display, serif",
                fontWeight: 900,
                fontSize: "1.1rem",
                color: "#3d1f00",
              }}
            >
              {product.name}
            </h3>
            <span
              style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "3px 8px",
                borderRadius: "50px",
                background: product.color + "18",
                color: product.color,
              }}
            >
              {product.badge}
            </span>
          </div>
          <p style={{ fontSize: "0.82rem", color: "#9c6644", lineHeight: 1.5 }}>
            {product.desc}
          </p>
        </div>
        {/* Price */}
        {/* <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontFamily: "Playfair Display, serif", fontSize: "1.4rem", fontWeight: 900, color: product.color, lineHeight: 1 }}>{product.salePrice}</div>
          <div style={{ fontSize: "0.78rem", color: "#9c6644", textDecoration: "line-through" }}>{product.originalPrice}</div>
        </div> */}
        {/* Arrow */}
        <motion.div
          animate={{ x: hovered ? 5 : 0, opacity: hovered ? 1 : 0.35 }}
          style={{ fontSize: "1.1rem", color: product.color, flexShrink: 0 }}
        >
          →
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState("All");

  const titleInView = useInView(titleRef, { once: true, margin: "-10% 0px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  const filters = ["All", "Bestsellers", "New Arrivals", "50% Off"];
  const filteredProducts = PRODUCTS.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Bestsellers") return p.badge === "BESTSELLER";
    if (filter === "New Arrivals") return p.badge === "NEW";
    if (filter === "50% Off")
      return p.badge === "50% OFF" || p.discount.includes("50");
    return true;
  });

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "120px 0 140px",
        background:
          "linear-gradient(180deg, #fffdf9 0%, #fff8f0 60%, #fef3e2 100%)",
      }}
    >
      {/* ── Background ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          style={{
            position: "absolute",
            inset: "-10%",
            backgroundImage:
              "radial-gradient(circle, rgba(192,86,33,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.35,
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "-20%",
            left: "-10%",
            width: "70vw",
            height: "70vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,166,35,0.07), transparent 65%)",
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
        {/* ── Section Header ── */}
        <div ref={titleRef} style={{ marginBottom: "60px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                height: "1px",
                width: "60px",
                background: "linear-gradient(90deg, transparent, #c05621)",
              }}
            />
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              style={{ fontSize: "1.1rem" }}
            >
              ☀️
            </motion.span>
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 800,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#c05621",
              }}
            >
              Our Specialties
            </span>
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              style={{ fontSize: "1.1rem" }}
            >
              🍪
            </motion.span>
            <div
              style={{
                height: "1px",
                width: "60px",
                background: "linear-gradient(90deg, #c05621, transparent)",
              }}
            />
          </motion.div>

          <SectionTitle inView={titleInView} />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.7 }}
            style={{
              textAlign: "center",
              color: "#9c6644",
              fontSize: "1rem",
              lineHeight: 1.8,
              maxWidth: "780px",
              margin: "20px auto 0",
            }}
          >
             Made with premium ingredients and Hygienically manufactured in
            modern facilities and Perfect balance of taste and crunch or Consistent
            quality in every batch designed to bring happiness to every
            bite{" "}
          </motion.p>
        </div>

        {/* ── Filter + View Controls ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "48px",
          }}
        >
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {filters.map((f) => (
              <motion.button
                key={f}
                onClick={() => setFilter(f)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                animate={{
                  background:
                    filter === f
                      ? "linear-gradient(135deg, #c05621, #ed8936)"
                      : "transparent",
                  color: filter === f ? "#fff" : "#6b3a1f",
                  borderColor:
                    filter === f ? "transparent" : "rgba(61,31,0,0.15)",
                  boxShadow:
                    filter === f ? "0 6px 20px rgba(192,86,33,0.35)" : "none",
                }}
                style={{
                  padding: "9px 22px",
                  borderRadius: "50px",
                  border: "1.5px solid",
                  cursor: "pointer",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  transition: "all 0.3s",
                }}
              >
                {f}
              </motion.button>
            ))}
          </div>
          <ViewToggle view={view} onChange={setView} />
        </motion.div>

        {/* ── Products ── */}
        <AnimatePresence mode="wait">
          {view === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {filteredProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
              {filteredProducts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    gridColumn: "1/-1",
                    textAlign: "center",
                    padding: "60px",
                    color: "#9c6644",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "12px" }}>
                    🍪
                  </div>
                  <div
                    style={{
                      fontFamily: "Playfair Display, serif",
                      fontSize: "1.2rem",
                    }}
                  >
                    No cookies found for this filter
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {filteredProducts.map((p, i) => (
                <ProductListRow key={p.id} product={p} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.7 }}
          style={{ textAlign: "center", marginTop: "70px" }}
        >
          <motion.a
            href="/product"
            whileHover={{ scale: 1.04, y: -4 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 44px",
              borderRadius: "50px",
              background: "linear-gradient(135deg, #c05621, #ed8936)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "0.95rem",
              letterSpacing: "0.04em",
              boxShadow: "0 8px 30px rgba(192,86,33,0.4)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.span
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2 }}
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                transform: "skewX(-20deg)",
              }}
            />
            <span>View All Products</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              🍪
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
