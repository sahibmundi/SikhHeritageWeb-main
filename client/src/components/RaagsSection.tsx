import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Clock, Heart } from "lucide-react";
import type { RaagInfo, Shabad } from "@shared/schema";
import { motion } from "framer-motion";

export function RaagsSection() {
  const { data: raags = [] } = useQuery<RaagInfo[]>({
    queryKey: ["/api/raags"]
  });

  return (
    <section id="raags" className="py-16 md:py-24 bg-gradient-to-b from-accent/10 to-background animate-fade-in-up" data-testid="section-raags">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-16 animate-scale-in"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-raags-title">
            ਰਾਗ
          </h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-primary via-orange-500 to-primary mx-auto mb-6 glow-border-orange"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-raags-subtitle">
            ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਦੀ ਬਾਣੀ 15 ਰਾਗਾਂ ਵਿੱਚ ਦਰਜ ਹੈ। ਹਰੇਕ ਰਾਗ ਦਾ ਆਪਣਾ ਵਿਸ਼ੇਸ਼ ਸਮਾਂ, ਰਸ ਅਤੇ ਆਧਿਆਤਮਿਕ ਮਹੱਤਵ ਹੈ।
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {raags.map((raag, index) => (
            <motion.div
              key={raag.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <RaagCard raag={raag} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RaagCard({ raag }: { raag: RaagInfo }) {
  const { data: shabads = [] } = useQuery<Shabad[]>({
    queryKey: [`/api/raags/${raag.id}/shabads`],
    queryFn: async () => {
      const res = await fetch(`/api/raags/${raag.id}/shabads`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch shabads for raag ${raag.id}`);
      }
      return res.json();
    }
  });

  return (
    <Card className="shadow-3d-hover glow-border" data-testid={`card-raag-${raag.id}`}>
      <CardHeader className="bg-card/80 border-b border-card-border">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <CardTitle className="text-2xl" data-testid={`text-raag-name-${raag.id}`}>
              {raag.name}
            </CardTitle>
            <CardDescription className="text-base" data-testid={`text-raag-name-english-${raag.id}`}>
              {raag.nameEnglish}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-sm shadow-3d glow-border" data-testid={`badge-shabad-count-${raag.id}`}>
            <Music className="w-3 h-3 mr-1" />
            {raag.shabadCount} ਬਾਣੀਆਂ
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/20 border border-accent-border shadow-3d">
            <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">ਸਮਾਂ</p>
              <p className="text-base" data-testid={`text-raag-time-${raag.id}`}>{raag.time}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/20 border border-accent-border shadow-3d">
            <Heart className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">ਰਸ</p>
              <p className="text-base" data-testid={`text-raag-ras-${raag.id}`}>{raag.ras}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 p-4 rounded-lg bg-card/50 border border-card-border shadow-3d glow-border">
          <p className="text-sm font-medium text-orange-500">ਮਹੱਤਵ</p>
          <p className="text-sm text-foreground leading-relaxed" data-testid={`text-raag-significance-${raag.id}`}>
            {raag.significance}
          </p>
        </div>

        <div className="space-y-2 p-4 rounded-lg bg-muted/30 border border-muted-border shadow-3d">
          <p className="text-sm font-medium text-muted-foreground">ਵੇਰਵਾ</p>
          <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-raag-description-${raag.id}`}>
            {raag.description}
          </p>
        </div>

        {shabads.length > 0 && (
          <div className="pt-4 border-t space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              ਇਸ ਰਾਗ ਵਿੱਚ ਬਾਣੀਆਂ:
            </p>
            <div className="flex flex-wrap gap-2">
              {shabads.map((shabad) => (
                <Badge key={shabad.id} variant="outline" className="text-xs shadow-3d-hover glow-border" data-testid={`badge-shabad-${shabad.id}`}>
                  {shabad.title}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
