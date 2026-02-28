import { motion } from "framer-motion";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
        <div className="space-y-6 md:space-y-8">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight"
            data-testid="text-hero-title"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ
          </motion.h1>
          
          <motion.h2 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground leading-relaxed"
            data-testid="text-hero-subtitle"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            ਸ਼੍ਰਿਸ਼ਟ ਦੀ ਚਾਦਰ
          </motion.h2>

          <motion.div 
            className="max-w-3xl mx-auto pt-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed" data-testid="text-hero-description">
              ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ (1 ਅਪਰੈਲ 1621 – 24 ਨਵੰਬਰ 1675) ਸਿੱਖਾਂ ਦੇ ਨੌਵੇਂ ਗੁਰੂ ਸਨ। 
              ਉਨ੍ਹਾਂ ਨੂੰ ਹਿੰਦ ਦੀ ਚਾਦਰ ਕਹਿ ਕੇ ਸਨਮਾਨਿਆ ਜਾਂਦਾ ਹੈ, ਕਿਉਂਕਿ ਉਨ੍ਹਾਂ ਨੇ ਧਰਮ ਦੀ ਰਾਖੀ ਲਈ ਮਹਾਨ ਕੁਰਬਾਨੀ ਦਿੱਤੀ।
            </p>
          </motion.div>

          <motion.div 
            className="mt-12 p-8 md:p-12 bg-card/50 backdrop-blur-sm border border-card-border rounded-lg shadow-3d glow-border max-w-2xl mx-auto relative overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
          >
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-orange-500 to-primary glow-border-orange"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            />
            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary leading-relaxed" data-testid="text-hero-quote">
              "ਕਾਹੂ ਕਉ ਦੇਤੁ ਨ ਡਰੈ, ਨਾਹੁ ਡਰਾਵੈ।"
            </p>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground" data-testid="text-hero-quote-meaning">
              ਕਿਸੇ ਨੂੰ ਭੈ ਨਹੀਂ ਦਿੰਦੇ, ਨਾ ਕਿਸੇ ਤੋਂ ਡਰਦੇ ਹਨ
            </p>
          </motion.div>

          <motion.div 
            className="mt-12 flex flex-wrap justify-center gap-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              onClick={() => document.getElementById("biography")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-md shadow-3d-hover glow-border transition-all relative overflow-hidden group"
              data-testid="button-explore-biography"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">ਜੀਵਨੀ ਪੜ੍ਹੋ</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            <motion.button
              onClick={() => document.getElementById("shabads")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 bg-card border-2 border-card-border text-card-foreground font-semibold rounded-md shadow-3d-hover glow-border backdrop-blur-sm transition-all hover:border-primary"
              data-testid="button-explore-shabads"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              ਬਾਣੀ ਸੁਣੋ
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
