import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { ABOUT_MEDIA } from '../data/gymData';
import { SafeImage } from './SafeImage';

export function AboutSection() {
  const scrollToFacilities = () => {
    document.querySelector('#facilities')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E32636] mb-3">
              About IRON MAN FITNESS &amp; GYM
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-[0.98] tracking-[0.02em] text-white mb-6">
              MORE THAN A GYM.
              <span className="block text-[#C5C8CE]">A STRONGER YOU.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#C5C8CE] leading-relaxed mb-8">
              IRON MAN FITNESS &amp; GYM is a fitness destination in Manjakuppam, Cuddalore, offering
              a well-equipped workout environment, personalized coaching and fitness programs to help
              you work towards your goals.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-9 border-y border-[#C5C8CE]/15 py-6">
              {ABOUT_MEDIA.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm sm:text-base font-medium text-white">
                  <span className="w-6 h-6 bg-[#15171B] border border-[#E32636]/50 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#E32636]" aria-hidden="true" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div>
              <button
                type="button"
                onClick={scrollToFacilities}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[44px] bg-[#15171B] hover:bg-[#E32636] text-white border border-[#C5C8CE]/30 hover:border-[#E32636] text-xs font-bold uppercase tracking-[0.14em] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E32636]"
              >
                <span>DISCOVER OUR GYM</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 relative min-h-[340px] lg:min-h-[480px] bg-[#15171B] border border-[#C5C8CE]/15 overflow-hidden"
          >
            <SafeImage
              src={ABOUT_MEDIA.image}
              alt={ABOUT_MEDIA.alt}
              fallbackTitle="Manjakuppam Training Floor"
              className="w-full h-full lg:h-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#08090B]/75 via-transparent to-transparent"
            />
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-[#C5C8CE]">
              <span>Manjakuppam, Cuddalore</span>
              <span className="text-white font-semibold">Unisex Training Floor</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
