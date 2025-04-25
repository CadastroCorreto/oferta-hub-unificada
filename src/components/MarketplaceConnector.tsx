
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MarketplaceCard } from "@/components/MarketplaceCard";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink } from "lucide-react";

// Mock data for marketplaces
const marketplaces = [
  {
    id: 1,
    name: "MercadoLivre",
    logo: "https://placehold.co/200?text=ML",
    description: "Maior marketplace da América Latina com milhões de produtos."
  },
  {
    id: 2,
    name: "Amazon",
    logo: "https://placehold.co/200?text=AM",
    description: "Gigante do e-commerce global com variedade de produtos."
  },
  {
    id: 3,
    name: "Shopee",
    logo: "https://placehold.co/200?text=SP",
    description: "Marketplace com produtos de todo o mundo a preços competitivos."
  },
  {
    id: 4,
    name: "Magazine Luiza",
    logo: "https://placehold.co/200?text=ML",
    description: "Uma das maiores varejistas do Brasil com amplo catálogo."
  },
  {
    id: 5,
    name: "AliExpress",
    logo: "https://placehold.co/200?text=AX",
    description: "Produtos importados da China com preços acessíveis."
  },
  {
    id: 6,
    name: "Americanas",
    logo: "https://placehold.co/200?text=AM",
    description: "Grande variedade de produtos de diferentes categorias."
  },
];

export function MarketplaceConnector() {
  const [connectedIds, setConnectedIds] = useState<number[]>([]);
  const [currentMarketplace, setCurrentMarketplace] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { toast } = useToast();

  const handleConnectClick = (marketplace: any) => {
    setCurrentMarketplace(marketplace);
    setIsDialogOpen(true);
  };

  const handleInfoClick = (marketplace: any) => {
    setCurrentMarketplace(marketplace);
    setIsInfoDialogOpen(true);
  };

  const handleConnect = () => {
    if (credentials.email && credentials.password) {
      // Here would be the actual API call to connect the marketplace
      setConnectedIds(prev => [...prev, currentMarketplace.id]);
      setIsDialogOpen(false);
      setCredentials({ email: "", password: "" });
      toast({
        title: "Marketplace conectado!",
        description: `Sua conta do ${currentMarketplace.name} foi conectada com sucesso.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao conectar",
        description: "Por favor, preencha todos os campos.",
      });
    }
  };

  const handleDisconnect = (id: number) => {
    setConnectedIds(prev => prev.filter(marketplaceId => marketplaceId !== id));
    toast({
      title: "Marketplace desconectado",
      description: "Sua conta foi desconectada com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-6">
        <h3 className="font-medium text-yellow-800 mb-2">Importante</h3>
        <p className="text-sm text-yellow-700">
          Você pode ver ofertas de todos os marketplaces, mesmo sem conectar sua conta.
          Conectar uma conta permite acompanhar seus pedidos, usar cupons e ter acesso a ofertas personalizadas.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {marketplaces.map((marketplace) => (
          <MarketplaceCard
            key={marketplace.id}
            name={marketplace.name}
            logo={marketplace.logo}
            description={marketplace.description}
            isConnected={connectedIds.includes(marketplace.id)}
            onConnect={() => 
              connectedIds.includes(marketplace.id) 
                ? handleDisconnect(marketplace.id) 
                : handleConnectClick(marketplace)
            }
            onInfo={() => handleInfoClick(marketplace)}
          />
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Conectar {currentMarketplace?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email ou usuário</Label>
              <Input
                id="email"
                type="text"
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>
            <Button className="w-full" onClick={handleConnect}>
              Conectar conta
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isInfoDialogOpen} onOpenChange={setIsInfoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Informações sobre {currentMarketplace?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p>Mesmo sem conectar sua conta, você ainda pode ver ofertas do {currentMarketplace?.name} em nossa plataforma.</p>
            
            <div className="space-y-2">
              <h4 className="font-medium">Benefícios de conectar:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Acompanhamento de pedidos</li>
                <li>Recomendações personalizadas</li>
                <li>Alertas de preço para produtos do seu interesse</li>
                <li>Uso de cupons e promoções exclusivas</li>
              </ul>
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsInfoDialogOpen(false)}
              >
                Ver ofertas sem conectar
              </Button>
              
              <Button
                className="flex-1"
                onClick={() => {
                  setIsInfoDialogOpen(false);
                  handleConnectClick(currentMarketplace);
                }}
              >
                Conectar conta
              </Button>
            </div>
            
            <div className="pt-2 flex justify-center">
              <a 
                href={`https://${currentMarketplace?.name.toLowerCase().replace(/\s+/g, '')}.com.br`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary flex items-center gap-1 hover:underline"
              >
                Visitar site oficial <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
