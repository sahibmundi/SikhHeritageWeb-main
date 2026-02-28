import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Clock, Heart } from "lucide-react";
import type { RaagInfo, Shabad } from "@shared/schema";

export default function Raags() {
  const { data: raags = [], isLoading } = useQuery<RaagInfo[]>({
    queryKey: ["/api/raags"]
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center" data-testid="page-loading">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" data-testid="spinner"></div>
          <p className="text-xl text-muted-foreground">ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="page-raags">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground" data-testid="heading-main">
              ਰਾਗ
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-description">
              ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਦੀ ਬਾਣੀ 15 ਰਾਗਾਂ ਵਿੱਚ ਦਰਜ ਹੈ। ਹਰੇਕ ਰਾਗ ਦਾ ਆਪਣਾ ਵਿਸ਼ੇਸ਼ ਸਮਾਂ, ਰਸ ਅਤੇ ਆਧਿਆਤਮਿਕ ਮਹੱਤਵ ਹੈ।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {raags.map((raag) => (
              <RaagCard key={raag.id} raag={raag} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
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
    <Card className="hover-elevate" data-testid={`card-raag-${raag.id}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <CardTitle className="text-2xl" data-testid={`text-raag-name-${raag.id}`}>
              {raag.name}
            </CardTitle>
            <CardDescription className="text-base" data-testid={`text-raag-name-english-${raag.id}`}>
              {raag.nameEnglish}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-sm" data-testid={`badge-shabad-count-${raag.id}`}>
            <Music className="w-3 h-3 mr-1" />
            {raag.shabadCount} ਬਾਣੀਆਂ
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">ਸਮਾਂ</p>
              <p className="text-base" data-testid={`text-raag-time-${raag.id}`}>{raag.time}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">ਰਸ</p>
              <p className="text-base" data-testid={`text-raag-ras-${raag.id}`}>{raag.ras}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">ਮਹੱਤਵ</p>
          <p className="text-sm text-foreground leading-relaxed" data-testid={`text-raag-significance-${raag.id}`}>
            {raag.significance}
          </p>
        </div>

        <div className="space-y-2">
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
                <Badge key={shabad.id} variant="outline" className="text-xs" data-testid={`badge-shabad-${shabad.id}`}>
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
