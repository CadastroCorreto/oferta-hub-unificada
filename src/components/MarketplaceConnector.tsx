import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { MarketplaceCard } from "@/components/MarketplaceCard";
import { marketplaces } from "@/data/marketplaces";
import { MarketplaceInfoDialog } from "@/components/marketplace/MarketplaceInfoDialog";
import { MarketplaceConnectDialog } from "@/components/marketplace/MarketplaceConnectDialog";
import { MarketplaceSettingsDialog } from "@/components/marketplace/MarketplaceSettingsDialog";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MercadoLivreAuth } from "@/components/marketplace/MercadoLivreAuth";
import { 
  authenticateMarketplace, 
  saveMarketplaceIntegration,
  getMarketplaceIntegrations,
  disconnectMarketplaceIntegration 
} from "@/services/marketplace-integration";
import type { MarketplaceIntegration } from "@/types/marketplace-integration";

export function MarketplaceConnector() {
  const [integrations, setIntegrations] = useState<MarketplaceIntegration[]>([]);
  const [currentMarketplace, setCurrentMarketplace] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMercadoLivreAuthOpen, setIsMercadoLivreAuthOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    try {
      const loadedIntegrations = await getMarketplaceIntegrations();
      setIntegrations(loadedIntegrations);
    } catch (error) {
      console.error('Erro ao carregar integrações:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar marketplaces",
        description: "Não foi possível carregar suas integrações.",
      });
    }
  };

  const handleConnectClick = (marketplace: any) => {
    setCurrentMarketplace(marketplace);
    
    if (marketplace.id === 1) {
      setIsMercadoLivreAuthOpen(true);
    } else {
      setIsDialogOpen(true);
    }
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
      const config = {
        apiKey: 'sua-chave-api',
        apiUrl: `https://api.${currentMarketplace.name.toLowerCase()}.com`,
        marketplace_id: currentMarketplace.id
      };

      const authResponse = await authenticateMarketplace(credentials, config);
      await saveMarketplaceIntegration(currentMarketplace.id, authResponse);
      await loadIntegrations();
      
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
        description: "Ocorreu um erro ao tentar conectar sua conta. Verifique suas credenciais e tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async (integration: MarketplaceIntegration) => {
    setIsLoading(true);
    try {
      await disconnectMarketplaceIntegration(integration.id);
      await loadIntegrations();
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

  const openSettings = (marketplace: any) => {
    setCurrentMarketplace(marketplace);
    setIsSettingsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md flex-1 mr-4">
          <h3 className="font-medium text-yellow-800 mb-2">Importante</h3>
          <p className="text-sm text-yellow-700">
            Você pode ver ofertas de todos os marketplaces, mesmo sem conectar sua conta.
            Conectar uma conta permite acompanhar seus pedidos, usar cupons e ter acesso a ofertas personalizadas.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => openSettings(marketplaces[0])}
        >
          <Settings size={16} />
          Configurar APIs
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {marketplaces.map((marketplace) => (
          <MarketplaceCard
            key={marketplace.id}
            name={marketplace.name}
            logo={marketplace.logo}
            description={marketplace.description}
            isConnected={integrations.some(integration => integration.marketplace_id === marketplace.id)}
            onConnect={() => 
              integrations.some(integration => integration.marketplace_id === marketplace.id) 
                ? handleDisconnect(integrations.find(integration => integration.marketplace_id === marketplace.id)!) 
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

      <MarketplaceSettingsDialog
        isOpen={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        marketplace={currentMarketplace}
      />
      
      {isMercadoLivreAuthOpen && currentMarketplace?.id === 1 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Conectar ao Mercado Livre</h2>
            
            <MercadoLivreAuth 
              clientId={import.meta.env.VITE_ML_APP_ID || "APP_ID_MERCADO_LIVRE"} 
              redirectUri={`${window.location.origin}/callback/mercadolivre`}
            />
            
            <div className="mt-4 text-right">
              <Button 
                variant="outline" 
                onClick={() => setIsMercadoLivreAuthOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
