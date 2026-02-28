import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Biography } from "@/components/Biography";
import { BaaniViewer } from "@/components/BaaniViewer";
import { AudioSection } from "@/components/AudioSection";
import { Gurdwaras } from "@/components/Gurdwaras";
import { Resources } from "@/components/Resources";
import { Footer } from "@/components/Footer";
import type { TimelineEvent, BiographySection, Gurdwara, Resource } from "@shared/schema";

export default function Home() {
  const { data: timeline = [], isLoading: timelineLoading } = useQuery<TimelineEvent[]>({
    queryKey: ["/api/biography/timeline"]
  });

  const { data: biographySections = [], isLoading: biographyLoading } = useQuery<BiographySection[]>({
    queryKey: ["/api/biography/sections"]
  });

  const { data: gurdwaras = [], isLoading: gurdwarasLoading } = useQuery<Gurdwara[]>({
    queryKey: ["/api/gurdwaras"]
  });

  const { data: resources = [], isLoading: resourcesLoading } = useQuery<Resource[]>({
    queryKey: ["/api/resources"]
  });

  // Show loading state while fetching data
  if (timelineLoading || biographyLoading || gurdwarasLoading || resourcesLoading) {
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
    <div className="min-h-screen bg-background text-foreground" data-testid="page-home">
      <Header />
      <Hero />
      <Biography timeline={timeline} sections={biographySections} />
      <BaaniViewer />
      <AudioSection />
      <Gurdwaras gurdwaras={gurdwaras} />
      <Resources resources={resources} />
      <Footer />
    </div>
  );
}
