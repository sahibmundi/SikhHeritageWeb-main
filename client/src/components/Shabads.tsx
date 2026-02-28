import { useState } from "react";
import { Play, Pause } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Shabad } from "@shared/schema";

interface ShabadsProps {
  shabads: Shabad[];
}

export function Shabads({ shabads }: ShabadsProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const toggleAudio = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  return (
    <section id="shabads" className="py-16 md:py-24 bg-accent/20 animate-fade-in-up" data-testid="section-shabads">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 animate-scale-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-shabads-title">
            ਬਾਣੀ ਅਤੇ ਰਾਗ
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-shabads-subtitle">
            ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਦੀਆਂ ਬਾਣੀਆਂ 15 ਰਾਗਾਂ ਵਿੱਚ ਦਰਜ ਹਨ
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {shabads.map((shabad) => (
            <Card key={shabad.id} className="overflow-hidden shadow-3d-hover glow-border animate-fade-in-up" data-testid={`card-shabad-${shabad.id}`}>
              <CardHeader className="bg-card border-b border-card-border">
                <CardTitle className="text-2xl md:text-3xl font-semibold text-card-foreground">
                  {shabad.title}
                </CardTitle>
                <div className="flex flex-wrap gap-3 mt-4">
                  <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-md shadow-3d glow-border">
                    <span className="text-sm font-medium text-primary">ਰਾਗ: {shabad.raag.name}</span>
                  </div>
                  <div className="px-4 py-2 bg-accent border border-accent-border rounded-md shadow-3d glow-border-orange">
                    <span className="text-sm text-accent-foreground">ਸਮਾਂ: {shabad.raag.time}</span>
                  </div>
                  <div className="px-4 py-2 bg-accent border border-accent-border rounded-md shadow-3d glow-border-orange">
                    <span className="text-sm text-accent-foreground">ਰਸ: {shabad.raag.ras}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 md:p-8 space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">ਗੁਰਬਾਣੀ:</h4>
                  <p className="text-xl md:text-2xl leading-relaxed text-foreground/90 whitespace-pre-line">
                    {shabad.gurmukhi}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">ਅਰਥ:</h4>
                  <p className="text-base md:text-lg leading-relaxed text-foreground/80 whitespace-pre-line">
                    {shabad.meaning}
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="text-lg font-semibold text-foreground mb-3">ਰਾਗ ਦਾ ਮਹੱਤਵ:</h4>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {shabad.raag.significance}
                  </p>
                </div>

                {shabad.audioUrl && (
                  <div className="pt-4">
                    <Button
                      onClick={() => toggleAudio(shabad.id)}
                      variant="outline"
                      className="w-full md:w-auto gap-2"
                      data-testid={`button-audio-${shabad.id}`}
                    >
                      {playingId === shabad.id ? (
                        <>
                          <Pause className="w-4 h-4" />
                          ਰੋਕੋ
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          ਰਾਗ ਸੁਣੋ
                        </>
                      )}
                    </Button>
                    {playingId === shabad.id && (
                      <div className="mt-4">
                        <audio controls className="w-full" autoPlay>
                          <source src={shabad.audioUrl} type="audio/mpeg" />
                          ਤੁਹਾਡਾ ਬ੍ਰਾਊਜ਼ਰ ਆਡੀਓ ਐਲੀਮੈਂਟ ਦਾ ਸਮਰਥਨ ਨਹੀਂ ਕਰਦਾ।
                        </audio>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
