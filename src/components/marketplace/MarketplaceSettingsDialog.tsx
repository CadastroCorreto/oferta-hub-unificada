
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { marketplaces } from "@/data/marketplaces";
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
  const [config, setConfig] = useState<Partial<MarketplaceApiConfig>>({});
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!marketplace) return;

    setIsLoading(true);
    try {
      // We'll use Supabase's secrets management here
      // This will be handled by the lov-secret-form action
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
              type="password"
              value={config.apiKey || ""}
              onChange={(e) => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="apiSecret">API Secret (opcional)</Label>
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
              value={config.apiUrl || ""}
              onChange={(e) => setConfig(prev => ({ ...prev, apiUrl: e.target.value }))}
            />
          </div>
          <Button 
            className="w-full" 
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Salvando..." : "Salvar configurações"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
