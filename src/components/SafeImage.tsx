import { useState } from 'react';
import { Dumbbell } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fallbackTitle?: string;
}

export function SafeImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  loading = 'lazy',
  fallbackTitle,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full bg-gradient-to-br from-[#15171B] via-[#0F1014] to-[#08090B] flex flex-col items-center justify-center p-6 text-center border border-[#C5C8CE]/10"
      >
        <Dumbbell className="w-8 h-8 text-[#E32636] mb-3" aria-hidden="true" />
        <span className="font-display text-sm tracking-[0.14em] uppercase text-[#C5C8CE]">
          {fallbackTitle || 'IRON MAN FITNESS & GYM'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
