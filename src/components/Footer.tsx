import { MessageCircle, Navigation, Phone } from 'lucide-react';
import { BUSINESS_CONFIG, buildWhatsAppUrl } from '../config/business';
import { BrandLogo } from './BrandLogo';

const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  return (
    <footer className="bg-[#050608] border-t border-[#C5C8CE]/15 pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#C5C8CE]/15">
          <div className="md:col-span-5">
            <a
              href="#home"
              aria-label="IRON MAN FITNESS & GYM Back to top"
              className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E32636]"
            >
              <BrandLogo variant="footer" />
            </a>
            <p className="font-display text-lg uppercase tracking-[0.08em] text-[#E32636] mt-4">
              &ldquo;{BUSINESS_CONFIG.tagline}&rdquo;
            </p>
            <p className="text-sm text-[#C5C8CE] leading-relaxed mt-3 max-w-md">
              {BUSINESS_CONFIG.address.full}
            </p>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white mb-4">
              Explore
            </h3>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm text-[#C5C8CE]">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white mb-4">
              Quick Actions
            </h3>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href={BUSINESS_CONFIG.phoneTel}
                className="inline-flex items-center gap-2.5 text-[#C5C8CE] hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#E32636]" aria-hidden="true" />
                <span>Call ({BUSINESS_CONFIG.phoneDisplay})</span>
              </a>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-[#C5C8CE] hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#E32636]" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
              <a
                href={BUSINESS_CONFIG.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-[#C5C8CE] hover:text-white transition-colors"
              >
                <Navigation className="w-4 h-4 text-[#E32636]" aria-hidden="true" />
                <span>Directions</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#C5C8CE]/80">
          <p>
            &copy; {new Date().getFullYear()} {BUSINESS_CONFIG.name}. All rights reserved.
          </p>
          <p>
            {BUSINESS_CONFIG.category} · Manjakuppam, Cuddalore · Closes{' '}
            {BUSINESS_CONFIG.confirmedClosingTime}
          </p>
        </div>
      </div>
    </footer>
  );
}
