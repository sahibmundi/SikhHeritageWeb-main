import { useState } from "react";
import { X, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PdfViewerProps {
  fileName: string;
  label: string;
  onClose: () => void;
}

export function PdfViewer({ fileName, label, onClose }: PdfViewerProps) {
  const pdfUrl = `/attached_assets/${fileName}`;
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-hidden"
      onClick={onClose}
      data-testid="modal-pdf-viewer"
    >
      <div 
        className="h-screen flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-card border-b border-card-border px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 min-w-0">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-card-foreground truncate">
              {label}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="default"
              onClick={handleDownload}
              className="gap-2"
              data-testid="button-download-pdf"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">ਡਾਊਨਲੋਡ</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              data-testid="button-close-pdf"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
          </div>
        </div>

        <div className="flex-1 bg-muted p-2 sm:p-4 overflow-hidden">
          <Card className="h-full overflow-hidden shadow-2xl">
            <iframe
              src={pdfUrl}
              className="w-full h-full border-0"
              title={label}
              data-testid="iframe-pdf-content"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

interface PdfListProps {
  pdfAssets: Array<{ label: string; fileName: string }>;
}

export function PdfList({ pdfAssets }: PdfListProps) {
  const [selectedPdf, setSelectedPdf] = useState<{ fileName: string; label: string } | null>(null);

  return (
    <>
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-foreground">ਜਾਣਕਾਰੀ ਦੇ ਸਰੋਤ:</h4>
        <div className="grid grid-cols-1 gap-3">
          {pdfAssets.map((pdf, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3 px-4"
              onClick={() => setSelectedPdf(pdf)}
              data-testid={`button-view-pdf-${index}`}
            >
              <FileText className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-left">{pdf.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {selectedPdf && (
        <PdfViewer
          fileName={selectedPdf.fileName}
          label={selectedPdf.label}
          onClose={() => setSelectedPdf(null)}
        />
      )}
    </>
  );
}
