import { Clock, ExternalLink, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { BUSINESS_CONFIG } from '../config/business';
import { GOOGLE_REVIEWS } from '../data/gymData';

export function ReviewsAndHoursSection() {
  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#0D0F12] border-t border-[#C5C8CE]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Google Reviews */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E32636] mb-3">
              Google Reviews
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[0.02em] text-white">
              TRUSTED BY FITNESS LOVERS.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="font-display text-3xl font-bold text-white tabular-nums">
                  {BUSINESS_CONFIG.googleRating}/5
                </span>
                <div className="flex items-center gap-0.5" aria-label="4.8 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#E32636] text-[#E32636]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs uppercase tracking-[0.14em] text-[#C5C8CE] tabular-nums mt-0.5">
                {BUSINESS_CONFIG.googleReviewCount} Google Reviews
              </p>
            </div>

            <a
              href={BUSINESS_CONFIG.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] bg-[#15171B] hover:bg-[#E32636] text-white border border-[#C5C8CE]/30 hover:border-[#E32636] text-xs font-bold uppercase tracking-[0.12em] transition-colors whitespace-nowrap shrink-0"
            >
              <span>VIEW GOOGLE REVIEWS</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {GOOGLE_REVIEWS.map((review, idx) => (
            <motion.blockquote
              key={review.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-[#15171B] border border-[#C5C8CE]/15 p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-5" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#E32636] text-[#E32636]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-base sm:text-lg text-white leading-relaxed font-medium">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>
              <footer className="mt-6 pt-4 border-t border-[#C5C8CE]/15 text-xs uppercase tracking-[0.12em] text-[#C5C8CE]">
                {review.sourceLabel}
              </footer>
            </motion.blockquote>
          ))}
        </div>

        {/* Opening Hours */}
        <div className="bg-[#15171B] border border-[#C5C8CE]/15 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#E32636] mb-3">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>Gym Hours</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white mb-4">
                OPEN UNTIL <span className="text-[#E32636]">{BUSINESS_CONFIG.confirmedClosingTime}</span>
              </h3>
              <p className="text-sm sm:text-base text-[#C5C8CE] leading-relaxed mb-4">
                Evening sessions run until 9:30 PM. Call or message on WhatsApp at{' '}
                <a
                  href={BUSINESS_CONFIG.phoneTel}
                  className="text-white font-semibold underline decoration-[#E32636] underline-offset-4"
                >
                  {BUSINESS_CONFIG.phoneDisplay}
                </a>{' '}
                to confirm morning opening hours and holiday timings.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="divide-y divide-[#C5C8CE]/15 border-y border-[#C5C8CE]/15">
                {BUSINESS_CONFIG.weeklyHours.map((row) => (
                  <div
                    key={row.day}
                    className="py-3 flex flex-wrap items-center justify-between gap-2 text-sm"
                  >
                    <span className="font-semibold text-white uppercase tracking-wider w-28">
                      {row.day}
                    </span>
                    <span className="text-[#C5C8CE] tabular-nums">
                      {row.openingTime} – <strong className="text-white">{row.closingTime}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
