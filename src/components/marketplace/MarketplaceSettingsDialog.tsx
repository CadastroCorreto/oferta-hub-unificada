
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { marketplaces } from "@/data/marketplaces";
import { testMercadoLivreConnection } from "@/services/mercadolivre-integration";
import type { MarketplaceApiConfig } from "@/types/marketplace-integration";

interface MarketplaceSettingsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  marketplace?: {
    id: number;
    name: string;
  };
}

export function MarketplaceSettingsDialog({
  isOpen,
  onOpenChange,
  marketplace,
}: MarketplaceSettingsDialogProps) {
  const [config, setConfig] = useState<MarketplaceApiConfig>({
    apiUrl: 'https://api.mercadolibre.com',
    apiKey: '',
    marketplace_id: marketplace?.id || 1,
    apiSecret: '',
  });
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const handleSave = async () => {
    if (!marketplace) return;

    setIsLoading(true);
    try {
      // Processo de salvar as configurações
      // Para este exemplo, vamos apenas simular o salvamento
      toast({
        title: "Configurações salvas",
        description: `As chaves de API do ${marketplace.name} foram salvas com sucesso.`,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestConnection = async () => {
    if (!config.apiKey || !config.apiSecret) {
      toast({
        variant: "destructive",
        title: "Credenciais incompletas",
        description: "Preencha a API Key e o API Secret antes de testar.",
      });
      return;
    }

    setIsTestingConnection(true);
    try {
      const connectionResult = await testMercadoLivreConnection(config);

      if (connectionResult) {
        toast({
          title: "Conexão bem-sucedida",
          description: "As credenciais do Mercado Livre estão válidas.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Falha na conexão",
          description: "Não foi possível conectar com as credenciais fornecidas.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro de conexão",
        description: "Ocorreu um erro ao tentar conectar.",
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  if (!marketplace) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurar {marketplace.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="text"
              value={config.apiKey || ""}
              onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="apiSecret">API Secret</Label>
            <Input
              id="apiSecret"
              type="password"
              value={config.apiSecret || ""}
              onChange={(e) => setConfig(prev => ({ ...prev, apiSecret: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="apiUrl">URL da API</Label>
            <Input
              id="apiUrl"
              type="text"
              value={config.apiUrl || "https://api.mercadolibre.com"}
              onChange={(e) => setConfig(prev => ({ ...prev, apiUrl: e.target.value }))}
            />
          </div>
          <div className="flex space-x-2">
            <Button 
              className="flex-1" 
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Salvar configurações"}
            </Button>
            <Button 
              variant="outline"
              onClick={handleTestConnection}
              disabled={isTestingConnection}
              className="flex-1"
            >
              {isTestingConnection ? "Testando..." : "Testar Conexão"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
