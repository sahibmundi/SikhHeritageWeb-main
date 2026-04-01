import { motion } from "framer-motion";
import { Link } from "wouter";

const floatingDots = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1.5,
  delay: Math.random() * 4,
  duration: Math.random() * 6 + 8,
}));

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden pt-16 md:pt-20"
      data-testid="section-hero"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-accent/25"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {floatingDots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute rounded-full bg-primary/20"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: dot.size,
              height: dot.size,
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-10 md:py-16">
        <div className="space-y-4 md:space-y-6">

          <motion.div
            className="flex justify-center mb-2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.05, type: "spring", stiffness: 100 }}
          >
            <motion.div
              className="text-4xl sm:text-5xl text-primary select-none"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              ੴ
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight"
            data-testid="text-hero-title"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ
          </motion.h1>

          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground"
            data-testid="text-hero-subtitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            ਸ਼੍ਰਿਸ਼ਟ ਦੀ ਚਾਦਰ
          </motion.h2>

          <motion.div
            className="flex justify-center gap-1 py-1"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/60" />
            <div className="w-2 h-2 rounded-full bg-orange-500 mt-[-3px]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/60" />
          </motion.div>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto"
            data-testid="text-hero-description"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ (1 ਅਪਰੈਲ 1621 – 24 ਨਵੰਬਰ 1675) ਸਿੱਖਾਂ ਦੇ ਨੌਵੇਂ ਗੁਰੂ ਹਨ।
            ਉਨ੍ਹਾਂ ਨੂੰ ਹਿੰਦ ਦੀ ਚਾਦਰ ਕਹਿ ਕੇ ਸਨਮਾਨਿਆ ਜਾਂਦਾ ਹੈ, ਕਿਉਂਕਿ ਉਨ੍ਹਾਂ ਨੇ ਧਰਮ ਦੀ ਰਾਖੀ ਲਈ ਮਹਾਨ ਕੁਰਬਾਨੀਆਂ ਦਿੱਤੀਆਂ।
          </motion.p>

          <motion.div
            className="mt-4 p-6 md:p-8 bg-card/70 border border-card-border rounded-xl shadow-3d max-w-2xl mx-auto relative overflow-hidden backdrop-blur-sm"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-orange-500 to-primary" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
            />
            <p className="text-2xl sm:text-3xl font-semibold text-primary leading-relaxed relative z-10" data-testid="text-hero-quote">
              "ਭੈ ਕਾਹੂ ਕਉ ਦੇਤ ਨਹਿ ਨਹਿ ਭੈ ਮਾਨਤ ਆਨ।।"
            </p>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground relative z-10" data-testid="text-hero-quote-meaning">
              ਉਹ ਨਿਰਭਉ ਹੋ ਕੇ ਜੀਵਨ ਜੀਉਂਦਾ ਹੈ — ਨਾ ਕਿਸੇ ਨੂੰ ਡਰਾਉਂਦਾ ਹੈ ਤੇ ਨਾ ਕਿਸੇ ਤੋਂ ਡਰਦਾ ਹੈ।
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4 pt-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <Link href="/jeevni">
              <motion.div
                className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-3d-hover cursor-pointer relative overflow-hidden"
                data-testid="button-explore-biography"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">ਜੀਵਨੀ ਪੜ੍ਹੋ</span>
              </motion.div>
            </Link>
            <Link href="/baani-audio">
              <motion.div
                className="px-8 py-3 bg-card border-2 border-card-border text-card-foreground font-semibold rounded-lg shadow-3d-hover cursor-pointer hover:border-primary transition-colors"
                data-testid="button-explore-shabads"
                whileHover={{ y: -3 }}
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
