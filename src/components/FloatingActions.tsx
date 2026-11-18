import { MessageCircle, Phone } from 'lucide-react';
import { BUSINESS_CONFIG, buildWhatsAppUrl } from '../config/business';

interface FloatingActionsProps {
  onJoinClick: () => void;
}

export function FloatingActions({ onJoinClick }: FloatingActionsProps) {
  return (
    <>
      {/* Desktop & Tablet Floating WhatsApp Button */}
      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with IRON MAN FITNESS & GYM"
        className="group fixed right-4 sm:right-5 bottom-16 lg:bottom-6 z-30 inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-3 min-h-[44px] bg-[#15171B] hover:bg-[#E32636] text-white border border-[#C5C8CE]/30 hover:border-[#E32636] shadow-lg transition-colors"
      >
        <MessageCircle className="w-4 h-4 text-[#E32636] group-hover:text-white shrink-0 transition-colors" aria-hidden="true" />
        <span className="hidden sm:inline text-xs font-bold uppercase tracking-[0.12em] whitespace-nowrap">
          WhatsApp
        </span>
      </a>

      {/* Mobile Sticky Bottom Action Bar: combined with 48px header stays strictly <= 15% viewport height */}
      <div
        role="region"
        aria-label="Mobile quick actions"
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#08090B]/95 backdrop-blur-md border-t border-[#C5C8CE]/20 h-12 grid grid-cols-2 divide-x divide-[#C5C8CE]/15"
      >
        <a
          href={BUSINESS_CONFIG.phoneTel}
          className="h-full min-h-[44px] flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-[#15171B] transition-colors"
        >
          <Phone className="w-4 h-4 text-[#E32636]" aria-hidden="true" />
          <span>CALL NOW</span>
        </a>

        <button
          type="button"
          onClick={onJoinClick}
          className="h-full min-h-[44px] flex items-center justify-center bg-[#E32636] hover:bg-[#c81e2c] text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer"
        >
          JOIN NOW
        </button>
      </div>
    </>
  );
}
