
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MarketplaceConnector } from "@/components/MarketplaceConnector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const Marketplaces = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Conecte seus Marketplaces</h1>
            <p className="text-muted-foreground">
              Conecte suas contas para encontrar as melhores ofertas e gerenciar suas compras em um só lugar.
            </p>
          </div>
          
          <Tabs defaultValue="connect" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="connect">Conectar</TabsTrigger>
              <TabsTrigger value="connected">Conectados</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="connect">
              <Card>
                <CardHeader>
                  <CardTitle>Conecte seus Marketplaces</CardTitle>
                  <CardDescription>
                    Conecte suas contas para ver ofertas personalizadas e acompanhar seus pedidos.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MarketplaceConnector />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="connected">
              <Card>
                <CardHeader>
                  <CardTitle>Marketplaces Conectados</CardTitle>
                  <CardDescription>
                    Gerencie seus marketplaces conectados e suas configurações.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert className="mb-6">
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Como funciona?</AlertTitle>
                    <AlertDescription>
                      O Encontrae mostra ofertas de todos os marketplaces disponíveis, mas conectar sua conta permite acompanhar pedidos, 
                      usar cupons e receber ofertas personalizadas.
                    </AlertDescription>
                  </Alert>

                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      Você ainda não conectou nenhum marketplace.
                    </p>
                    <Button
                      onClick={() => {
                        const connectTab = document.querySelector('[data-value="connect"]') as HTMLButtonElement;
                        if (connectTab) connectTab.click();
                      }}
                    >
                      Conectar agora
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações</CardTitle>
                  <CardDescription>
                    Personalize sua experiência com os marketplaces conectados.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Notificações</h3>
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">Alertas de preço</p>
                          <p className="text-sm text-muted-foreground">
                            Receba notificações quando um produto que você acompanha baixar de preço.
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">Atualizações de pedidos</p>
                          <p className="text-sm text-muted-foreground">
                            Receba notificações sobre atualizações em seus pedidos.
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">Novas ofertas</p>
                          <p className="text-sm text-muted-foreground">
                            Receba notificações sobre novas ofertas em categorias que você tem interesse.
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Privacidade</h3>
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">Compartilhar dados de busca</p>
                          <p className="text-sm text-muted-foreground">
                            Permitir que seus dados de busca sejam utilizados para melhorar as recomendações.
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <Button>Salvar configurações</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Marketplaces;
