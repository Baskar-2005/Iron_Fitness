import { Check, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { buildWhatsAppUrl } from '../config/business';
import { MEMBERSHIP_PLANS } from '../data/gymData';

interface MembershipPlansSectionProps {
  onEnquirePlan: (planName: string) => void;
}

export function MembershipPlansSection({ onEnquirePlan }: MembershipPlansSectionProps) {
  return (
    <section id="membership" className="py-20 lg:py-28 bg-[#0D0F12] border-t border-[#C5C8CE]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E32636] mb-3">
              Membership Options
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[0.02em] text-white">
              YOUR FITNESS STARTS HERE.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#C5C8CE] max-w-md leading-relaxed">
            Flexible Monthly, Quarterly, and Annual training options. Enquire below or on WhatsApp
            to receive current membership fees and student/group offers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {MEMBERSHIP_PLANS.map((plan, idx) => (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className={`flex flex-col justify-between p-7 sm:p-8 bg-[#15171B] border ${
                plan.recommended
                  ? 'border-[#E32636]'
                  : 'border-[#C5C8CE]/15 hover:border-[#C5C8CE]/40'
              } transition-colors`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.16em] mb-4">
                  <span className="text-[#C5C8CE]">{plan.duration}</span>
                  {plan.recommended && (
                    <span className="text-[#E32636]">Most Enquired</span>
                  )}
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-[0.03em] text-white mb-3">
                  {plan.name}
                </h3>

                <div className="py-4 mb-6 border-y border-[#C5C8CE]/15">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-white tracking-wide">
                    {plan.priceDisplay}
                  </div>
                  <p className="text-xs text-[#C5C8CE] mt-1">{plan.priceNote}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-sm text-[#C5C8CE]">
                      <Check
                        className="w-4 h-4 text-[#E32636] mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#C5C8CE]/10">
                <button
                  type="button"
                  onClick={() => onEnquirePlan(plan.name)}
                  className={`w-full min-h-[48px] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer whitespace-nowrap ${
                    plan.recommended
                      ? 'bg-[#E32636] hover:bg-[#c81e2c] text-white'
                      : 'bg-[#08090B] hover:bg-[#E32636] text-white border border-[#C5C8CE]/30 hover:border-[#E32636]'
                  }`}
                >
                  ENQUIRE FOR MEMBERSHIP
                </button>

                <a
                  href={buildWhatsAppUrl(
                    `Hi IRON MAN FITNESS & GYM! Please share the current fee and details for the ${plan.name} (${plan.duration}) membership plan.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#C5C8CE] hover:text-white transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#E32636]" aria-hidden="true" />
                  <span>Ask Rate on WhatsApp</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
