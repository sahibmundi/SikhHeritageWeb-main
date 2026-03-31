import { useQuery } from "@tanstack/react-query";
import { Gurdwaras } from "@/components/Gurdwaras";
import { Footer } from "@/components/Footer";
import type { Gurdwara } from "@shared/schema";

export default function GurdwarasPage() {
  const { data: gurdwaras = [], isLoading } = useQuery<Gurdwara[]>({
    queryKey: ["/api/gurdwaras"],
  });

  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="page-gurdwaras">
      <div className="pt-16 md:pt-20">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[80vh]">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xl text-muted-foreground">ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...</p>
            </div>
          </div>
        ) : (
          <>
            <Gurdwaras gurdwaras={gurdwaras} />
            <Footer />
          </>
        )}
      </div>
    </div>
  );
}
