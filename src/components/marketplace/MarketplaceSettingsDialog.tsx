
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { marketplaces } from "@/data/marketplaces";
import { testMercadoLivreConnection } from "@/services/mercadolivre-integration";
import type { MarketplaceApiConfig } from "@/types/marketplace-integration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface MarketplaceSettingsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  marketplace?: {
    id: number;
    name: string;
  };
}

// Chave para armazenar configurações no localStorage
const STORAGE_KEY = 'marketplace_api_config';

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
  const [savedConfigs, setSavedConfigs] = useState<MarketplaceApiConfig[]>([]);

  // Carregar configurações salvas quando o componente for montado
  useEffect(() => {
    if (isOpen && marketplace) {
      loadSavedConfig();
      loadAllConfigs();
    }
  }, [isOpen, marketplace]);

  // Carregar configuração específica para o marketplace atual
  const loadSavedConfig = () => {
    if (!marketplace) return;
    
    try {
      const savedConfigsStr = localStorage.getItem(STORAGE_KEY);
      if (savedConfigsStr) {
        const allConfigs = JSON.parse(savedConfigsStr) as MarketplaceApiConfig[];
        const marketplaceConfig = allConfigs.find(c => c.marketplace_id === marketplace.id);
        
        if (marketplaceConfig) {
          setConfig(marketplaceConfig);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar configuração:", error);
    }
  };

  // Carregar todas as configurações salvas
  const loadAllConfigs = () => {
    try {
      const savedConfigsStr = localStorage.getItem(STORAGE_KEY);
      if (savedConfigsStr) {
        const allConfigs = JSON.parse(savedConfigsStr) as MarketplaceApiConfig[];
        setSavedConfigs(allConfigs);
      }
    } catch (error) {
      console.error("Erro ao carregar todas as configurações:", error);
    }
  };

  const handleSave = async () => {
    if (!marketplace) return;

    setIsLoading(true);
    try {
      // Salvar configuração no localStorage
      const savedConfigsStr = localStorage.getItem(STORAGE_KEY);
      let allConfigs: MarketplaceApiConfig[] = [];
      
      if (savedConfigsStr) {
        allConfigs = JSON.parse(savedConfigsStr);
        // Remover configuração anterior para este marketplace
        allConfigs = allConfigs.filter(c => c.marketplace_id !== marketplace.id);
      }
      
      // Adicionar nova configuração
      allConfigs.push(config);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allConfigs));
      
      // Atualizar lista de configurações salvas
      setSavedConfigs(allConfigs);
      
      toast({
        title: "Configurações salvas",
        description: `As chaves de API do ${marketplace.name} foram salvas com sucesso.`,
      });
      
      // Manter o diálogo aberto para permitir mais ações
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

  // Função para deletar uma configuração salva
  const handleDeleteConfig = (marketplaceId: number) => {
    try {
      const updatedConfigs = savedConfigs.filter(c => c.marketplace_id !== marketplaceId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConfigs));
      setSavedConfigs(updatedConfigs);
      
      // Se o marketplace atual foi excluído, limpar o formulário
      if (marketplace && marketplaceId === marketplace.id) {
        setConfig({
          apiUrl: 'https://api.mercadolibre.com',
          apiKey: '',
          marketplace_id: marketplace.id,
          apiSecret: '',
        });
      }
      
      toast({
        title: "Configuração excluída",
        description: "A configuração foi removida com sucesso.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao excluir",
        description: "Não foi possível excluir a configuração.",
      });
    }
  };

  if (!marketplace) return null;

  const getMarketplaceName = (marketplaceId: number) => {
    const marketplace = marketplaces.find(m => m.id === marketplaceId);
    return marketplace?.name || 'Desconhecido';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Configurar {marketplace.name}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="config">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="config">Configuração</TabsTrigger>
            <TabsTrigger value="saved">Configurações Salvas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="config" className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="apiKey">API Key (App ID)</Label>
              <Input
                id="apiKey"
                type="text"
                value={config.apiKey || ""}
                onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="apiSecret">API Secret (Client Secret)</Label>
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
          </TabsContent>
          
          <TabsContent value="saved">
            {savedConfigs.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Marketplace</TableHead>
                    <TableHead>API Key</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {savedConfigs.map((config) => (
                    <TableRow key={config.marketplace_id}>
                      <TableCell className="font-medium">{getMarketplaceName(config.marketplace_id)}</TableCell>
                      <TableCell>{config.apiKey}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                          Configurado
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteConfig(config.marketplace_id)}
                        >
                          Excluir
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma configuração salva. Configure um marketplace primeiro.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
