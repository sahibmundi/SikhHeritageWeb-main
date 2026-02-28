import { useState, useEffect } from "react";
import type { TimelineEvent, BiographySection } from "@shared/schema";

interface BiographyProps {
  timeline: TimelineEvent[];
  sections: BiographySection[];
}

export function Biography({ timeline, sections }: BiographyProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const current = sectionElements.find(el => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom >= 200;
      });
      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="biography" className="py-16 md:py-24 bg-background animate-fade-in-up" data-testid="section-biography">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 animate-scale-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-biography-title">
            ਜੀਵਨੀ
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-biography-subtitle">
            ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਦਾ ਸੰਪੂਰਨ ਜੀਵਨ ਚਰਿੱਤਰ
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <aside className="lg:w-64 xl:w-80 shrink-0 animate-fade-in-left">
            <div className="lg:sticky lg:top-24 bg-sidebar border border-sidebar-border rounded-lg p-6 shadow-3d glow-border">
              <h3 className="text-xl font-semibold text-sidebar-foreground mb-6" data-testid="text-timeline-title">
                ਵਿਸ਼ੇਸ਼ ਤਰੀਖਾਂ
              </h3>
              <div className="relative space-y-6">
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-sidebar-border" />
                
                {timeline.map((event, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(event.sectionId)}
                    className={`relative flex items-start gap-4 w-full text-left transition-all hover-elevate active-elevate-2 p-2 rounded-md shadow-3d-hover ${
                      activeSection === event.sectionId ? "text-orange-500 font-semibold" : "text-sidebar-foreground"
                    }`}
                    data-testid={`button-timeline-${event.year}`}
                  >
                    <div className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center glow-border-orange ${
                      activeSection === event.sectionId ? "bg-orange-500 text-white" : "bg-sidebar-accent border-2 border-sidebar-border"
                    }`}>
                      <div className="w-2 h-2 rounded-full bg-current" />
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="font-semibold text-base">{event.year}</div>
                      <div className={`text-sm mt-0.5 ${activeSection === event.sectionId ? "text-orange-400" : "text-sidebar-foreground/70"}`}>{event.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1 space-y-12 animate-fade-in-right">
            {sections.map((section, index) => (
              <div 
                key={section.id} 
                id={section.id} 
                className="scroll-mt-24 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`section-${section.id}`}
              >
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-6 shadow-3d-hover inline-block px-2">
                  {section.heading}
                </h3>
                <div className="prose prose-lg max-w-none text-foreground/90 leading-relaxed whitespace-pre-line bg-card/50 p-6 rounded-lg border border-card-border shadow-3d glow-border">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
