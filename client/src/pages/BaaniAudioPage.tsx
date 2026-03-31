import { AudioSection } from "@/components/AudioSection";
import { Footer } from "@/components/Footer";

export default function BaaniAudioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="page-baani-audio">
      <div className="pt-16 md:pt-20">
        <AudioSection />
      </div>
      <Footer />
    </div>
  );
}
