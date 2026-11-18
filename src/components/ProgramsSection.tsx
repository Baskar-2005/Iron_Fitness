import { useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { buildWhatsAppUrl } from '../config/business';
import { PROGRAMS, type ProgramItem } from '../data/gymData';
import { SafeImage } from './SafeImage';

interface ProgramsSectionProps {
  onSelectProgram: (programName: string) => void;
}

function getProgramDisplayName(rawName: string): string {
  const map: Record<string, string> = {
    'STRENGTH TRAINING': 'Strength Training',
    'WEIGHT LOSS': 'Weight Loss',
    'WEIGHT GAIN': 'Weight Gain',
    'HIIT TRAINING': 'HIIT Training',
    CROSSFIT: 'CrossFit',
    'PERSONAL TRAINING': 'Personal Training',
    'ADULT SPORTS': 'Adult Sports',
  };
  return map[rawName] || rawName;
}

export function ProgramsSection({ onSelectProgram }: ProgramsSectionProps) {
  const [activeProgram, setActiveProgram] = useState<ProgramItem | null>(null);

  return (
    <section id="programs" className="py-20 lg:py-28 bg-[#0D0F12] border-t border-[#C5C8CE]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E32636] mb-3">
              Fitness Programs
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[0.02em] text-white">
              TRAIN YOUR WAY.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#C5C8CE] max-w-md leading-relaxed">
            Seven focused training tracks designed around real coaching guidance, modern strength
            equipment, and consistent conditioning.
          </p>
        </div>

        {/* Asymmetrical Grid: 01 & 04 featured wide spans on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {PROGRAMS.map((program, index) => {
            const colSpanClass =
              program.id === 'strength-training'
                ? 'lg:col-span-7'
                : program.id === 'weight-loss'
                  ? 'lg:col-span-5'
                  : program.id === 'weight-gain'
                    ? 'lg:col-span-4'
                    : program.id === 'hiit-training'
                      ? 'lg:col-span-8'
                      : 'lg:col-span-4';

            const mappedProgram = getProgramDisplayName(program.name);

            return (
              <motion.article
                key={program.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25) }}
                className={`${colSpanClass} group relative min-h-[310px] sm:min-h-[340px] bg-[#15171B] border border-[#C5C8CE]/15 hover:border-[#E32636]/70 overflow-hidden flex flex-col justify-end transition-colors`}
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <SafeImage
                    src={program.image}
                    alt={program.alt}
                    fallbackTitle={program.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/70 to-[#08090B]/20"
                  />
                </div>

                <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-end h-full">
                  <div className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#C5C8CE] mb-2">
                    <span className="tabular-nums text-[#E32636] font-display text-base">
                      {program.number}.
                    </span>
                    <span className="truncate">{program.focus}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-[0.03em] text-white mb-2">
                    {program.name}
                  </h3>

                  <p className="text-sm text-[#C5C8CE] leading-relaxed mb-5 max-w-lg">
                    {program.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#C5C8CE]/15">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveProgram(program);
                        onSelectProgram(mappedProgram);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] bg-[#E32636] hover:bg-[#c81e2c] text-white text-xs font-bold uppercase tracking-[0.12em] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>

                    <a
                      href={buildWhatsAppUrl(
                        `Hi IRON MAN FITNESS & GYM! I'd like details about your ${mappedProgram} program.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] text-xs font-semibold uppercase tracking-[0.1em] text-[#C5C8CE] hover:text-white transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#E32636]" aria-hidden="true" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {activeProgram && (
          <div className="mt-6 p-4 bg-[#15171B] border border-[#C5C8CE]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm text-[#C5C8CE]">
              Selected program:{' '}
              <strong className="text-white uppercase font-display tracking-wide">
                {activeProgram.name}
              </strong>{' '}
              — pre-filled in the membership enquiry form below.
            </p>
            <button
              type="button"
              onClick={() => setActiveProgram(null)}
              className="text-xs uppercase tracking-[0.12em] text-[#C5C8CE] hover:text-white self-start sm:self-auto cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
