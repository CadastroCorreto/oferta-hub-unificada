
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

interface MarketplaceCardProps {
  name: string;
  logo: string;
  description: string;
  isConnected?: boolean;
  onConnect?: () => void;
  onInfo?: () => void;
}

export function MarketplaceCard({ 
  name, 
  logo, 
  description, 
  isConnected = false, 
  onConnect,
  onInfo 
}: MarketplaceCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={logo} 
              alt={`${name} logo`} 
              className="w-8 h-8 rounded-full object-cover" 
            />
            <CardTitle className="text-lg">{name}</CardTitle>
          </div>
          {isConnected && (
            <div className="bg-secondary/20 text-secondary text-xs px-2 py-1 rounded-full">
              Conectado
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <div className="w-full flex gap-2">
          <Button 
            variant={isConnected ? "outline" : "default"} 
            className="flex-1" 
            onClick={onConnect}
          >
            {isConnected ? "Desconectar" : "Conectar"}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onInfo}
            title="Mais informações"
          >
            <Info size={18} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
