import { ArrowRight, MessageCircle, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { BUSINESS_CONFIG, buildWhatsAppUrl } from '../config/business';
import { HERO_MEDIA } from '../data/gymData';
import { SafeImage } from './SafeImage';

interface HeroSectionProps {
  onJoinClick: () => void;
  onExploreProgramsClick: () => void;
}

export function HeroSection({ onJoinClick, onExploreProgramsClick }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100svh-3rem)] lg:min-h-[760px] flex items-center bg-[#08090B] overflow-hidden pt-16 lg:pt-20 pb-20 lg:pb-16"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <SafeImage
          src={HERO_MEDIA.image}
          alt={HERO_MEDIA.alt}
          loading="eager"
          fallbackTitle={BUSINESS_CONFIG.name}
          className="w-full h-full object-cover object-[72%_25%] md:object-[78%_center]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#08090B]/95 via-[#08090B]/85 md:via-[#08090B]/70 to-[#08090B]/45 md:to-[#08090B]/25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-transparent to-[#08090B]/60"
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 lg:py-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C5C8CE] mb-4"
          >
            <span>YOUR FITNESS. YOUR RULES.</span>
            <span className="text-[#E32636] hidden sm:inline" aria-hidden="true">/</span>
            <span className="text-[#C5C8CE]/85">MANJAKUPPAM, CUDDALORE</span>
          </motion.div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold uppercase leading-[0.95] tracking-[0.02em] text-white mb-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              BUILD STRENGTH.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[#E32636]"
            >
              BREAK LIMITS.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="text-base sm:text-lg text-[#C5C8CE] leading-relaxed max-w-xl mb-8"
          >
            Your fitness journey starts here. Train with modern equipment, expert guidance and a
            community that pushes you forward.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.46 }}
            className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8"
          >
            <button
              type="button"
              onClick={onJoinClick}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 min-h-[48px] bg-[#E32636] hover:bg-[#c81e2c] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.14em] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>JOIN THE GYM</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onExploreProgramsClick}
              className="inline-flex items-center justify-center px-6 py-4 min-h-[48px] bg-[#15171B]/90 hover:bg-[#1E2127] text-white border border-[#C5C8CE]/35 hover:border-white text-xs sm:text-sm font-bold uppercase tracking-[0.14em] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E32636]"
            >
              EXPLORE PROGRAMS
            </button>

            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] text-[#C5C8CE] hover:text-white text-xs font-semibold uppercase tracking-[0.12em] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E32636]"
            >
              <MessageCircle className="w-4 h-4 text-[#E32636]" aria-hidden="true" />
              <span>WhatsApp Enquiry</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.56 }}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 border-t border-[#C5C8CE]/20 text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-white"
          >
            <span className="inline-flex items-center gap-1.5 tabular-nums">
              <span className="text-[#E32636] font-display text-base">{BUSINESS_CONFIG.googleRating}</span>
              <Star className="w-3.5 h-3.5 fill-[#E32636] text-[#E32636]" aria-hidden="true" />
              <span>GOOGLE RATING</span>
            </span>
            <span className="text-[#C5C8CE]/45" aria-hidden="true">·</span>
            <span className="tabular-nums text-[#C5C8CE]">
              <strong className="text-white">{BUSINESS_CONFIG.googleReviewCount}</strong> CUSTOMER REVIEWS
            </span>
            <span className="text-[#C5C8CE]/45 hidden sm:inline" aria-hidden="true">·</span>
            <span className="text-[#C5C8CE] hidden sm:inline">{BUSINESS_CONFIG.category}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
