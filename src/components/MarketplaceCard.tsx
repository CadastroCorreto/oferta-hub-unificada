
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface MarketplaceCardProps {
  name: string;
  logo: string;
  description: string;
  isConnected?: boolean;
  onConnect?: () => void;
}

export function MarketplaceCard({ name, logo, description, isConnected = false, onConnect }: MarketplaceCardProps) {
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
        <Button 
          variant={isConnected ? "outline" : "default"} 
          className="w-full" 
          onClick={onConnect}
        >
          {isConnected ? "Desconectar" : "Conectar"}
        </Button>
      </CardFooter>
    </Card>
  );
}
