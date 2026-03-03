"use client"

import { useEffect, useState } from "react"

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0)
  // 0: initial, 1: sun enters, 2: rays expand + cookie draws, 3: cookie bakes, 4: exit

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3400),
      setTimeout(() => onComplete(), 4100),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-all duration-700 ${
        phase >= 4 ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
      style={{ background: "#FFFAF3" }}
    >
      {/* Soft radial warmth behind sun */}
      <div
        className="absolute transition-all duration-[1500ms] ease-out rounded-full"
        style={{
          width: phase >= 2 ? "140vmax" : "0px",
          height: phase >= 2 ? "140vmax" : "0px",
          background: "radial-gradient(circle, rgba(255,200,100,0.12) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Main content */}
      <div className="relative flex flex-col items-center gap-8">
        {/* Sun + Cookie combo */}
        <div className="relative w-40 h-40 md:w-48 md:h-48">
          {/* Sun image — circular, rises in */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              phase >= 1 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90"
            }`}
          >
            <div className="relative">
              <img
                src="/sun.jpeg"
                alt=""
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover"
                style={{
                  boxShadow: phase >= 2
                    ? "0 0 0 3px rgba(255,180,80,0.15), 0 8px 40px rgba(255,160,60,0.25)"
                    : "0 0 0 3px rgba(255,180,80,0.1), 0 4px 20px rgba(255,160,60,0.1)",
                  transition: "box-shadow 1.2s ease",
                }}
              />
              {/* Subtle rotating ring */}
              <svg
                className="absolute inset-[-18px] md:inset-[-20px] w-[calc(100%+36px)] h-[calc(100%+36px)] md:w-[calc(100%+40px)] md:h-[calc(100%+40px)]"
                viewBox="0 0 200 200"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="95"
                  fill="none"
                  stroke="rgba(220,160,60,0.2)"
                  strokeWidth="0.5"
                  className={`transition-all duration-[1200ms] ${
                    phase >= 2 ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    strokeDasharray: "8 12",
                    animation: phase >= 2 ? "spinSlow 12s linear infinite" : "none",
                  }}
                />
              </svg>
            </div>
          </div>

          {/* SVG rays that bloom outward */}
          <svg
            className="absolute inset-[-40%] w-[180%] h-[180%]"
            viewBox="0 0 300 300"
          >
            {Array.from({ length: 12 }, (_, i) => {
              const angle = (i * 30 * Math.PI) / 180
              const cx = 150
              const cy = 150
              const inner = 68
              const outer = 90 + (i % 2 === 0 ? 15 : 0)
              return (
                <line
                  key={i}
                  x1={cx + Math.cos(angle) * inner}
                  y1={cy + Math.sin(angle) * inner}
                  x2={cx + Math.cos(angle) * outer}
                  y2={cy + Math.sin(angle) * outer}
                  stroke="rgba(230,170,60,0.25)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className={`transition-all duration-[800ms] ease-out origin-center`}
                  style={{
                    opacity: phase >= 2 ? 1 : 0,
                    transform: phase >= 2 ? "scale(1)" : "scale(0)",
                    transitionDelay: `${i * 50}ms`,
                  }}
                />
              )
            })}
          </svg>

          {/* Cookie SVG — drawn with stroke animation */}
          <div
            className={`absolute bottom-[-10px] right-[-10px] md:bottom-[-8px] md:right-[-8px] transition-all duration-700 ease-out ${
              phase >= 2 ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          >
            <div className="relative">
              <svg width="56" height="56" viewBox="0 0 56 56" className="md:w-16 md:h-16">
                {/* Cookie body */}
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="#D4920A"
                  className="transition-all duration-1000"
                  style={{
                    filter: phase >= 3
                      ? "brightness(0.65) saturate(1.3)"
                      : "brightness(1) saturate(1)",
                  }}
                />
                {/* Cookie texture dots (chips) */}
                {[
                  [18, 16], [34, 14], [24, 28], [38, 30], [16, 34], [30, 38], [22, 20],
                ].map(([cx, cy], i) => (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="2.5"
                    fill="#8B5E0A"
                    className="transition-all duration-[600ms]"
                    style={{
                      opacity: phase >= 2 ? 1 : 0,
                      transitionDelay: `${300 + i * 80}ms`,
                    }}
                  />
                ))}
                {/* Outline stroke that draws in */}
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="rgba(139,94,10,0.3)"
                  strokeWidth="1"
                  strokeDasharray="151"
                  className="transition-all duration-[1200ms] ease-out"
                  style={{
                    strokeDashoffset: phase >= 2 ? 0 : 151,
                  }}
                />
              </svg>

              {/* Burn glow behind cookie */}
              <div
                className="absolute inset-0 rounded-full transition-all duration-[1000ms]"
                style={{
                  boxShadow: phase >= 3
                    ? "0 0 20px rgba(255,100,0,0.4), 0 0 40px rgba(255,80,0,0.15)"
                    : "0 0 0px transparent",
                }}
              />

              {/* Tiny smoke wisps */}
              {phase >= 3 && (
                <>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="absolute rounded-full animate-smokeWisp"
                      style={{
                        width: 4 + i * 2,
                        height: 4 + i * 2,
                        left: 16 + i * 10,
                        top: -4,
                        background: "rgba(180,160,140,0.25)",
                        animationDelay: `${i * 0.4}s`,
                      }}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Brand text */}
        <div className="flex flex-col items-center gap-2">
          <h1
            className={`font-playfair text-2xl md:text-3xl font-bold tracking-wide transition-all duration-700 ease-out ${
              phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{
              color: "#5C3A0A",
              transitionDelay: "200ms",
            }}
          >
            Sun Delight
          </h1>

          {/* Minimal progress line */}
          <div
            className={`h-[1.5px] rounded-full transition-all ease-out ${
              phase >= 1 ? "opacity-100" : "opacity-0"
            }`}
            style={{
              width: phase >= 3 ? 120 : phase >= 2 ? 80 : 0,
              background: "linear-gradient(90deg, transparent, #D4920A, transparent)",
              transitionDuration: phase >= 3 ? "1200ms" : "1000ms",
              transitionDelay: "300ms",
            }}
          />

          <p
            className={`text-xs tracking-[0.25em] uppercase transition-all duration-700 ${
              phase >= 2 ? "opacity-60" : "opacity-0"
            }`}
            style={{ color: "#8B6914", transitionDelay: "400ms" }}
          >
            {phase >= 3 ? "Almost ready" : "Baking fresh"}
          </p>
        </div>
      </div>
    </div>
  )
}
