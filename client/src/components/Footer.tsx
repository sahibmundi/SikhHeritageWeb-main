import { Link } from "wouter";

const navLinks = [
  { href: "/jeevni", label: "ਜੀਵਨੀ", testId: "link-footer-jeevni" },
  { href: "/baani", label: "ਬਾਣੀ", testId: "link-footer-baani" },
  { href: "/gurdwara-sahib", label: "ਗੁਰਦੁਆਰਾ ਸਾਹਿਬ", testId: "link-footer-gurdwaras" },
  { href: "/srot", label: "ਸਰੋਤ", testId: "link-footer-srot" },
];

export function Footer() {
  return (
    <footer className="bg-sidebar border-t border-sidebar-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">

        {/* Main row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Brand */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group" data-testid="link-footer-home">
              <div className="w-7 h-7 rounded-full bg-sidebar-accent flex items-center justify-center border border-sidebar-border">
                <svg viewBox="0 0 100 100" className="w-4 h-4 fill-sidebar-foreground" xmlns="http://www.w3.org/2000/svg">
                  <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fontSize="50" fontWeight="bold" fontFamily="Arial, sans-serif">ੴ</text>
                </svg>
              </div>
              <span className="text-sm font-semibold text-sidebar-foreground group-hover:text-sidebar-accent-foreground transition-colors whitespace-nowrap">
                ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ
              </span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="flex items-center gap-1 flex-wrap justify-center">
            {navLinks.map((link, i) => (
              <span key={link.href} className="flex items-center">
                {i > 0 && <span className="text-sidebar-border text-xs mx-1 select-none">·</span>}
                <Link href={link.href}>
                  <span
                    className="text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors cursor-pointer px-1 py-0.5 rounded"
                    data-testid={link.testId}
                  >
                    {link.label}
                  </span>
                </Link>
              </span>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-xs text-sidebar-foreground/50 whitespace-nowrap" data-testid="text-footer-copyright">
            © {new Date().getFullYear()} ਵਿਰਾਸਤ ਵੈੱਬਸਾਈਟ
          </p>
        </div>

        {/* Thin sub-line */}
        <div className="mt-4 pt-4 border-t border-sidebar-border/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-sidebar-foreground/40">
          <span className="italic">"ਕਾਹੂ ਕਉ ਦੇਤੁ ਨ ਡਰੈ, ਨਾਹੁ ਡਰਾਵੈ।"</span>
          <span>ਜਨਮ 1621 · ਗੁਰਗੱਦੀ 1664 · ਸ਼ਹੀਦੀ 1675</span>
        </div>

      </div>
    </footer>
  );
}
