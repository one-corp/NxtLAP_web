import { League } from "@/types/League";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, Calendar, Trophy } from "lucide-react";
import Image from "next/image";

interface LeagueCardProps {
  league: League;
}

export function LeagueCard({ league }: LeagueCardProps) {
  return (
    <Card className="glass-effect racing-glow group hover:animate-glow transition-all duration-500 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={league.banner}
          alt={league.name}
          width={500}
                height={500}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div className="absolute top-4 right-4">
          <Image
            src={league.logo}
            alt={`${league.name} logo`}
            width={500}
                height={500}
            className="w-12 h-12 object-contain bg-card/80 rounded-lg p-2 backdrop-blur-sm"
          />
        </div>
      </div>
      
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gradient group-hover:animate-race-pulse">
              {league.name}
            </h3>
            <Badge variant="secondary" className="racing-glow">
              {league.shortName}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Since {league.formedYear}</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-primary" />
              <span>{league.sport}</span>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {league.description}
        </p>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Image
              src={league.trophy}
              alt="Trophy"
              width={500}
                height={500}
              className="w-6 h-6 object-contain"
            />
            <span className="text-xs text-muted-foreground">
              Championship Trophy
            </span>
          </div>
          
          <a
            href={`https://${league.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 text-sm transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Visit</span>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}