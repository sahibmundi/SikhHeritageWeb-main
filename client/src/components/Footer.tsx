export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card border-t border-card-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div>
            <h3 className="text-xl font-semibold text-card-foreground mb-4">
              ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ਹਿੰਦ ਦੀ ਚਾਦਰ, ਧਰਮ ਤੇ ਮਨੁੱਖੀ ਅਧਿਕਾਰਾਂ ਦੇ ਰਖਿਆਕਰਤਾ
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold text-card-foreground mb-4">
              ਤੇਜ਼ ਲਿੰਕ
            </h4>
            <nav className="space-y-2">
              <button
                onClick={() => scrollToSection("biography")}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors hover-elevate px-2 py-1 rounded-md text-left"
                data-testid="link-footer-biography"
              >
                ਜੀਵਨੀ
              </button>
              <button
                onClick={() => scrollToSection("shabads")}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors hover-elevate px-2 py-1 rounded-md text-left"
                data-testid="link-footer-shabads"
              >
                ਬਾਣੀ
              </button>
              <button
                onClick={() => scrollToSection("audio")}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors hover-elevate px-2 py-1 rounded-md text-left"
                data-testid="link-footer-audio"
              >
                ਬਾਣੀ ਆਡੀਓ
              </button>
              <button
                onClick={() => scrollToSection("raags")}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors hover-elevate px-2 py-1 rounded-md text-left"
                data-testid="link-footer-raags"
              >
                ਰਾਗ
              </button>
              <button
                onClick={() => scrollToSection("gurdwaras")}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors hover-elevate px-2 py-1 rounded-md text-left"
                data-testid="link-footer-gurdwaras"
              >
                ਗੁਰਦੁਆਰਾ ਸਾਹਿਬ
              </button>
              <button
                onClick={() => scrollToSection("resources")}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors hover-elevate px-2 py-1 rounded-md text-left"
                data-testid="link-footer-resources"
              >
                ਸਰੋਤ
              </button>
            </nav>
          </div>

          <div>
            <h4 className="text-base font-semibold text-card-foreground mb-4">
              ਮਹੱਤਵਪੂਰਨ ਤਰੀਖਾਂ
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>ਜਨਮ: 1 ਅਪਰੈਲ 1621</p>
              <p>ਗੁਰਗੱਦੀ: 1664</p>
              <p>ਸ਼ਹੀਦੀ: 24 ਨਵੰਬਰ 1675</p>
            </div>
          </div>

          <div>
            <h4 className="text-base font-semibold text-card-foreground mb-4">
              ਸੰਦੇਸ਼
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              "ਕਾਹੂ ਕਉ ਦੇਤੁ ਨ ਡਰੈ, ਨਾਹੁ ਡਰਾਵੈ।"
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦੁਰ ਜੀ ਵਿਰਾਸਤ ਵੈੱਬਸਾਈਟ। ਸਾਰੇ ਅਧਿਕਾਰ ਰਾਖਵੇਂ ਹਨ।
          </p>
        </div>
      </div>
    </footer>
  );
}
