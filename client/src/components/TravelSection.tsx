import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Sparkles, 
  Mountain, 
  Waves,
  Quote
} from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { useData } from '../context/DataContext';
import { travelData as fallbackTravel, travelStats } from '../data/travelData';
import { TravelCard } from './TravelCard';
import { TravelLightbox } from './TravelLightbox';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export const TravelSection: React.FC = () => {
  const { travel: liveTravel } = useData();
  const destinations = liveTravel.length > 0 ? liveTravel : fallbackTravel;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  // Gallery items selection
  const miniGalleryItems = destinations.slice(0, 4);

  return (
    <section id="travel" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background visual ambience */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-emerald-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="05"
          badge="TRAVEL DIARIES"
          title="Beyond the Code"
          subtitle="Places, moments, and stories collected along mountain ridges, coastal shores, and remote valleys."
        />

        {/* Quick Travel Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          <div className="p-4 rounded-2xl bg-neutral-900/50 dark:bg-[#0B0F0D] light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 text-center">
            <p className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-400">{travelStats.totalSpots}</p>
            <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-600 mt-0.5">Destinations Explored</p>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-900/50 dark:bg-[#0B0F0D] light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 text-center">
            <p className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-400">{travelStats.districtsVisited}</p>
            <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-600 mt-0.5">Districts Traveled</p>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-900/50 dark:bg-[#0B0F0D] light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 text-center">
            <p className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-400">{travelStats.highestAltitude}</p>
            <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-600 mt-0.5">Highest Peak Reached</p>
          </div>
          <div className="p-4 rounded-2xl bg-neutral-900/50 dark:bg-[#0B0F0D] light:bg-white border border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200 text-center">
            <p className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-400">{travelStats.longestTrek}</p>
            <p className="text-xs text-neutral-400 dark:text-neutral-400 light:text-neutral-600 mt-0.5">Longest Single Trek</p>
          </div>
        </div>

        {/* 1. Large Feature Swiper Carousel */}
        <div className="relative rounded-3xl overflow-hidden bg-neutral-900/60 dark:bg-[#0B0F0D] light:bg-neutral-100 border border-neutral-800/90 dark:border-neutral-800/90 light:border-neutral-200 shadow-2xl p-3 sm:p-4 mb-16">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination, Autoplay, Keyboard, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: '.custom-travel-pagination',
            }}
            keyboard={{ enabled: true }}
            loop={true}
            className="rounded-2xl overflow-hidden"
          >
            {destinations.map((dest, idx) => (
              <SwiperSlide key={dest.id}>
                <div className="relative min-h-[440px] sm:min-h-[520px] lg:min-h-[580px] flex flex-col justify-end p-6 sm:p-10 lg:p-14 overflow-hidden rounded-2xl">
                  {/* Background Photo */}
                  <img
                    src={dest.image}
                    alt={dest.location}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="lazy"
                  />

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

                  {/* Slide Content Card */}
                  <div className="relative z-10 max-w-2xl space-y-4 text-left">
                    {/* Badge & Year */}
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500 text-black shadow-md">
                        {dest.category}
                      </span>
                      <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                        <Calendar size={13} /> {dest.date}
                      </span>
                      <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
                        • {dest.coordinates}
                      </span>
                    </div>

                    {/* Location Title */}
                    <div>
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                        {dest.location}
                      </h3>
                      <p className="text-sm font-semibold text-emerald-300 flex items-center gap-1.5 mt-1">
                        <MapPin size={15} /> {dest.country} — {dest.highlight}
                      </p>
                    </div>

                    {/* Personal Story Quote */}
                    <p className="text-sm sm:text-base text-neutral-200 leading-relaxed italic max-w-xl">
                      "{dest.storyQuote}"
                    </p>

                    {/* Action Button: Open Lightbox */}
                    <div className="pt-2">
                      <button
                        onClick={() => setLightboxIndex(idx)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/30 transition-all active:scale-95"
                      >
                        <Maximize2 size={13} />
                        <span>View Fullscreen Story</span>
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Carousel Custom Controls Bar */}
          <div className="flex items-center justify-between px-4 py-3 mt-2">
            {/* Prev Button */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="p-2.5 rounded-xl bg-neutral-800/80 hover:bg-emerald-500 hover:text-black text-white transition-all active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Pagination Dots */}
            <div className="custom-travel-pagination flex items-center justify-center gap-1.5" />

            {/* Next Button */}
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="p-2.5 rounded-xl bg-neutral-800/80 hover:bg-emerald-500 hover:text-black text-white transition-all active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* 2. Travel Mini Gallery Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white dark:text-white light:text-neutral-900 flex items-center gap-2">
                <Compass size={20} className="text-emerald-400" />
                <span>Curated Moments from the Road</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">Click any image to launch the fullscreen photo journal.</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 hidden sm:inline">
              ✦ {destinations.length} Featured Landscapes
            </span>
          </div>

          {/* Bento-like Grid: Big image (left) + 2 vertical (right) + 1 wide (bottom) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {destinations.length > 0 && (
              <div className="md:col-span-7 h-[360px] sm:h-[420px]">
                <TravelCard
                  destination={destinations[0]}
                  onClick={() => setLightboxIndex(0)}
                  className="h-full w-full"
                />
              </div>
            )}

            <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-5 h-[360px] sm:h-[420px]">
              {destinations.length > 1 && (
                <TravelCard
                  destination={destinations[1]}
                  onClick={() => setLightboxIndex(1)}
                  className="h-[170px] sm:h-[200px]"
                />
              )}
              {destinations.length > 2 && (
                <TravelCard
                  destination={destinations[2]}
                  onClick={() => setLightboxIndex(2)}
                  className="h-[170px] sm:h-[200px]"
                />
              )}
            </div>

            {destinations.length > 3 && (
              <div className="md:col-span-12 h-[260px] sm:h-[320px]">
                <TravelCard
                  destination={destinations[3]}
                  onClick={() => setLightboxIndex(3)}
                  className="h-full w-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <TravelLightbox
        destinations={destinations}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(newIdx) => setLightboxIndex(newIdx)}
      />
    </section>
  );
};
