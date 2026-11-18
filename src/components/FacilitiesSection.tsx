import { motion } from 'motion/react';
import { EQUIPMENT_SHOWCASE } from '../data/gymData';
import { SafeImage } from './SafeImage';

export function FacilitiesSection() {
  return (
    <section id="facilities" className="py-20 lg:py-28 bg-[#0D0F12] border-t border-[#C5C8CE]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E32636] mb-3">
              Equipment &amp; Facilities
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[0.02em] text-white">
              BUILT FOR PERFORMANCE.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#C5C8CE] max-w-md leading-relaxed">
            Dedicated zones for free weights, plate-loaded strength stations, cable rigs, and
            cardio conditioning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {EQUIPMENT_SHOWCASE.map((zone, idx) => {
            const spanClass = idx === 0 ? 'lg:col-span-6' : 'lg:col-span-3';
            return (
              <motion.figure
                key={zone.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className={`${spanClass} group relative min-h-[320px] lg:min-h-[420px] bg-[#15171B] border border-[#C5C8CE]/15 overflow-hidden flex flex-col justify-end`}
              >
                <div className="absolute inset-0">
                  <SafeImage
                    src={zone.image}
                    alt={zone.alt}
                    fallbackTitle={zone.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/35 to-transparent"
                  />
                </div>

                <figcaption className="relative z-10 p-6">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-[0.04em] text-white mb-1.5">
                    {zone.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C5C8CE] tracking-wide">
                    {zone.items.join(' · ')}
                  </p>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
