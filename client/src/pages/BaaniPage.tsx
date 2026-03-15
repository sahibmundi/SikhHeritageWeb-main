import { Header } from "@/components/Header";
import { BaaniViewer } from "@/components/BaaniViewer";
import { AudioSection } from "@/components/AudioSection";
import { Footer } from "@/components/Footer";

export default function BaaniPage() {
  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="page-baani">
      <Header />
      <div className="pt-16 md:pt-20">
        <BaaniViewer />
        <AudioSection />
      </div>
      <Footer />
    </div>
  );
}
