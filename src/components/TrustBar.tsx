import { TRUST_METRICS } from '../data/gymData';

export function TrustBar() {
  return (
    <section
      aria-label="Gym Highlights"
      className="bg-[#15171B] border-y border-[#C5C8CE]/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#C5C8CE]/15">
          {TRUST_METRICS.map((item, idx) => (
            <div
              key={item.label}
              className={`py-6 sm:py-8 px-4 sm:px-6 flex flex-col justify-center ${
                idx % 2 === 1 ? 'border-l border-[#C5C8CE]/15 lg:border-l-0' : ''
              }`}
            >
              <span
                className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.03em] tabular-nums leading-none ${
                  item.accent ? 'text-[#E32636]' : 'text-white'
                }`}
              >
                {item.value}
              </span>
              <span className="mt-2 text-xs sm:text-sm font-medium uppercase tracking-[0.14em] text-[#C5C8CE]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
