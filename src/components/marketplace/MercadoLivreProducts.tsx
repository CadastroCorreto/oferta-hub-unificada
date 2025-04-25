
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { listMercadoLivreProducts, type MercadoLivreProduct } from '@/services/mercadolivre-products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function MercadoLivreProducts() {
  const [products, setProducts] = useState<MercadoLivreProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      // Recuperar o token do localStorage
      const savedConfigsStr = localStorage.getItem('marketplace_api_config');
      if (!savedConfigsStr) {
        throw new Error('Configurações do Mercado Livre não encontradas');
      }

      const savedConfigs = JSON.parse(savedConfigsStr);
      const mlConfig = savedConfigs.find((config: any) => config.marketplace_id === 1);
      
      if (!mlConfig?.access_token) {
        throw new Error('Token de acesso não encontrado');
      }

      const productsList = await listMercadoLivreProducts(mlConfig.access_token);
      setProducts(productsList);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      toast({
        variant: "destructive",
        title: "Erro ao carregar produtos",
        description: error instanceof Error ? error.message : "Erro desconhecido",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Produtos do Mercado Livre</h2>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Novo Produto
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle className="text-lg truncate">{product.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative mb-4">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-bold">
                    R$ {product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Disponível: {product.available_quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    Vendidos: {product.sold_quantity}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(product.permalink, '_blank')}
                  >
                    Ver no Mercado Livre
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <p className="text-gray-500 mb-4">Nenhum produto encontrado</p>
            <Button onClick={loadProducts}>Tentar novamente</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
