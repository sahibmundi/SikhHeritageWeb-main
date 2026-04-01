import { motion } from "framer-motion";
import { Link } from "wouter";

const floatingDots = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 1,
  delay: Math.random() * 5,
  duration: Math.random() * 6 + 10,
}));

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden pt-16 md:pt-20"
      data-testid="section-hero"
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-accent/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {floatingDots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute rounded-full bg-orange-400/20"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: dot.size,
              height: dot.size,
            }}
            animate={{ y: [0, -14, 0], opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: dot.duration, delay: dot.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12 md:py-18">
        <div className="space-y-5 md:space-y-7">

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight"
            data-testid="text-hero-title"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ
          </motion.h1>

          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.22 }}
          >
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground mb-3"
              data-testid="text-hero-subtitle"
            >
              ਸ਼੍ਰਿਸ਼ਟ ਦੀ ਚਾਦਰ
            </h2>
            <div className="flex justify-center items-center gap-2">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-400/70" />
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-400/70" />
            </div>
          </motion.div>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-foreground/75 leading-relaxed max-w-3xl mx-auto"
            data-testid="text-hero-description"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.34 }}
          >
            ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ (1 ਅਪਰੈਲ 1621 – 24 ਨਵੰਬਰ 1675) ਸਿੱਖਾਂ ਦੇ ਨੌਵੇਂ ਗੁਰੂ ਹਨ।
            ਉਨ੍ਹਾਂ ਨੂੰ ਹਿੰਦ ਦੀ ਚਾਦਰ ਕਹਿ ਕੇ ਸਨਮਾਨਿਆ ਜਾਂਦਾ ਹੈ, ਕਿਉਂਕਿ ਉਨ੍ਹਾਂ ਨੇ ਧਰਮ ਦੀ ਰਾਖੀ ਲਈ ਮਹਾਨ ਕੁਰਬਾਨੀਆਂ ਦਿੱਤੀਆਂ।
          </motion.p>

          <motion.div
            className="p-6 md:p-8 bg-card/80 border border-card-border rounded-2xl shadow-3d max-w-2xl mx-auto relative overflow-hidden backdrop-blur-sm"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.44 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 via-orange-500 to-primary/40" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
            />
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary leading-relaxed relative z-10" data-testid="text-hero-quote">
              "ਭੈ ਕਾਹੂ ਕਉ ਦੇਤ ਨਹਿ ਨਹਿ ਭੈ ਮਾਨਤ ਆਨ।।"
            </p>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground relative z-10" data-testid="text-hero-quote-meaning">
              ਉਹ ਨਿਰਭਉ ਹੋ ਕੇ ਜੀਵਨ ਜੀਉਂਦਾ ਹੈ — ਨਾ ਕਿਸੇ ਨੂੰ ਡਰਾਉਂਦਾ ਹੈ ਤੇ ਨਾ ਕਿਸੇ ਤੋਂ ਡਰਦਾ ਹੈ।
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4 pt-1"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.52 }}
          >
            <Link href="/jeevni">
              <motion.div
                className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg cursor-pointer relative overflow-hidden"
                data-testid="button-explore-biography"
                whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.45 }}
                />
                <span className="relative z-10">ਜੀਵਨੀ ਪੜ੍ਹੋ</span>
              </motion.div>
            </Link>
            <Link href="/baani-audio">
              <motion.div
                className="px-8 py-3 bg-card border border-card-border text-card-foreground font-semibold rounded-lg cursor-pointer hover:border-primary/60 transition-colors"
                data-testid="button-explore-shabads"
                whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.97 }}
              >
                ਬਾਣੀ ਸੁਣੋ
              </motion.div>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
