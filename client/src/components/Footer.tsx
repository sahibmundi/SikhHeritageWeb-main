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

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group" data-testid="link-footer-home">
              <span className="text-sm font-semibold text-sidebar-foreground group-hover:text-sidebar-accent-foreground transition-colors whitespace-nowrap">
                ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-0.5 flex-wrap justify-center">
            {navLinks.map((link, i) => (
              <span key={link.href} className="flex items-center">
                {i > 0 && <span className="text-sidebar-border text-xs mx-1 select-none">·</span>}
                <Link href={link.href}>
                  <motion.span
                    className="text-xs text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors cursor-pointer px-1 py-0.5 rounded"
                    data-testid={link.testId}
                    whileHover={{ y: -1 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              </span>
            ))}
          </nav>

          <p className="text-xs text-sidebar-foreground/50 whitespace-nowrap" data-testid="text-footer-copyright">
            © {new Date().getFullYear()} ਵਿਰਾਸਤ
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-sidebar-border/30 flex flex-col sm:flex-row items-center justify-between gap-1 text-xs text-sidebar-foreground/40">
          <span className="italic">"ਭੈ ਕਾਹੂ ਕਉ ਦੇਤ ਨਹਿ ਨਹਿ ਭੈ ਮਾਨਤ ਆਨ।।"</span>
          <span>ਜਨਮ 1621 · ਗੁਰਗੱਦੀ 1664 · ਸ਼ਹੀਦੀ 1675</span>
        </div>

      </div>
    </footer>
  );
}
