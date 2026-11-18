import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import {
  HERO_MEDIA,
  TRAINERS,
  TRANSFORMATION_MILESTONES,
} from '../data/gymData';
import { SafeImage } from './SafeImage';

interface TrainingAndTransformationSectionProps {
  onJoinClick: () => void;
}

export function TrainingAndTransformationSection({
  onJoinClick,
}: TrainingAndTransformationSectionProps) {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState(
    TRANSFORMATION_MILESTONES[0].id
  );

  const activeMilestone =
    TRANSFORMATION_MILESTONES.find((m) => m.id === selectedMilestoneId) ??
    TRANSFORMATION_MILESTONES[0];

  return (
    <>
      {/* Training Environment */}
      <section className="py-20 lg:py-28 bg-[#08090B] border-t border-[#C5C8CE]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 relative min-h-[320px] lg:min-h-[440px] bg-[#15171B] border border-[#C5C8CE]/15 overflow-hidden"
            >
              <SafeImage
                src="/src/assets/images/program_hiit_crossfit_1795010314979.jpg"
                alt="Functional conditioning and group workout floor at IRON MAN FITNESS & GYM"
                fallbackTitle="Training Environment"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#08090B]/85 via-transparent to-transparent"
              />
              <div className="absolute bottom-5 left-6 right-6 flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.14em] text-[#C5C8CE]">
                <span>Workout Sessions · Weightlifting · Functional Turf</span>
                <span className="text-[#E32636] font-semibold">Guided Floor Culture</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="lg:col-span-5 flex flex-col justify-center"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E32636] mb-3">
                Training Environment
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase leading-[0.98] tracking-[0.02em] text-white mb-5">
                TRAIN HARD.
                <span className="block text-[#C5C8CE]">STAY CONSISTENT.</span>
              </h2>
              <p className="text-base text-[#C5C8CE] leading-relaxed mb-6">
                Whether you are learning proper workout procedures on day one or pushing heavy
                compound sets, the training floor is structured for focus, safety, and steady energy.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-5 border-t border-[#C5C8CE]/15 text-sm text-white">
                <div>
                  <span className="block font-display text-lg uppercase text-[#E32636]">
                    Weightlifting
                  </span>
                  <span className="text-xs text-[#C5C8CE]">Free weights &amp; racks</span>
                </div>
                <div>
                  <span className="block font-display text-lg uppercase text-[#E32636]">
                    Group &amp; HIIT
                  </span>
                  <span className="text-xs text-[#C5C8CE]">Conditioning &amp; CrossFit</span>
                </div>
                <div>
                  <span className="block font-display text-lg uppercase text-[#E32636]">
                    Coach Support
                  </span>
                  <span className="text-xs text-[#C5C8CE]">Right workout procedures</span>
                </div>
                <div>
                  <span className="block font-display text-lg uppercase text-[#E32636]">
                    Unisex Floor
                  </span>
                  <span className="text-xs text-[#C5C8CE]">Welcoming atmosphere</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trainers Section — renders real trainer profiles when supplied, or clean coaching note */}
      <section id="trainers" className="py-16 lg:py-20 bg-[#0D0F12] border-t border-[#C5C8CE]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E32636] mb-3">
                Coaching &amp; Guidance
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[0.02em] text-white">
                GUIDANCE THAT PUSHES YOU FORWARD.
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#C5C8CE] max-w-lg leading-relaxed">
              Members receive hands-on assistance finding the right workout procedures, equipment
              setup, and progressive routines matched to their fitness goals.
            </p>
          </div>

          {TRAINERS.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TRAINERS.map((trainer) => (
                <article
                  key={trainer.id}
                  className="bg-[#15171B] border border-[#C5C8CE]/15 overflow-hidden"
                >
                  <div className="aspect-[4/3]">
                    <SafeImage
                      src={trainer.image}
                      alt={`${trainer.name} — ${trainer.specialization}`}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-bold uppercase text-white">
                      {trainer.name}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.14em] text-[#E32636] mt-1">
                      {trainer.specialization} · {trainer.experience}
                    </p>
                    <p className="text-sm text-[#C5C8CE] mt-3">
                      {trainer.certifications.join(' · ')}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-[#15171B] border border-[#C5C8CE]/15 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-[0.03em] text-white mb-2">
                  In-Person Coaching Orientation at Manjakuppam
                </h3>
                <p className="text-sm sm:text-base text-[#C5C8CE] max-w-2xl">
                  Visit the gym floor to meet our coaching team directly for posture checks,
                  personalized workout split planning, and 1-on-1 personal training options.
                </p>
              </div>
              <button
                type="button"
                onClick={onJoinClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[44px] bg-[#E32636] hover:bg-[#c81e2c] text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Request Coach Consultation</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Transformation & Progression Storytelling */}
      <section className="py-20 lg:py-28 bg-[#08090B] border-t border-[#C5C8CE]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E32636] mb-3">
                  Progression Philosophy
                </p>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[0.02em] text-white mb-6">
                  EVERY REP COUNTS.
                </h2>

                <div
                  role="tablist"
                  aria-label="Progression Pillars"
                  className="grid grid-cols-2 gap-2 mb-8"
                >
                  {TRANSFORMATION_MILESTONES.map((milestone) => {
                    const isSelected = milestone.id === activeMilestone.id;
                    return (
                      <button
                        key={milestone.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setSelectedMilestoneId(milestone.id)}
                        className={`px-4 py-3 min-h-[44px] text-left text-xs font-bold uppercase tracking-[0.12em] border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#E32636] border-[#E32636] text-white'
                            : 'bg-[#15171B] border-[#C5C8CE]/15 text-[#C5C8CE] hover:text-white hover:border-[#C5C8CE]/40'
                        }`}
                      >
                        {milestone.pillar}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#15171B] border border-[#C5C8CE]/15 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E32636] mb-2">
                  {activeMilestone.pillar}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white mb-3">
                  {activeMilestone.title}
                </h3>
                <p className="text-sm sm:text-base text-[#C5C8CE] leading-relaxed mb-6">
                  {activeMilestone.summary}
                </p>
                <ul className="space-y-2.5 border-t border-[#C5C8CE]/15 pt-5">
                  {activeMilestone.focusSteps.map((step) => (
                    <li key={step} className="flex items-center gap-2.5 text-sm text-white">
                      <CheckCircle2 className="w-4 h-4 text-[#E32636] shrink-0" aria-hidden="true" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[460px] bg-[#15171B] border border-[#C5C8CE]/15 overflow-hidden">
              <SafeImage
                src={HERO_MEDIA.image}
                alt="Strength progression training inside IRON MAN FITNESS & GYM"
                fallbackTitle="Every Rep Counts"
                className="w-full h-full object-cover object-right"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#08090B]/85 via-[#08090B]/20 to-transparent"
              />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-display text-2xl uppercase text-white tracking-wide">
                  Consistency Builds Real Results
                </p>
                <p className="text-xs text-[#C5C8CE] mt-1">
                  Track strength milestones &amp; conditioning progress with guided coaching.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
