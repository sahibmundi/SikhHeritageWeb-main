import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BaaniShabad {
  id: string;
  raagName: string;
  gurbani: string;
  vyakhya: string;
}

export function BaaniViewer() {
  const { data: shabads, isLoading } = useQuery<BaaniShabad[]>({
    queryKey: ['/api/baani/shabads'],
  });
  
  const [expandedShabads, setExpandedShabads] = useState<Record<string, boolean>>({});

  const toggleShabad = (id: string) => {
    setExpandedShabads(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (isLoading) {
    return (
      <section 
        id="baani" 
        className="py-16 md:py-24 bg-gradient-to-b from-background via-accent/5 to-background" 
        data-testid="section-baani"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Skeleton className="h-40" />
                  <Skeleton className="h-40" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!shabads || shabads.length === 0) {
    return null;
  }

  return (
    <section 
      id="baani" 
      className="py-16 md:py-24 bg-gradient-to-b from-background via-accent/5 to-background animate-fade-in-up" 
      data-testid="section-baani"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4" 
            data-testid="text-baani-title"
          >
            ਬਾਣੀ ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਸਾਹਿਬ ਜੀ
          </h2>
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" 
            data-testid="text-baani-subtitle"
          >
            ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਵਿੱਚੋਂ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਦੀ ਪਵਿੱਤਰ ਬਾਣੀ
          </p>
        </motion.div>

        <div className="space-y-6">
          {shabads.map((shabad, index) => {
            const isExpanded = expandedShabads[shabad.id] ?? false;
            
            return (
              <motion.div
                key={shabad.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="shadow-lg bg-card overflow-hidden">
                  <div className="p-4 md:p-6 border-b border-border/50">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <h3 
                        className="text-xl md:text-2xl font-semibold text-foreground"
                        style={{ fontFamily: 'AnmolUni, Raavi, serif' }}
                        data-testid={`text-raag-name-${shabad.id}`}
                      >
                        {shabad.raagName}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleShabad(shabad.id)}
                        data-testid={`button-toggle-${shabad.id}`}
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-4 h-4 mr-1" />
                            ਘੱਟ ਵੇਖੋ
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4 mr-1" />
                            ਹੋਰ ਵੇਖੋ
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className={`transition-all duration-300 ${isExpanded ? 'max-h-none' : 'max-h-96 overflow-hidden'}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-border/30">
                        <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
                          ਗੁਰਬਾਣੀ
                        </h4>
                        <div 
                          className="prose prose-lg max-w-none text-foreground/90 whitespace-pre-wrap leading-relaxed text-lg md:text-xl"
                          style={{ fontFamily: 'AnmolUni, Raavi, serif' }}
                          data-testid={`text-gurbani-${shabad.id}`}
                        >
                          {shabad.gurbani}
                        </div>
                      </div>
                      
                      <div className="p-6 md:p-8 bg-accent/5">
                        <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
                          ਵਿਆਖਿਆ
                        </h4>
                        <div 
                          className="prose prose-lg max-w-none text-foreground/80 whitespace-pre-wrap leading-relaxed text-base md:text-lg"
                          style={{ fontFamily: 'AnmolUni, Raavi, serif' }}
                          data-testid={`text-vyakhya-${shabad.id}`}
                        >
                          {shabad.vyakhya || "ਵਿਆਖਿਆ ਉਪਲਬਧ ਨਹੀਂ"}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
