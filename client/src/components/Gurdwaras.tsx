import { useState, useEffect, useRef, useCallback } from "react";
import { X, MapPin, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import type { Gurdwara } from "@shared/schema";

interface GurdwarasProps {
  gurdwaras: Gurdwara[];
}

function cleanName(name: string) {
  return name.replace(/\\([()])/g, "$1");
}

export function Gurdwaras({ gurdwaras }: GurdwarasProps) {
  const [selectedGurdwara, setSelectedGurdwara] = useState<Gurdwara | null>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (selectedGurdwara) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedGurdwara]);

  const scrollToNode = useCallback((idx: number) => {
    const node = nodeRefs.current[idx];
    const container = sliderRef.current;
    if (!node || !container) return;
    const nodeLeft = node.offsetLeft;
    const nodeWidth = node.offsetWidth;
    const containerWidth = container.offsetWidth;
    const scrollTarget = nodeLeft - containerWidth / 2 + nodeWidth / 2;
    container.scrollTo({ left: scrollTarget, behavior: "smooth" });
  }, []);

  const handleNodeClick = (idx: number) => {
    setActiveIdx(idx);
    scrollToNode(idx);
  };

  const handlePrev = () => {
    const next = Math.max(0, activeIdx - 1);
    setActiveIdx(next);
    scrollToNode(next);
  };

  const handleNext = () => {
    const next = Math.min(gurdwaras.length - 1, activeIdx + 1);
    setActiveIdx(next);
    scrollToNode(next);
  };

  const activeGurdwara = gurdwaras[activeIdx];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.04 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <section id="gurdwaras" className="py-16 md:py-24 bg-[#F5F7FF] dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A1A44] dark:text-yellow-400">
            ਗੁਰਦੁਆਰਾ ਸਾਹਿਬ
          </h2>
          <div className="w-24 h-1 mt-4 mx-auto bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" />
          <p className="text-lg md:text-xl text-[#243763] dark:text-gray-300 mt-4">
            ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਨਾਲ ਜੁੜੇ ਇਤਿਹਾਸਕ ਗੁਰਧਾਮ
          </p>
        </div>

        {/* ── JOURNEY SLIDER ── */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-[#1d2b6b] shadow-xl bg-[#0A1A44]">

          {/* Slider Label */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 rounded-full bg-gradient-to-b from-yellow-400 to-orange-500" />
              <span className="text-sm font-semibold text-yellow-400 tracking-wide uppercase">
                ਯਾਤਰਾ ਮਾਰਗ — ਗੁਰੂ ਜੀ ਦਾ ਸਫਰ
              </span>
            </div>
            <span className="text-xs text-[#6070a0]">
              {activeIdx + 1} / {gurdwaras.length}
            </span>
          </div>

          {/* Track + nodes */}
          <div className="relative px-5 pb-1">
            {/* Scrollable row */}
            <div
              ref={sliderRef}
              className="overflow-x-auto scrollbar-hide pb-4 pt-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex items-center" style={{ minWidth: "max-content", paddingLeft: 8, paddingRight: 8 }}>
                {gurdwaras.map((g, idx) => {
                  const isActive = idx === activeIdx;
                  const isPast = idx < activeIdx;
                  return (
                    <div key={`slider-${g.id}-${idx}`} className="flex items-center">
                      {/* Connecting line (before every node except the first) */}
                      {idx > 0 && (
                        <div
                          className={`h-0.5 w-10 flex-shrink-0 transition-colors duration-300 ${
                            idx <= activeIdx
                              ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                              : "bg-[#1d2b6b]"
                          }`}
                        />
                      )}

                      {/* Node button */}
                      <button
                        ref={(el) => { nodeRefs.current[idx] = el; }}
                        onClick={() => handleNodeClick(idx)}
                        data-testid={`slider-node-${idx}`}
                        className={`relative flex-shrink-0 flex items-center justify-center rounded-full border-2 font-bold transition-all duration-300 focus:outline-none ${
                          isActive
                            ? "w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 border-yellow-300 text-[#0A1A44] shadow-lg shadow-yellow-500/30 scale-110"
                            : isPast
                            ? "w-7 h-7 bg-[#1a2d5a] border-yellow-600/60 text-yellow-500 hover:scale-105"
                            : "w-7 h-7 bg-[#0d1e3f] border-[#2a3d7a] text-[#4a5d9a] hover:border-yellow-500/50 hover:text-yellow-500/70 hover:scale-105"
                        }`}
                      >
                        <span className={isActive ? "text-sm" : "text-[10px]"}>
                          {idx + 1}
                        </span>
                        {/* Active glow pulse */}
                        {isActive && (
                          <span className="absolute inset-0 rounded-full bg-yellow-400/30 animate-ping" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Selected Gurdwara Info Panel */}
          <AnimatePresence mode="wait">
            {activeGurdwara && (
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mx-5 mb-5 rounded-xl bg-[#08163a] border border-[#1d2b6b] p-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-yellow-500 uppercase tracking-widest mb-0.5">
                      ਪੜਾਅ {activeIdx + 1}
                    </p>
                    <p className="text-sm md:text-base font-bold text-[#e8eeff] leading-snug">
                      {cleanName(activeGurdwara.name)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedGurdwara(activeGurdwara)}
                  data-testid={`slider-open-modal-${activeIdx}`}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-[#0A1A44] text-sm font-bold transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">ਇਤਿਹਾਸ ਪੜ੍ਹੋ</span>
                  <span className="sm:hidden">ਪੜ੍ਹੋ</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Arrow Nav */}
          <div className="flex items-center justify-between px-5 pb-5">
            <button
              onClick={handlePrev}
              disabled={activeIdx === 0}
              data-testid="slider-prev"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#6070a0] hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              ਪਿੱਛੇ
            </button>

            {/* Dot progress (mini-map) */}
            <div className="flex gap-1 overflow-hidden max-w-[200px]">
              {gurdwaras.slice(Math.max(0, activeIdx - 4), Math.min(gurdwaras.length, activeIdx + 5)).map((_, i) => {
                const realIdx = Math.max(0, activeIdx - 4) + i;
                return (
                  <div
                    key={realIdx}
                    onClick={() => handleNodeClick(realIdx)}
                    className={`cursor-pointer rounded-full transition-all duration-300 ${
                      realIdx === activeIdx ? "w-4 h-1.5 bg-yellow-400" : "w-1.5 h-1.5 bg-[#2a3d7a] hover:bg-[#4a5d9a]"
                    }`}
                  />
                );
              })}
            </div>

            <button
              onClick={handleNext}
              disabled={activeIdx === gurdwaras.length - 1}
              data-testid="slider-next"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#6070a0] hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ਅੱਗੇ
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grid instruction */}
        <p className="text-sm text-center text-[#3a4a7a] dark:text-gray-400 mb-6">
          ਕਿਸੇ ਵੀ ਗੁਰਦੁਆਰੇ ਦੇ ਕਾਰਡ 'ਤੇ ਕਲਿੱਕ ਕਰੋ ਅਤੇ ਪੂਰਾ ਇਤਿਹਾਸ ਪੜ੍ਹੋ
        </p>

        {/* 4-Column Name-Only Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {gurdwaras.map((gurdwara, idx) => (
            <motion.div key={`${gurdwara.id}-${idx}`} variants={itemVariants}>
              <button
                onClick={() => {
                  setSelectedGurdwara(gurdwara);
                  setActiveIdx(idx);
                }}
                data-testid={`card-gurdwara-${gurdwara.id}`}
                className={`w-full text-left group relative rounded-xl border transition-all duration-300 p-5 flex flex-col gap-3 cursor-pointer overflow-hidden shadow-sm hover:shadow-xl ${
                  idx === activeIdx
                    ? "border-yellow-400 bg-[#0A1A44] dark:bg-[#0A1A44]"
                    : "border-[#d0d8f5] dark:border-[#1d2b6b] bg-white dark:bg-[#101d3a] hover:bg-[#0A1A44] dark:hover:bg-[#0A1A44]"
                }`}
              >
                <span className={`absolute top-3 right-3 text-[11px] font-bold transition-colors ${
                  idx === activeIdx ? "text-yellow-400" : "text-[#c0caee] dark:text-[#3d4d7a] group-hover:text-yellow-400"
                }`}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <p className={`text-[15px] font-bold leading-snug pr-6 transition-colors ${
                  idx === activeIdx ? "text-white" : "text-[#0A1A44] dark:text-[#d4deff] group-hover:text-white"
                }`}>
                  {cleanName(gurdwara.name)}
                </p>
                <span className={`text-xs transition-colors flex items-center gap-1 ${
                  idx === activeIdx ? "text-yellow-300" : "text-[#7080b0] group-hover:text-yellow-300"
                }`}>
                  ਇਤਿਹਾਸ ਪੜ੍ਹੋ →
                </span>
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* MODAL */}
        <AnimatePresence>
          {selectedGurdwara && (
            <motion.div
              className="fixed inset-0 bg-black/70 z-50 flex justify-center items-start py-8 px-4 overflow-y-auto"
              onClick={() => setSelectedGurdwara(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-[#0A1A44] text-white rounded-2xl shadow-2xl max-w-3xl w-full border border-[#1d2b6b] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
                exit={{ opacity: 0, y: 20, scale: 0.96, transition: { duration: 0.2 } }}
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between px-6 py-5 border-b border-[#1d2b6b] bg-[#08163a]">
                  <div className="flex items-start gap-3 pr-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#F5F7FF] leading-snug">
                      {cleanName(selectedGurdwara.name)}
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedGurdwara(null)}
                    className="text-white hover:bg-white/10 flex-shrink-0"
                    data-testid="button-close-modal"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Modal Body */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full" />
                    <h4 className="text-lg font-semibold text-yellow-400">ਇਤਿਹਾਸ</h4>
                  </div>
                  <p className="leading-relaxed whitespace-pre-line text-[#CBD5E1] text-[15px]">
                    {selectedGurdwara.fullHistory}
                  </p>
                </div>

                {/* Modal Footer with prev/next */}
                <div className="px-6 py-4 border-t border-[#1d2b6b] bg-[#08163a] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const prevIdx = Math.max(0, activeIdx - 1);
                        setActiveIdx(prevIdx);
                        setSelectedGurdwara(gurdwaras[prevIdx]);
                        scrollToNode(prevIdx);
                      }}
                      disabled={activeIdx === 0}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-yellow-400 border border-yellow-400/30 hover:bg-yellow-400/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" /> ਪਿੱਛੇ
                    </button>
                    <button
                      onClick={() => {
                        const nextIdx = Math.min(gurdwaras.length - 1, activeIdx + 1);
                        setActiveIdx(nextIdx);
                        setSelectedGurdwara(gurdwaras[nextIdx]);
                        scrollToNode(nextIdx);
                      }}
                      disabled={activeIdx === gurdwaras.length - 1}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-yellow-400 border border-yellow-400/30 hover:bg-yellow-400/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      ਅੱਗੇ <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <Button
                    variant="outline"
                    className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-[#0A1A44]"
                    onClick={() => setSelectedGurdwara(null)}
                    data-testid="button-close-modal-footer"
                  >
                    ਬੰਦ ਕਰੋ
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
