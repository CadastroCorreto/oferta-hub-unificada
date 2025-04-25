
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MarketplaceSettingsDialog } from "@/components/marketplace/MarketplaceSettingsDialog";
import { Api, Settings } from 'lucide-react';
import { marketplaces } from "@/data/marketplaces";

export default function ApiManagement() {
  const [selectedMarketplace, setSelectedMarketplace] = React.useState<{ id: number; name: string; } | undefined>();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Api className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Gerenciamento de APIs</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>APIs Configuradas</CardTitle>
          <CardDescription>
            Gerencie suas integrações e chaves de API para diferentes marketplaces
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Marketplace</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última Atualização</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marketplaces.map((marketplace) => (
                <TableRow key={marketplace.id}>
                  <TableCell className="font-medium">{marketplace.name}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pendente
                    </span>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="inline-flex items-center gap-2"
                      onClick={() => {
                        setSelectedMarketplace(marketplace);
                        setIsSettingsOpen(true);
                      }}
                    >
                      <Settings className="h-4 w-4" />
                      Configurar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <MarketplaceSettingsDialog
        isOpen={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        marketplace={selectedMarketplace}
      />
    </div>
  );
}
