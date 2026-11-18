interface BrandLogoProps {
  variant?: 'navbar' | 'preloader' | 'footer';
  compactMobile?: boolean;
}

export function BrandLogo({ variant = 'navbar', compactMobile = false }: BrandLogoProps) {
  if (variant === 'preloader') {
    return (
      <div className="flex flex-col items-center text-center select-none">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-5">
          <svg
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_0_24px_rgba(227,38,54,0.35)]"
            aria-hidden="true"
          >
            {/* Outer Octagonal Iron Crest */}
            <polygon
              points="22,4 58,4 76,22 76,58 58,76 22,76 4,58 4,22"
              fill="#111318"
              stroke="#C5C8CE"
              strokeOpacity="0.45"
              strokeWidth="2"
            />
            <polygon
              points="24,9 56,9 71,24 71,56 56,71 24,71 9,56 9,24"
              stroke="#E32636"
              strokeOpacity="0.45"
              strokeWidth="1"
            />
            {/* Angular Iron Face / Dumbbell Pillar Motif */}
            <path
              d="M21 22H31V58H21V22ZM49 22H59V58H49V22Z"
              fill="#FFFFFF"
            />
            <path
              d="M31 35H49V45H31V35Z"
              fill="#E32636"
            />
            {/* Top Armor V-Notch */}
            <path
              d="M32 16L40 26L48 16H55L40 32L25 16H32Z"
              fill="#C5C8CE"
            />
            {/* Bottom Crimson Core Chevron */}
            <path
              d="M33 64L40 53L47 64H33Z"
              fill="#E32636"
            />
          </svg>
        </div>

        <span className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-[0.14em] text-white leading-none">
          IRON MAN
        </span>
        <span className="mt-1.5 font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.34em] text-[#C5C8CE]">
          FITNESS &amp; GYM
        </span>
      </div>
    );
  }

  const iconSize = variant === 'footer' ? 'w-11 h-11' : 'w-8 h-8 sm:w-9 sm:h-9';

  return (
    <span className="inline-flex items-center gap-2.5 sm:gap-3 whitespace-nowrap shrink-0 select-none">
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconSize} shrink-0`}
        aria-hidden="true"
      >
        <polygon
          points="22,4 58,4 76,22 76,58 58,76 22,76 4,58 4,22"
          fill="#15171B"
          stroke="#C5C8CE"
          strokeOpacity="0.55"
          strokeWidth="2.5"
        />
        <path d="M21 22H31V58H21V22ZM49 22H59V58H49V22Z" fill="#FFFFFF" />
        <path d="M31 35H49V45H31V35Z" fill="#E32636" />
        <path d="M32 16L40 26L48 16H55L40 32L25 16H32Z" fill="#C5C8CE" />
        <path d="M33 64L40 53L47 64H33Z" fill="#E32636" />
      </svg>

      <span className="flex flex-col leading-none">
        <span className="font-display text-base sm:text-lg lg:text-xl font-bold uppercase tracking-[0.08em] text-white">
          IRON MAN
        </span>
        <span
          className={`font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] text-[#E32636] mt-0.5 ${
            compactMobile ? 'hidden xs:block sm:block' : 'block'
          }`}
        >
          FITNESS &amp; GYM
        </span>
      </span>
    </span>
  );
}
