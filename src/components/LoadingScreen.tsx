import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BrandLogo } from './BrandLogo';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return true;
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) {
      onComplete();
      return;
    }

    const start = performance.now();
    const duration = 900;
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (elapsed < duration) {
        frameId = requestAnimationFrame(tick);
      }
    };
    frameId = requestAnimationFrame(tick);

    const timer = window.setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 1050);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(timer);
    };
  }, [visible, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-label="Loading IRON MAN FITNESS & GYM"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#08090B] flex flex-col items-center justify-center px-6 select-none overflow-hidden"
        >
          {/* Subtle architectural metallic backdrop sheen */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,38,54,0.12)_0%,rgba(8,9,11,0)_58%)] pointer-events-none"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center w-full max-w-xs"
          >
            <BrandLogo variant="preloader" />

            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#C5C8CE]/80 text-center">
              STRENGTH · DISCIPLINE · TRANSFORMATION
            </p>

            {/* Sleek precision loading track */}
            <div className="w-full mt-7">
              <div className="h-[2px] w-full bg-[#15171B] overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'left' }}
                  className="h-full w-full bg-[#E32636]"
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C5C8CE]/70 tabular-nums">
                <span>MANJAKUPPAM · CUDDALORE</span>
                <span className="text-white">{progress}%</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setVisible(false);
                onComplete();
              }}
              className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5C8CE]/60 hover:text-white transition-colors cursor-pointer py-1 px-3"
            >
              Skip Intro
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
