
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample products data
const mockProducts = [
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
  {
    id: "5",
    title: "Monitor Gamer 27\" 144Hz LG",
    image: "https://placehold.co/400?text=Monitor",
    price: 1399.90,
    originalPrice: 1699.90,
    marketplace: "Amazon",
    marketplaceLogo: "https://placehold.co/200?text=AM",
    rating: 4.6,
    hasFreeShipping: true
  },
  {
    id: "6",
    title: "Cadeira Gamer Thunderx3",
    image: "https://placehold.co/400?text=Chair",
    price: 899.90,
    originalPrice: 1199.90,
    marketplace: "AliExpress",
    marketplaceLogo: "https://placehold.co/200?text=AX",
    rating: 4.2,
    hasFreeShipping: false
  },
  {
    id: "7",
    title: "Aspirador de Pó Robô Xiaomi",
    image: "https://placehold.co/400?text=Vacuum",
    price: 1299.90,
    marketplace: "Americanas",
    marketplaceLogo: "https://placehold.co/200?text=AM",
    rating: 4.4,
    hasFreeShipping: true
  },
  {
    id: "8",
    title: "Cafeteira Expresso Nespresso",
    image: "https://placehold.co/400?text=Coffee",
    price: 499.90,
    originalPrice: 699.90,
    marketplace: "MercadoLivre",
    marketplaceLogo: "https://placehold.co/200?text=ML",
    rating: 4.9,
    hasFreeShipping: true
  },
];

const marketplaces = [
  { id: "amazon", name: "Amazon" },
  { id: "mercadolivre", name: "MercadoLivre" },
  { id: "shopee", name: "Shopee" },
  { id: "magalu", name: "Magazine Luiza" },
  { id: "aliexpress", name: "AliExpress" },
  { id: "americanas", name: "Americanas" },
];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(mockProducts);
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    freeShipping: false,
    marketplaces: [] as string[],
    discount: false,
  });
  const [sortBy, setSortBy] = useState("relevance");

  const query = searchParams.get("q") || "";
  
  // Simulate search results based on query
  useEffect(() => {
    if (query) {
      const filtered = mockProducts.filter(
        (product) => 
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.marketplace.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filtered);
    } else {
      setProducts(mockProducts);
    }
  }, [query]);

  // Apply filters
  const applyFilters = () => {
    let filtered = [...mockProducts];
    
    // Filter by price range
    filtered = filtered.filter(
      (product) => 
        product.price >= filters.priceRange[0] && 
        product.price <= filters.priceRange[1]
    );
    
    // Filter by free shipping
    if (filters.freeShipping) {
      filtered = filtered.filter((product) => product.hasFreeShipping);
    }
    
    // Filter by marketplaces
    if (filters.marketplaces.length > 0) {
      filtered = filtered.filter(
        (product) => 
          filters.marketplaces.some(
            (m) => product.marketplace.toLowerCase().includes(m.toLowerCase())
          )
      );
    }
    
    // Filter by discount
    if (filters.discount) {
      filtered = filtered.filter((product) => product.originalPrice);
    }
    
    // Apply sort
    switch (sortBy) {
      case "price_asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "discount":
        filtered.sort((a, b) => {
          const discountA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
          const discountB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
          return discountB - discountA;
        });
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // relevance is default, no sorting needed
        break;
    }
    
    // Apply search query
    if (query) {
      filtered = filtered.filter(
        (product) => 
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.marketplace.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    setProducts(filtered);
  };

  // Apply filters whenever they change
  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sortBy]);

  const handleSearch = (searchQuery: string) => {
    setSearchParams({ q: searchQuery });
  };

  const toggleMarketplace = (marketplaceId: string) => {
    setFilters(prev => ({
      ...prev,
      marketplaces: prev.marketplaces.includes(marketplaceId)
        ? prev.marketplaces.filter(id => id !== marketplaceId)
        : [...prev.marketplaces, marketplaceId]
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container py-8">
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
          {query && (
            <p className="mt-4 text-muted-foreground">
              Mostrando resultados para <span className="font-medium text-foreground">"{query}"</span>
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="font-semibold mb-4 text-lg">Filtros</h3>
              
              <div className="space-y-6">
                {/* Price range filter */}
                <div>
                  <h4 className="font-medium mb-3">Faixa de preço</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 5000]}
                      max={5000}
                      step={100}
                      onValueChange={(value) => 
                        setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))
                      }
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>R$ {filters.priceRange[0]}</span>
                      <span>R$ {filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                {/* Marketplace filter */}
                <div>
                  <h4 className="font-medium mb-3">Marketplaces</h4>
                  <div className="space-y-2">
                    {marketplaces.map((marketplace) => (
                      <div key={marketplace.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={marketplace.id}
                          checked={filters.marketplaces.includes(marketplace.id)}
                          onCheckedChange={() => toggleMarketplace(marketplace.id)}
                        />
                        <label 
                          htmlFor={marketplace.id}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {marketplace.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Free shipping filter */}
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="free-shipping"
                      checked={filters.freeShipping}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ ...prev, freeShipping: !!checked }))
                      }
                    />
                    <label 
                      htmlFor="free-shipping"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Frete grátis
                    </label>
                  </div>
                </div>
                
                {/* Discount filter */}
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="discount"
                      checked={filters.discount}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ ...prev, discount: !!checked }))
                      }
                    />
                    <label 
                      htmlFor="discount"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Com desconto
                    </label>
                  </div>
                </div>
                
                {/* Clear filters button */}
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => {
                    setFilters({
                      priceRange: [0, 5000],
                      freeShipping: false,
                      marketplaces: [],
                      discount: false,
                    });
                  }}
                >
                  Limpar filtros
                </Button>
              </div>
            </div>
          </aside>
          
          {/* Search results */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-muted-foreground">
                  {products.length} produtos encontrados
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Ordenar por:</span>
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Relevância" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevância</SelectItem>
                    <SelectItem value="price_asc">Menor preço</SelectItem>
                    <SelectItem value="price_desc">Maior preço</SelectItem>
                    <SelectItem value="discount">Maior desconto</SelectItem>
                    <SelectItem value="rating">Melhor avaliação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
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
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-semibold mb-2">Nenhum resultado encontrado</h3>
                <p className="text-muted-foreground mb-6">
                  Tente buscar por outro termo ou ajustar seus filtros.
                </p>
                <Button onClick={() => {
                  setSearchParams({});
                  setFilters({
                    priceRange: [0, 5000],
                    freeShipping: false,
                    marketplaces: [],
                    discount: false,
                  });
                }}>
                  Limpar pesquisa
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
