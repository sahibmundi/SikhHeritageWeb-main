import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Resources } from "@/components/Resources";
import { Footer } from "@/components/Footer";
import type { Resource } from "@shared/schema";

export default function SrotPage() {
  const { data: resources = [], isLoading } = useQuery<Resource[]>({
    queryKey: ["/api/resources"],
  });

  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="page-srot">
      <Header />
      <div className="pt-16 md:pt-20">
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xl text-muted-foreground">ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...</p>
            </div>
          </div>
        ) : (
          <Resources resources={resources} />
        )}
      </div>
      <Footer />
    </div>
  );
}
