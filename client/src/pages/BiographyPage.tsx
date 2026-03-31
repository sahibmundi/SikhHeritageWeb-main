import { useQuery } from "@tanstack/react-query";
import { Biography } from "@/components/Biography";
import { Footer } from "@/components/Footer";
import type { TimelineEvent, BiographySection } from "@shared/schema";

export default function BiographyPage() {
  const { data: timeline = [], isLoading: timelineLoading } = useQuery<TimelineEvent[]>({
    queryKey: ["/api/biography/timeline"],
  });

  const { data: biographySections = [], isLoading: biographyLoading } = useQuery<BiographySection[]>({
    queryKey: ["/api/biography/sections"],
  });

  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="page-biography">
      <div className="pt-16 md:pt-20">
        {timelineLoading || biographyLoading ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xl text-muted-foreground">ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...</p>
            </div>
          </div>
        ) : (
          <Biography timeline={timeline} sections={biographySections} />
        )}
      </div>
      <Footer />
    </div>
  );
}
