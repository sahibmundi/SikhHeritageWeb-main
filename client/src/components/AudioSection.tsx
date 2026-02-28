import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { AudioTrack, RaagInfo } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AudioPlayer } from "./AudioPlayer";
import { Music2 } from "lucide-react";
import { motion } from "framer-motion";

export function AudioSection() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [selectedRaag, setSelectedRaag] = useState<string>("all");

  const { data: audioTracks, isLoading: audioLoading } = useQuery<AudioTrack[]>({
    queryKey: ["/api/audio"],
  });

  const { data: raags } = useQuery<RaagInfo[]>({
    queryKey: ["/api/raags"],
  });

  const filteredTracks = audioTracks?.filter((track) => 
    selectedRaag === "all" || track.raagId === selectedRaag
  ) || [];

  const handlePlayPause = (trackId: string) => {
    setCurrentlyPlaying(prev => prev === trackId ? null : trackId);
  };

  const getRaagName = (raagId: string) => {
    return raags?.find(r => r.id === raagId)?.name || raagId;
  };

  if (audioLoading) {
    return (
      <section id="audio" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="h-8 w-48 mx-auto bg-muted rounded animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="audio" className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Music2 className="h-8 w-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-mukta font-bold text-foreground">
              ਬਾਣੀ ਆਡੀਓ
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਦੀਆਂ ਬਾਣੀਆਂ ਦਾ ਕੀਰਤਨ - ਉੱਚ ਪੱਧਰੀ ਰਾਗੀਆਂ ਦੀ ਆਵਾਜ਼ ਵਿੱਚ
          </p>
        </motion.div>

        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-sm">
            <Select value={selectedRaag} onValueChange={setSelectedRaag}>
              <SelectTrigger data-testid="select-raag-filter">
                <SelectValue placeholder="ਸਾਰੇ ਰਾਗ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ਸਾਰੇ ਰਾਗ</SelectItem>
                {raags?.map((raag) => (
                  <SelectItem key={raag.id} value={raag.id}>
                    {raag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card data-testid={`card-audio-${track.id}`}>
                <CardHeader className="gap-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <CardTitle className="text-xl font-mukta">
                      {track.title}
                    </CardTitle>
                    <Badge variant="secondary" className="flex-shrink-0">
                      {getRaagName(track.raagId)}
                    </Badge>
                  </div>
                  <CardDescription className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">ਰਾਗੀ:</span>
                      <span className="font-medium">{track.performer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">ਸਮਾਂ:</span>
                      <span>{track.duration}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {track.description}
                  </p>
                  <AudioPlayer
                    audioUrl={track.audioUrl}
                    title={track.title}
                    performer={track.performer}
                    isPlaying={currentlyPlaying === track.id}
                    onPlayPause={() => handlePlayPause(track.id)}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredTracks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">ਇਸ ਰਾਗ ਵਿੱਚ ਕੋਈ ਆਡੀਓ ਉਪਲੱਬਧ ਨਹੀਂ</p>
          </div>
        )}
      </div>
    </section>
  );
}
