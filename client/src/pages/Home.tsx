import { Link } from "wouter";
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { BookOpen, Music, Headphones, Building2, ArrowRight, Library, BookA, Sparkle } from "lucide-react";

const sections = [
  {
    href: "/jeevni",
    icon: BookOpen,
    title: "ਜੀਵਨੀ",
    
    description: "ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਦਾ ਜੀਵਨ, ਸੰਘਰਸ਼, ਅਤੇ ਸ਼ਹੀਦੀ ਦਾ ਇਤਿਹਾਸ।",
    testId: "card-nav-jeevni",
  },
  {
    href: "/baani",
    icon: Sparkle,
    title: "ਬਾਣੀ ਅੰਮ੍ਰਿਤ",
    
    description: "ਗੁਰੂ ਜੀ ਦੀ ਪਵਿੱਤਰ ਬਾਣੀ ਦਾ ਰਾਗਾਂ ਅਨੁਸਾਰ ਅਰਥ।",
    testId: "card-nav-baani",
  },
  {
    href: "/baani-audio",
    icon: Headphones,
    title: "ਗੁਰਬਾਣੀ ਕੀਰਤਨ",
    
    description: "ਗੁਰੂ ਜੀ ਦੀ ਪਵਿੱਤਰ ਬਾਣੀ ਦਾ ਕੀਰਤਨ ਅਤੇ ਰੂਹਾਨੀ ਸ਼ਾਂਤੀ ਦਾ ਅਨੁਭਵ।",
    testId: "card-nav-baani-audio",
  },
  {
    href: "/gurdwara-sahib",
    icon: Building2,
    title: "ਇਤਿਹਾਸਕ ਗੁਰਧਾਮ",
    
    description: "ਗੁਰੂ ਜੀ ਨਾਲ ਸੰਬੰਧਿਤ ਇਤਿਹਾਸਕ ਗੁਰਧਾਮਾਂ ਦੇ ਪਵਿੱਤਰ ਦਰਸ਼ਨ ਅਤੇ ਜਾਣਕਾਰੀ।",
    testId: "card-nav-gurdwaras",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="page-home">
      <Hero />

      <section className="py-8 md:py-12 bg-accent/10" data-testid="section-nav-cards">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" data-testid="text-explore-title">
              ਗੁਰਮਤਿ ਵਿਚਾਰ
            </h2>
            <p className="text-lg text-muted-foreground">
              ਗੁਰਬਾਣੀ ਅਤੇ ਆਤਮਕ ਗਿਆਨ
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={section.href}>
                    <motion.div
                      className="group relative bg-card border border-card-border rounded-2xl p-6 cursor-pointer h-full flex flex-col gap-4 shadow-3d-hover overflow-hidden"
                      whileHover={{ y: -6, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      data-testid={section.testId}
                    >
                      <motion.div
                        className="absolute inset-0 bg-primary/5 rounded-2xl"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="relative z-10 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="relative z-10 flex-1">
                        <h3 className="text-xl font-bold text-card-foreground mb-0.5">
                          {section.title}
                        </h3>
                        <p className="text-xs font-medium text-orange-500 mb-2 uppercase tracking-wide">
                          {section.subtitle}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {section.description}
                        </p>
                      </div>
                      <div className="relative z-10 flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                        <span>ਖੋਲ੍ਹੋ</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
