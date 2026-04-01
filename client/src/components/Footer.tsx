import { Link } from "wouter";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/jeevni", label: "ਜੀਵਨੀ", testId: "link-footer-jeevni" },
  { href: "/baani", label: "ਬਾਣੀ ਅੰਮ੍ਰਿਤ", testId: "link-footer-baani" },
  { href: "/baani-audio", label: "ਗੁਰਬਾਣੀ ਕੀਰਤਨ", testId: "link-footer-baani-audio" },
  { href: "/gurdwara-sahib", label: "ਇਤਿਹਾਸਕ ਗੁਰਧਾਮ", testId: "link-footer-gurdwaras" },
];

export function Footer() {
  return (
    <footer className="bg-sidebar border-t border-sidebar-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

        <div className="grid grid-cols-2 sm:grid-cols-[auto_1fr_auto] items-center gap-x-6 gap-y-2">

          <Link href="/">
            <div className="cursor-pointer group" data-testid="link-footer-home">
              <span className="text-sm font-semibold text-sidebar-foreground group-hover:text-sidebar-accent-foreground transition-colors whitespace-nowrap">
                ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ
              </span>
            </div>
          </Link>

          <nav className="flex items-center justify-center gap-x-1 flex-wrap col-span-2 sm:col-span-1">
            {navLinks.map((link, i) => (
              <span key={link.href} className="flex items-center">
                {i > 0 && <span className="text-sidebar-border/60 text-xs mx-1 select-none">·</span>}
                <Link href={link.href}>
                  <motion.span
                    className="text-xs text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors cursor-pointer px-1 py-0.5"
                    data-testid={link.testId}
                    whileHover={{ y: -1 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              </span>
            ))}
          </nav>

          <span className="text-xs text-sidebar-foreground/40 whitespace-nowrap text-right hidden sm:block">
            ਜਨਮ 1621 · ਸ਼ਹੀਦੀ 1675
          </span>
        </div>

        <div className="mt-3 pt-3 border-t border-sidebar-border/30 text-center">
          <span className="text-xs text-sidebar-foreground/40 italic">
            "ਭੈ ਕਾਹੂ ਕਉ ਦੇਤ ਨਹਿ ਨਹਿ ਭੈ ਮਾਨਤ ਆਨ।।"
          </span>
        </div>

      </div>
    </footer>
  );
}
