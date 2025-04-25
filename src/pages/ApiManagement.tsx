
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MarketplaceSettingsDialog } from "@/components/marketplace/MarketplaceSettingsDialog";
import { MercadoLivreProducts } from "@/components/marketplace/MercadoLivreProducts";
import { Code, Settings } from 'lucide-react';
import { marketplaces } from "@/data/marketplaces";

export default function ApiManagement() {
  const [selectedMarketplace, setSelectedMarketplace] = React.useState<{ id: number; name: string; } | undefined>();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Code className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Gerenciamento de APIs</h1>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Teste de Conexão</CardTitle>
            <CardDescription>
              Configure e teste suas integrações com o Mercado Livre
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium mb-2">Mercado Livre</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Teste a conexão com a API do Mercado Livre para verificar se as credenciais estão corretas.
                </p>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="inline-flex items-center gap-2"
                  onClick={() => {
                    setSelectedMarketplace(marketplaces[0]);
                    setIsSettingsOpen(true);
                  }}
                >
                  <Settings className="h-4 w-4" />
                  Configurar API
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produtos do Mercado Livre</CardTitle>
            <CardDescription>
              Gerencie seus produtos listados no Mercado Livre
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MercadoLivreProducts />
          </CardContent>
        </Card>
      </div>

      <MarketplaceSettingsDialog
        isOpen={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        marketplace={selectedMarketplace}
      />
    </div>
  );
}
