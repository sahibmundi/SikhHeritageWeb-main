import { Link } from "wouter";
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { BookOpen, Building2, ArrowRight, Sparkles } from "lucide-react";

const sections = [
  {
    href: "/jeevni",
    icon: BookOpen,
    title: "ਜੀਵਨੀ",
    description: "ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਦਾ ਜੀਵਨ, ਸੰਘਰਸ਼, ਅਤੇ ਸ਼ਹੀਦੀ ਦਾ ਇਤਿਹਾਸ।",
    testId: "card-nav-jeevni",
    accentColor: "from-blue-500/10 to-primary/10",
    iconBg: "bg-primary/10 group-hover:bg-primary/20",
    iconColor: "text-primary",
  },
  {
    href: "/baani",
    icon: Sparkles,
    title: "ਬਾਣੀ ਅੰਮ੍ਰਿਤ",
    description: "ਗੁਰੂ ਜੀ ਦੀ ਪਵਿੱਤਰ ਬਾਣੀ ਦਾ ਰਾਗਾਂ ਅਨੁਸਾਰ ਅਰਥ।",
    testId: "card-nav-baani",
    accentColor: "from-orange-500/10 to-amber-400/10",
    iconBg: "bg-orange-500/10 group-hover:bg-orange-500/20",
    iconColor: "text-orange-500",
  },
  {
    href: "/baani-audio",
    icon: null,
    ikonkar: true,
    title: "ਗੁਰਬਾਣੀ ਕੀਰਤਨ",
    description: "ਗੁਰੂ ਜੀ ਦੀ ਪਵਿੱਤਰ ਬਾਣੀ ਦਾ ਕੀਰਤਨ ਅਤੇ ਰੂਹਾਨੀ ਸ਼ਾਂਤੀ ਦਾ ਅਨੁਭਵ।",
    testId: "card-nav-baani-audio",
    accentColor: "from-purple-500/10 to-primary/10",
    iconBg: "bg-purple-500/10 group-hover:bg-purple-500/20",
    iconColor: "text-purple-600",
  },
  {
    href: "/gurdwara-sahib",
    icon: Building2,
    title: "ਇਤਿਹਾਸਕ ਗੁਰਧਾਮ",
    description: "ਗੁਰੂ ਜੀ ਨਾਲ ਸੰਬੰਧਿਤ ਇਤਿਹਾਸਕ ਗੁਰਧਾਮਾਂ ਦੇ ਪਵਿੱਤਰ ਦਰਸ਼ਨ ਅਤੇ ਜਾਣਕਾਰੀ।",
    testId: "card-nav-gurdwaras",
    accentColor: "from-green-500/10 to-teal-500/10",
    iconBg: "bg-green-600/10 group-hover:bg-green-600/20",
    iconColor: "text-green-600",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="page-home">
      <Hero />

      <section className="py-12 md:py-16 relative" data-testid="section-nav-cards">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-accent/10 to-accent/5 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-primary/50" />
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground" data-testid="text-explore-title">
                ਗੁਰਮਤਿ ਵਿਚਾਰ
              </h2>
              <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-primary/50" />
            </div>
            <p className="text-lg text-muted-foreground">
              ਗੁਰਬਾਣੀ ਅਤੇ ਆਤਮਕ ਗਿਆਨ
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.href}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={section.href}>
                    <motion.div
                      className={`group relative bg-card border border-card-border rounded-2xl p-6 cursor-pointer h-full flex flex-col gap-4 overflow-hidden`}
                      whileHover={{ y: -6 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.22 }}
                      data-testid={section.testId}
                      style={{ boxShadow: "0 2px 16px 0 rgba(0,0,0,0.07)" }}
                    >
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${section.accentColor} rounded-2xl opacity-0`}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />

                      <div className={`relative z-10 w-12 h-12 rounded-xl ${section.iconBg} flex items-center justify-center transition-colors`}>
                        {section.ikonkar ? (
                          <span className={`text-2xl font-bold leading-none select-none ${section.iconColor}`}>ੴ</span>
                        ) : Icon ? (
                          <Icon className={`w-6 h-6 ${section.iconColor}`} />
                        ) : null}
                      </div>

                      <div className="relative z-10 flex-1">
                        <h3 className="text-xl font-bold text-card-foreground mb-2">
                          {section.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {section.description}
                        </p>
                      </div>

                      <motion.div
                        className="relative z-10 flex items-center gap-1 text-primary text-sm font-medium"
                        whileHover={{ gap: "0.5rem" }}
                      >
                        <span>ਖੋਲ੍ਹੋ</span>
                        <motion.div
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </motion.div>
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
