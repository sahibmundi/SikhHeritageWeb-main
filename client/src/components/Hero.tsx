import { motion } from "framer-motion";
import { Link } from "wouter";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center overflow-hidden pt-16 md:pt-20"
      data-testid="section-hero"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-10 md:py-16">
        <div className="space-y-4 md:space-y-6">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight"
            data-testid="text-hero-title"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ
          </motion.h1>

          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground"
            data-testid="text-hero-subtitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ਸ਼੍ਰਿਸ਼ਟ ਦੀ ਚਾਦਰ
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto"
            data-testid="text-hero-description"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ (1 ਅਪਰੈਲ 1621 – 24 ਨਵੰਬਰ 1675) ਸਿੱਖਾਂ ਦੇ ਨੌਵੇਂ ਗੁਰੂ ਸਨ।
            ਉਨ੍ਹਾਂ ਨੂੰ ਹਿੰਦ ਦੀ ਚਾਦਰ ਕਹਿ ਕੇ ਸਨਮਾਨਿਆ ਜਾਂਦਾ ਹੈ, ਕਿਉਂਕਿ ਉਨ੍ਹਾਂ ਨੇ ਧਰਮ ਦੀ ਰਾਖੀ ਲਈ ਮਹਾਨ ਕੁਰਬਾਨੀ ਦਿੱਤੀ।
          </motion.p>

          <motion.div
            className="mt-4 p-6 md:p-8 bg-card/60 border border-card-border rounded-lg shadow-3d max-w-2xl mx-auto relative overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-orange-500 to-primary" />
            <p className="text-2xl sm:text-3xl font-semibold text-primary leading-relaxed" data-testid="text-hero-quote">
              "ਕਾਹੂ ਕਉ ਦੇਤੁ ਨ ਡਰੈ, ਨਾਹੁ ਡਰਾਵੈ।"
            </p>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground" data-testid="text-hero-quote-meaning">
              ਕਿਸੇ ਨੂੰ ਭੈ ਨਹੀਂ ਦਿੰਦੇ, ਨਾ ਕਿਸੇ ਤੋਂ ਡਰਦੇ ਹਨ
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4 pt-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link href="/jeevni">
              <motion.div
                className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-md shadow-3d-hover cursor-pointer"
                data-testid="button-explore-biography"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                ਜੀਵਨੀ ਪੜ੍ਹੋ
              </motion.div>
            </Link>
            <Link href="/baani-audio">
              <motion.div
                className="px-8 py-3 bg-card border-2 border-card-border text-card-foreground font-semibold rounded-md shadow-3d-hover cursor-pointer hover:border-primary transition-colors"
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
