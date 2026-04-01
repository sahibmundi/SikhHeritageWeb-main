import { BaaniViewer } from "@/components/BaaniViewer";
import { Footer } from "@/components/Footer";

export default function BaaniPage() {
  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="page-baani">
      <div className="pt-16 md:pt-20">
        <BaaniViewer />
      </div>
      <Footer />
    </div>
  );
}
