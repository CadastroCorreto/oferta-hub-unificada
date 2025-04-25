
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MarketplaceCard } from "@/components/MarketplaceCard";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { toast } = useToast();

  const handleConnectClick = (marketplace: any) => {
    setCurrentMarketplace(marketplace);
    setIsDialogOpen(true);
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
              <label htmlFor="email" className="text-sm font-medium">
                Email ou usuário
              </label>
              <input
                id="email"
                type="text"
                className="border rounded-md p-2"
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm font-medium">
                Senha
              </label>
              <input
                id="password"
                type="password"
                className="border rounded-md p-2"
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
    </div>
  );
}
