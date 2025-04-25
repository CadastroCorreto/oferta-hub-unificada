
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ProductCard } from '@/components/ProductCard';
import { listMercadoLivreProducts, type MercadoLivreProduct } from '@/services/mercadolivre-products';

export function FeaturedMercadoLivreProducts() {
  const [products, setProducts] = useState<MercadoLivreProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        // Configuração automática para demonstração
        const demoConfig = {
          marketplace_id: 1,
          access_token: 'TEST-5534979277439328-042412-7b3461529b257f3fee46c96f52612b8a-246172383'
        };

        // Salvar no localStorage para manter consistência com o resto da aplicação
        localStorage.setItem('marketplace_api_config', JSON.stringify([demoConfig]));

        const productsList = await listMercadoLivreProducts(demoConfig.access_token);
        setProducts(productsList);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar produtos",
          description: "Não foi possível carregar os produtos do Mercado Livre",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          image={product.thumbnail}
          price={product.price}
          marketplace="Mercado Livre"
          marketplaceLogo="https://placehold.co/200?text=ML"
          rating={4.5}
          hasFreeShipping={true}
        />
      ))}
    </div>
  );
}
