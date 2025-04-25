
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { MarketplaceCard } from "@/components/MarketplaceCard";
import { connectMarketplace, disconnectMarketplace, getConnectedMarketplaces } from "@/services/marketplace";
import { marketplaces } from "@/data/marketplaces";
import { MarketplaceInfoDialog } from "@/components/marketplace/MarketplaceInfoDialog";
import { MarketplaceConnectDialog } from "@/components/marketplace/MarketplaceConnectDialog";

export function MarketplaceConnector() {
  const [connectedIds, setConnectedIds] = useState<number[]>([]);
  const [currentMarketplace, setCurrentMarketplace] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadConnectedMarketplaces();
  }, []);

  const loadConnectedMarketplaces = async () => {
    try {
      const connections = await getConnectedMarketplaces();
      setConnectedIds(connections.map(conn => conn.marketplace_id));
    } catch (error) {
      console.error('Erro ao carregar marketplaces:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar marketplaces",
        description: "Não foi possível carregar seus marketplaces conectados.",
      });
    }
  };

  const handleConnectClick = (marketplace: any) => {
    setCurrentMarketplace(marketplace);
    setIsDialogOpen(true);
  };

  const handleInfoClick = (marketplace: any) => {
    setCurrentMarketplace(marketplace);
    setIsInfoDialogOpen(true);
  };

  const handleCredentialsChange = (field: "email" | "password", value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  const handleConnect = async () => {
    if (!credentials.email || !credentials.password) {
      toast({
        variant: "destructive",
        title: "Erro ao conectar",
        description: "Por favor, preencha todos os campos.",
      });
      return;
    }

    setIsLoading(true);
    try {
      await connectMarketplace(currentMarketplace.id, credentials);
      await loadConnectedMarketplaces();
      setIsDialogOpen(false);
      setCredentials({ email: "", password: "" });
      toast({
        title: "Marketplace conectado!",
        description: `Sua conta do ${currentMarketplace.name} foi conectada com sucesso.`,
      });
    } catch (error) {
      console.error('Erro ao conectar:', error);
      toast({
        variant: "destructive",
        title: "Erro ao conectar",
        description: "Ocorreu um erro ao tentar conectar sua conta. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async (id: number) => {
    setIsLoading(true);
    try {
      await disconnectMarketplace(id);
      await loadConnectedMarketplaces();
      toast({
        title: "Marketplace desconectado",
        description: "Sua conta foi desconectada com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao desconectar:', error);
      toast({
        variant: "destructive",
        title: "Erro ao desconectar",
        description: "Ocorreu um erro ao tentar desconectar sua conta. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
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

      <MarketplaceConnectDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        marketplace={currentMarketplace}
        credentials={credentials}
        onCredentialsChange={handleCredentialsChange}
        onConnect={handleConnect}
      />

      <MarketplaceInfoDialog
        isOpen={isInfoDialogOpen}
        onOpenChange={setIsInfoDialogOpen}
        marketplace={currentMarketplace}
        onConnectClick={() => {
          setIsInfoDialogOpen(false);
          handleConnectClick(currentMarketplace);
        }}
      />
    </div>
  );
}
