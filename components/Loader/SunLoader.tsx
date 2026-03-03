import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SunLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsExiting(true);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-warm-lg"
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 rounded-full border-4 border-[#ed8936]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 text-center flex flex-col justify-center items-center"
          >
            <Image
              alt="logo"
              width={1000}
              height={1000}
              src="/logo-sun.png"
              className="w-32 h-16"
            />

            <p className="font-body mt-5 text-muted-foreground text-sm tracking-[0.3em] uppercase">
              Freshly Baked Happiness
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 w-48"
          >
            <div className="h-1 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2 font-body">
              {progress}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SunLoader;
