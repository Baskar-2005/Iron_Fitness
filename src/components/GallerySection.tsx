import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  type GalleryCategory,
} from '../data/gymData';
import { filterGalleryItems, getAdjacentGalleryIndex } from '../utils/enquiryValidation';
import { SafeImage } from './SafeImage';

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleItems = filterGalleryItems(GALLERY_ITEMS, selectedCategory);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : getAdjacentGalleryIndex(prev, visibleItems.length, 'next')
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : getAdjacentGalleryIndex(prev, visibleItems.length, 'prev')
        );
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, visibleItems.length]);

  const activeLightboxItem =
    lightboxIndex !== null && visibleItems[lightboxIndex] ? visibleItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#08090B] border-t border-[#C5C8CE]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E32636] mb-3">
              Gym Gallery
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[0.02em] text-white">
              INSIDE IRON MAN.
            </h2>
          </div>

          {/* Interactive category filter controls */}
          <div
            role="group"
            aria-label="Filter gallery by category"
            className="flex flex-wrap gap-1.5 bg-[#15171B] p-1.5 border border-[#C5C8CE]/15"
          >
            {GALLERY_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    setLightboxIndex(null);
                  }}
                  aria-pressed={active}
                  className={`px-3.5 py-2 min-h-[40px] text-xs font-semibold uppercase tracking-[0.1em] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#E32636] text-white'
                      : 'text-[#C5C8CE] hover:text-white hover:bg-[#1E2127]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile 2-column gallery, desktop 3-column asymmetrical gallery */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {visibleItems.map((item, idx) => {
            const featureSpan =
              selectedCategory === 'All' && idx === 0 ? 'col-span-2 lg:col-span-2' : 'col-span-1';
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`View ${item.title} (${item.category}) in lightbox`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`${featureSpan} group relative text-left aspect-[4/3] ${
                  selectedCategory === 'All' && idx === 0 ? 'lg:aspect-[16/9]' : ''
                } bg-[#15171B] border border-[#C5C8CE]/15 hover:border-[#E32636]/70 overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E32636]`}
              >
                <SafeImage
                  src={item.image}
                  alt={item.alt}
                  fallbackTitle={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#08090B]/90 via-[#08090B]/20 to-transparent"
                />
                <div className="absolute top-3 right-3 w-9 h-9 bg-[#08090B]/80 border border-[#C5C8CE]/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Expand className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#E32636]">
                    {item.category}
                  </span>
                  <span className="block font-display text-base sm:text-xl font-bold uppercase text-white mt-0.5 truncate">
                    {item.title}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && lightboxIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Gallery image preview: ${activeLightboxItem.title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-[#08090B]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#15171B] border border-[#C5C8CE]/20 overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#C5C8CE]/15">
                <div className="text-xs uppercase tracking-[0.14em] text-[#C5C8CE]">
                  <span className="text-[#E32636] font-semibold">{activeLightboxItem.category}</span>
                  <span className="mx-2" aria-hidden="true">·</span>
                  <span className="tabular-nums">
                    {lightboxIndex + 1} / {visibleItems.length}
                  </span>
                </div>
                <button
                  type="button"
                  aria-label="Close lightbox"
                  onClick={() => setLightboxIndex(null)}
                  className="w-10 h-10 flex items-center justify-center text-[#C5C8CE] hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-[16/10] bg-[#08090B]">
                <SafeImage
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.alt}
                  fallbackTitle={activeLightboxItem.title}
                  className="w-full h-full object-contain"
                />

                {visibleItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous gallery image"
                      onClick={() =>
                        setLightboxIndex((prev) =>
                          prev === null
                            ? null
                            : getAdjacentGalleryIndex(prev, visibleItems.length, 'prev')
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#08090B]/85 border border-[#C5C8CE]/30 hover:border-[#E32636] text-white flex items-center justify-center cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next gallery image"
                      onClick={() =>
                        setLightboxIndex((prev) =>
                          prev === null
                            ? null
                            : getAdjacentGalleryIndex(prev, visibleItems.length, 'next')
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#08090B]/85 border border-[#C5C8CE]/30 hover:border-[#E32636] text-white flex items-center justify-center cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              <div className="px-5 py-4 border-t border-[#C5C8CE]/15">
                <h3 className="font-display text-xl font-bold uppercase text-white">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-sm text-[#C5C8CE] mt-1">{activeLightboxItem.caption}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
