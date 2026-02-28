import { useState, useEffect, useCallback } from "react";
import { MapPin, X, Calendar, ChevronRight, ChevronLeft, LayoutGrid, Rows3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PdfList } from "@/components/PdfViewer";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import type { Gurdwara } from "@shared/schema";

interface GurdwarasProps {
  gurdwaras: Gurdwara[];
}

type ViewMode = "carousel" | "grid";

export function Gurdwaras({ gurdwaras }: GurdwarasProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("carousel");
  const [selectedGurdwara, setSelectedGurdwara] = useState<Gurdwara | null>(
    null,
  );
  
  // Embla Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 1 },
    },
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // 🔒 SCROLL LOCK FIX
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
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // Group gurdwaras into slides of 3
  const slides = [];
  for (let i = 0; i < gurdwaras.length; i += 3) {
    slides.push(gurdwaras.slice(i, i + 3));
  }

  return (
    <section id="gurdwaras" className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & View Toggle */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A1A44] dark:text-yellow-400">
            ਗੁਰਦੁਆਰਾ ਸਾਹਿਬ
          </h2>
          <div className="w-24 h-1 mt-4 mx-auto bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" />
          <p className="text-lg md:text-xl text-[#243763] dark:text-gray-300 mt-4">
            ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਨਾਲ ਜੁੜੇ ਇਤਿਹਾਸਕ ਗੁਰਧਾਮ
          </p>
          
          {/* View Mode Toggle */}
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant={viewMode === "carousel" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("carousel")}
              className="flex items-center gap-2"
              data-testid="button-view-carousel"
            >
              <Rows3 className="w-4 h-4" />
              Carousel
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="flex items-center gap-2"
              data-testid="button-view-grid"
            >
              <LayoutGrid className="w-4 h-4" />
              Grid
            </Button>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {gurdwaras.map((gurdwara) => (
              <motion.div key={gurdwara.id} variants={itemVariants}>
                <Card
                  className="cursor-pointer shadow-lg hover:shadow-xl transition rounded-xl overflow-hidden bg-white dark:bg-gray-800 h-full flex flex-col"
                  onClick={() => setSelectedGurdwara(gurdwara)}
                  data-testid={`card-gurdwara-grid-${gurdwara.id}`}
                >
                  {gurdwara.imageUrl && (
                    <div className="aspect-video overflow-hidden bg-gray-200">
                      <img
                        src={gurdwara.imageUrl}
                        alt={gurdwara.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-[#0A1A44] dark:text-yellow-400">
                      {gurdwara.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4 flex-grow flex flex-col">
                    <p className="text-[#1b2553] dark:text-gray-300 text-sm line-clamp-3 flex-grow">
                      {gurdwara.briefHistory}
                    </p>

                    <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <MapPin className="w-4 h-4" />
                      {gurdwara.location.address}
                    </p>

                    <Button
                      className="w-full flex items-center justify-center gap-2"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGurdwara(gurdwara);
                      }}
                      data-testid={`button-details-grid-${gurdwara.id}`}
                    >
                      ਪੂਰੀ ਜਾਣਕਾਰੀ ਦੇਖੋ
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Carousel Container */}
        {viewMode === "carousel" && (
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            size="icon"
            variant="outline"
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-12 w-12 rounded-full shadow-lg bg-white dark:bg-gray-800 border-2 hover-elevate"
            data-testid="button-carousel-prev"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            size="icon"
            variant="outline"
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-12 w-12 rounded-full shadow-lg bg-white dark:bg-gray-800 border-2 hover-elevate"
            data-testid="button-carousel-next"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {slides.map((slide, slideIndex) => (
                <div
                  key={slideIndex}
                  className="flex-shrink-0 flex-grow-0 basis-full"
                >
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2"
                  >
                    {slide.map((gurdwara) => (
                      <motion.div key={gurdwara.id} variants={itemVariants}>
                        <Card
                          className="cursor-pointer shadow-lg hover:shadow-xl transition rounded-xl overflow-hidden bg-white dark:bg-gray-800"
                          onClick={() => setSelectedGurdwara(gurdwara)}
                          data-testid={`card-gurdwara-${gurdwara.id}`}
                        >
                          {/* Image */}
                          {gurdwara.imageUrl && (
                  <div className="aspect-video overflow-hidden bg-gray-200">
                    <img
                      src={gurdwara.imageUrl}
                      alt={gurdwara.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#0A1A44] dark:text-yellow-400">
                    {gurdwara.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-[#1b2553] dark:text-gray-300 text-sm line-clamp-3">
                    {gurdwara.briefHistory}
                  </p>

                  <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    {gurdwara.location.address}
                  </p>

                  <Button
                    className="w-full flex items-center justify-center gap-2"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedGurdwara(gurdwara);
                    }}
                    data-testid={`button-details-${gurdwara.id}`}
                  >
                    ਪੂਰੀ ਜਾਣਕਾਰੀ ਦੇਖੋ
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-12" data-testid="carousel-pagination">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`transition-all rounded-full ${
                  index === selectedIndex
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 w-12 h-3"
                    : "bg-gray-300 dark:bg-gray-600 w-3 h-3 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                data-testid={`dot-${index}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        )}

        {/* MODAL */}
        <AnimatePresence>
          {selectedGurdwara && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-start py-10 overflow-y-auto"
              onClick={() => setSelectedGurdwara(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-[#0A1A44] text-white rounded-2xl shadow-2xl max-w-4xl w-full border border-[#1d2b6b] max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.6, rotateX: 30 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateX: 0,
                  transition: {
                    duration: 0.45,
                    type: "spring",
                    stiffness: 120,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, scale: 0.6, rotateX: -20 }}
              >
                {/* MODAL HEADER */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#1d2b6b] bg-[#0A1A44]">
                  <h3 className="text-2xl font-bold text-[#F5F7FF]">
                    {selectedGurdwara.name}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedGurdwara(null)}
                  >
                    <X className="w-6 h-6 text-white" />
                  </Button>
                </div>

                {/* MODAL CONTENT */}
                <div className="p-6 space-y-8 text-[#E2E8F0]">
                  {/* IMAGE */}
                  {selectedGurdwara.imageUrl && (
                    <div className="aspect-video rounded-lg overflow-hidden border border-[#1d2b6b]">
                      <img
                        src={selectedGurdwara.imageUrl}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* FULL HISTORY */}
                  <div>
                    <h4 className="text-xl font-semibold text-yellow-400 mb-3">
                      ਇਤਿਹਾਸ:
                    </h4>
                    <p className="leading-relaxed whitespace-pre-line">
                      {selectedGurdwara.fullHistory}
                    </p>
                  </div>

                  {/* VISIT DATE */}
                  {selectedGurdwara.visitDate && (
                    <div>
                      <h4 className="text-xl font-semibold text-yellow-400 mb-3">
                        ਯਾਤਰਾ ਸਮਾਂ:
                      </h4>
                      <div className="flex items-center gap-3 bg-blue-200/20 p-4 rounded-lg border border-blue-300/30">
                        <Calendar className="w-5 h-5 text-yellow-300" />
                        <span className="font-medium text-yellow-200 text-lg">
                          {selectedGurdwara.visitDate}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* LOCATION */}
                  <div>
                    <h4 className="text-xl font-semibold text-yellow-400 mb-3">
                      ਸਥਿਤੀ:
                    </h4>

                    <div className="flex items-center gap-2 text-[#E2E8F0] mb-4">
                      <MapPin className="w-5 h-5 text-red-400" />
                      {selectedGurdwara.location.address}
                    </div>

                    {selectedGurdwara.location.mapEmbedUrl && (
                      <div className="aspect-video rounded-lg overflow-hidden border border-[#1d2b6b]">
                        <iframe
                          src={selectedGurdwara.location.mapEmbedUrl}
                          width="100%"
                          height="100%"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>

                  {/* SHARE BUTTONS */}
                  <div className="mt-6">
                    <h4 className="text-xl font-semibold text-yellow-400 mb-2">
                      ਸ਼ੇਅਰ ਕਰੋ:
                    </h4>

                    <div className="flex gap-4">
                      {/* WhatsApp */}
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => {
                          const msg = `ਗੁਰਦੁਆਰਾ ਸਾਹਿਬ: ${selectedGurdwara.name}\nਸਥਿਤੀ: ${selectedGurdwara.location.address}`;
                          const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
                          window.open(url, "_blank");
                        }}
                      >
                        WhatsApp
                      </Button>

                      {/* Link Copy */}
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          const link =
                            window.location.href +
                            `#gurdwara-${selectedGurdwara.id}`;
                          navigator.clipboard.writeText(link);
                          alert("ਲਿੰਕ ਕਾਪੀ ਹੋ ਗਿਆ ਹੈ!");
                        }}
                      >
                        Copy Link
                      </Button>
                    </div>
                  </div>

                  {/* PDFs */}
                  {selectedGurdwara.pdfAssets && selectedGurdwara.pdfAssets.length > 0 && (
                    <PdfList pdfAssets={selectedGurdwara.pdfAssets} />
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
