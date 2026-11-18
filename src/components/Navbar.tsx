import { useEffect, useState } from 'react';
import { ArrowRight, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BUSINESS_CONFIG, buildWhatsAppUrl } from '../config/business';
import { BrandLogo } from './BrandLogo';

interface NavLinkItem {
  id: string;
  label: string;
  href: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'programs', label: 'Programs', href: '#programs' },
  { id: 'facilities', label: 'Facilities', href: '#facilities' },
  { id: 'trainers', label: 'Trainers', href: '#trainers' },
  { id: 'gallery', label: 'Gallery', href: '#gallery' },
  { id: 'reviews', label: 'Reviews', href: '#reviews' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  onJoinClick: () => void;
}

export function Navbar({ onJoinClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 24);

      const scrollMarker = y + 140;
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].id);
        if (el && el.offsetTop <= scrollMarker) {
          setActiveSection(NAV_LINKS[i].id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string, id: string) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'top-0 lg:top-3 lg:px-6' : 'top-0 lg:px-0'
        }`}
      >
        <div
          className={`mx-auto transition-all duration-300 ${
            isScrolled
              ? 'max-w-7xl bg-[#0B0D11]/92 backdrop-blur-xl border-b lg:border border-[#C5C8CE]/20 shadow-[0_14px_40px_rgba(0,0,0,0.65)]'
              : 'max-w-7xl bg-gradient-to-b from-[#08090B]/90 via-[#08090B]/55 to-transparent border-b border-white/10 lg:border-transparent'
          }`}
        >
          <div className="px-4 sm:px-6 h-13 lg:h-16 flex items-center justify-between gap-4 lg:gap-6">
            <a
              href="#home"
              aria-label="IRON MAN FITNESS & GYM Home"
              onClick={() => setActiveSection('home')}
              className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E32636]"
            >
              <BrandLogo variant="navbar" />
            </a>

            <nav
              aria-label="Primary Navigation"
              className="hidden lg:flex items-center gap-1 xl:gap-2"
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setActiveSection(link.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative px-2.5 xl:px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E32636] ${
                      isActive ? 'text-white' : 'text-[#C5C8CE] hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="navActiveIndicator"
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-2.5 right-2.5 bottom-0.5 h-[2px] bg-[#E32636]"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] text-xs font-semibold uppercase tracking-[0.11em] text-[#C5C8CE] hover:text-white bg-[#15171B]/80 hover:bg-[#1E2127] border border-[#C5C8CE]/25 hover:border-[#C5C8CE]/55 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E32636]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#E32636]" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onJoinClick}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-5 py-2 min-h-[36px] lg:min-h-[40px] bg-[#E32636] hover:bg-[#c81e2c] text-white text-xs font-bold uppercase tracking-[0.13em] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Join Now</span>
                <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" aria-hidden="true" />
              </button>

              <button
                type="button"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-white hover:text-[#E32636] border border-[#C5C8CE]/20 bg-[#15171B]/80 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E32636]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-[#08090B]/98 backdrop-blur-xl flex flex-col justify-between p-5 sm:p-6 lg:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-[#C5C8CE]/15 pb-4">
              <BrandLogo variant="navbar" />
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 flex items-center justify-center text-white hover:text-[#E32636] border border-[#C5C8CE]/20 bg-[#15171B] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav aria-label="Mobile Menu Links" className="flex flex-col my-4">
              {NAV_LINKS.map((link, index) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href, link.id);
                    }}
                    className={`flex items-center justify-between py-3 border-b border-[#C5C8CE]/10 transition-all ${
                      isActive ? 'text-white pl-2' : 'text-[#C5C8CE] hover:text-white hover:pl-2'
                    }`}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-display text-sm text-[#E32636] tabular-nums">
                        0{index + 1}.
                      </span>
                      <span className="font-display text-2xl font-bold uppercase tracking-[0.06em]">
                        {link.label}
                      </span>
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 ${isActive ? 'text-[#E32636]' : 'text-[#C5C8CE]/40'}`}
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </nav>

            <div className="space-y-3 pt-4 border-t border-[#C5C8CE]/15">
              <div className="flex items-center justify-between text-xs text-[#C5C8CE]">
                <span>Manjakuppam, Cuddalore</span>
                <a href={BUSINESS_CONFIG.phoneTel} className="inline-flex items-center gap-1.5 text-white font-semibold tabular-nums">
                  <Phone className="w-3.5 h-3.5 text-[#E32636]" aria-hidden="true" />
                  <span>{BUSINESS_CONFIG.phoneDisplay}</span>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] flex items-center justify-center gap-2 border border-[#C5C8CE]/30 bg-[#15171B] text-white text-xs font-bold uppercase tracking-[0.12em]"
                >
                  <MessageCircle className="w-4 h-4 text-[#E32636]" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onJoinClick();
                  }}
                  className="min-h-[48px] flex items-center justify-center gap-2 bg-[#E32636] text-white text-xs font-bold uppercase tracking-[0.12em] cursor-pointer"
                >
                  <span>Join Now</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
