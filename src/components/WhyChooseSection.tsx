import { Dumbbell, Flame, UserCheck, Users, Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import { DIFFERENTIATORS, type DifferentiatorItem } from '../data/gymData';

function renderDifferentiatorIcon(icon: DifferentiatorItem['icon']) {
  const props = { className: 'w-5 h-5 text-[#E32636]', 'aria-hidden': true as const };
  switch (icon) {
    case 'dumbbell':
      return <Dumbbell {...props} />;
    case 'userCheck':
      return <UserCheck {...props} />;
    case 'users':
      return <Users {...props} />;
    case 'wallet':
      return <Wallet {...props} />;
    case 'flame':
      return <Flame {...props} />;
  }
}

export function WhyChooseSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#08090B] border-t border-[#C5C8CE]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E32636] mb-3">
            Why Choose IRON MAN FITNESS
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[0.02em] text-white">
            WHAT MAKES US DIFFERENT?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          {DIFFERENTIATORS.map((item, idx) => {
            const spanClass = idx < 3 ? 'lg:col-span-2' : 'lg:col-span-3';
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`${spanClass} bg-[#15171B] border border-[#C5C8CE]/15 hover:border-[#E32636]/55 p-6 sm:p-7 flex flex-col justify-between transition-colors`}
              >
                <div>
                  <div className="w-11 h-11 bg-[#08090B] border border-[#C5C8CE]/20 flex items-center justify-center mb-5">
                    {renderDifferentiatorIcon(item.icon)}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-[0.04em] text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#C5C8CE] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
