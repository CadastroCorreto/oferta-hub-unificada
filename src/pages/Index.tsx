import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { MarketplaceCard } from "@/components/MarketplaceCard";
import { ProductCard } from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Settings, Code } from 'lucide-react';

// Sample marketplaces data
const featuredMarketplaces = [
  {
    id: 1,
    name: "MercadoLivre",
    logo: "https://placehold.co/200?text=ML",
    description: "Conecte sua conta do MercadoLivre para ter acesso a ofertas exclusivas."
  },
  {
    id: 2,
    name: "Amazon",
    logo: "https://placehold.co/200?text=AM",
    description: "Milhares de produtos com entrega rápida disponíveis na Amazon."
  },
  {
    id: 3,
    name: "Shopee",
    logo: "https://placehold.co/200?text=SP",
    description: "Encontre produtos importados com os melhores preços na Shopee."
  },
];

// Sample products data
const trendingProducts = [
  {
    id: "1",
    title: "Smartphone Galaxy S23 128GB",
    image: "https://placehold.co/400?text=Phone",
    price: 3499.90,
    originalPrice: 4299.90,
    marketplace: "Amazon",
    marketplaceLogo: "https://placehold.co/200?text=AM",
    rating: 4.8,
    hasFreeShipping: true
  },
  {
    id: "2",
    title: "Notebook Dell Inspiron 15 8GB 256GB SSD",
    image: "https://placehold.co/400?text=Laptop",
    price: 2899.90,
    originalPrice: 3499.90,
    marketplace: "MercadoLivre",
    marketplaceLogo: "https://placehold.co/200?text=ML",
    rating: 4.5,
    hasFreeShipping: true
  },
  {
    id: "3",
    title: "Smart TV LG 55\" 4K",
    image: "https://placehold.co/400?text=TV",
    price: 2599.90,
    marketplace: "Magazine Luiza",
    marketplaceLogo: "https://placehold.co/200?text=ML",
    rating: 4.7,
    hasFreeShipping: false
  },
  {
    id: "4",
    title: "Fone de Ouvido Bluetooth JBL",
    image: "https://placehold.co/400?text=Headphone",
    price: 199.90,
    originalPrice: 299.90,
    marketplace: "Shopee",
    marketplaceLogo: "https://placehold.co/200?text=SP",
    rating: 4.3,
    hasFreeShipping: true
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Add Admin Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-4 items-center">
          <h2 className="text-lg font-semibold">Área Administrativa:</h2>
          <Link to="/admin/apis">
            <Button variant="outline" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Gerenciar APIs
            </Button>
          </Link>
          <Link to="/marketplaces">
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configurar Marketplaces
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero section */}
      <section className="py-16 px-4 md:py-24 bg-gradient-marketplace text-white">
        <div className="container mx-auto text-center space-y-8">
          <h1 className="text-3xl md:text-5xl font-bold">Encontre as Melhores Ofertas em Todos os Marketplaces</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Compare preços instantaneamente entre os principais sites de compras e economize dinheiro em cada compra.
          </p>
          <SearchBar size="lg" className="max-w-3xl mx-auto" />
        </div>
      </section>

      {/* Marketplaces section */}
      <section className="py-12 md:py-16 container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Conecte Seus Marketplaces</h2>
          <Link to="/marketplaces">
            <Button variant="outline">Ver todos</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredMarketplaces.map((marketplace) => (
            <MarketplaceCard
              key={marketplace.id}
              name={marketplace.name}
              logo={marketplace.logo}
              description={marketplace.description}
            />
          ))}
        </div>
      </section>

      {/* Trending products section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Ofertas em Destaque</h2>
            <Link to="/search">
              <Button variant="outline">Ver mais ofertas</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.image}
                price={product.price}
                originalPrice={product.originalPrice}
                marketplace={product.marketplace}
                marketplaceLogo={product.marketplaceLogo}
                rating={product.rating}
                hasFreeShipping={product.hasFreeShipping}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-12 md:py-16 container">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Por Que Usar o OfertaHub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-16 h-16 mb-4 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18"></path>
                <path d="m19 9-5 5-4-4-3 3"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Compare Preços Instantaneamente</h3>
            <p className="text-muted-foreground">Encontre o melhor preço para qualquer produto comparando ofertas de diversos marketplaces em tempo real.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-16 h-16 mb-4 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6"></circle>
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Ofertas Personalizadas</h3>
            <p className="text-muted-foreground">Conecte suas contas de marketplace para receber recomendações baseadas em seus interesses e histórico.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-16 h-16 mb-4 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Alertas de Preço</h3>
            <p className="text-muted-foreground">Configure alertas para ser notificado quando o preço de um produto desejado baixar em qualquer marketplace.</p>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-12 md:py-16 bg-gradient-marketplace text-white">
        <div className="container text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">Comece a economizar agora</h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Conecte suas contas de marketplace e descubra as melhores ofertas em uma única plataforma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/marketplaces">Conectar marketplaces</Link>
            </Button>
            <Button variant="default" size="lg" className="bg-white text-primary hover:bg-gray-100" asChild>
              <Link to="/search">Buscar produtos</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
