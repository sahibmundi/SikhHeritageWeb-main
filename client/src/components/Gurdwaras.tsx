import { useState, useEffect } from "react";
import { X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import type { Gurdwara } from "@shared/schema";

interface GurdwarasProps {
  gurdwaras: Gurdwara[];
}

export function Gurdwaras({ gurdwaras }: GurdwarasProps) {
  const [selectedGurdwara, setSelectedGurdwara] = useState<Gurdwara | null>(null);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <section id="gurdwaras" className="py-16 md:py-24 bg-[#F5F7FF] dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A1A44] dark:text-yellow-400">
            ਗੁਰਦੁਆਰਾ ਸਾਹਿਬ
          </h2>
          <div className="w-24 h-1 mt-4 mx-auto bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" />
          <p className="text-lg md:text-xl text-[#243763] dark:text-gray-300 mt-4">
            ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਨਾਲ ਜੁੜੇ ਇਤਿਹਾਸਕ ਗੁਰਧਾਮ
          </p>
          <p className="text-sm text-[#3a4a7a] dark:text-gray-400 mt-2">
            ਕਿਸੇ ਵੀ ਗੁਰਦੁਆਰੇ ਦੇ ਕਾਰਡ 'ਤੇ ਕਲਿੱਕ ਕਰੋ ਅਤੇ ਪੂਰਾ ਇਤਿਹਾਸ ਪੜ੍ਹੋ
          </p>
        </div>

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
                onClick={() => setSelectedGurdwara(gurdwara)}
                data-testid={`card-gurdwara-${gurdwara.id}`}
                className="w-full text-left group relative rounded-xl border border-[#d0d8f5] dark:border-[#1d2b6b] bg-white dark:bg-[#101d3a] hover:bg-[#0A1A44] dark:hover:bg-[#0A1A44] shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col gap-3 cursor-pointer overflow-hidden"
              >
                {/* Index badge */}
                <span className="absolute top-3 right-3 text-[11px] font-bold text-[#c0caee] dark:text-[#3d4d7a] group-hover:text-yellow-400 transition-colors">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4 text-white" />
                </div>

                {/* Name */}
                <p className="text-[15px] font-bold text-[#0A1A44] dark:text-[#d4deff] group-hover:text-white transition-colors leading-snug pr-6">
                  {gurdwara.name}
                </p>

                {/* Hover cue */}
                <span className="text-xs text-[#7080b0] group-hover:text-yellow-300 transition-colors flex items-center gap-1">
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
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-start py-8 px-4 overflow-y-auto"
              onClick={() => setSelectedGurdwara(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-[#0A1A44] text-white rounded-2xl shadow-2xl max-w-3xl w-full border border-[#1d2b6b] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.96, transition: { duration: 0.2 } }}
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between px-6 py-5 border-b border-[#1d2b6b] bg-[#08163a]">
                  <div className="flex items-start gap-3 pr-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#F5F7FF] leading-snug">
                      {selectedGurdwara.name}
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

                {/* Modal Body - full history */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full" />
                    <h4 className="text-lg font-semibold text-yellow-400">ਇਤਿਹਾਸ</h4>
                  </div>
                  <p className="leading-relaxed whitespace-pre-line text-[#CBD5E1] text-[15px]">
                    {selectedGurdwara.fullHistory}
                  </p>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 border-t border-[#1d2b6b] bg-[#08163a] flex justify-end">
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
