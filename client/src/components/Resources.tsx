import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Resource } from "@shared/schema";

interface ResourcesProps {
  resources: Resource[];
}

export function Resources({ resources }: ResourcesProps) {
  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

  return (
    <section id="resources" className="py-16 md:py-24 bg-accent/20 animate-fade-in-up" data-testid="section-resources">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 animate-scale-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-resources-title">
            ਸਰੋਤ ਡਾਊਨਲੋਡ
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-resources-subtitle">
            ਜੀਵਨੀ, ਸਿੱਖਿਆਵਾਂ, ਗੁਰਦੁਆਰਿਆਂ ਦਾ ਇਤਿਹਾਸ, ਅਤੇ ਬਾਣੀ ਦੇ ਅਰਥ ਡਾਊਨਲੋਡ ਕਰੋ
          </p>
        </div>

        <div className="space-y-12">
          {Object.entries(groupedResources).map(([category, items], categoryIndex) => (
            <div key={category} className="animate-fade-in-up" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
              <h3 className="text-2xl md:text-3xl font-semibold text-orange-500 mb-6">
                {category}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((resource) => (
                  <Card key={resource.id} className="shadow-3d-hover glow-border" data-testid={`card-resource-${resource.id}`}>
                    <CardHeader className="bg-card/80 border-b border-card-border">
                      <CardTitle className="text-xl md:text-2xl font-semibold text-card-foreground">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4 pt-6">
                      <p className="text-sm md:text-base text-foreground/80">
                        {resource.description}
                      </p>

                      <Button
                        variant="default"
                        className="w-full gap-2 shadow-3d-hover glow-border"
                        onClick={() => window.open(resource.pdfUrl, '_blank')}
                        data-testid={`button-download-${resource.id}`}
                      >
                        <Download className="w-4 h-4" />
                        PDF ਡਾਊਨਲੋਡ ਕਰੋ
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
