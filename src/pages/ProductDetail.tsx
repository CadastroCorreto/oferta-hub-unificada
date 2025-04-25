import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

// Sample product data
const mockProducts = {
  "1": {
    id: "1",
    title: "Smartphone Galaxy S23 128GB",
    description: "O Galaxy S23 é o smartphone mais recente da Samsung com processador avançado, tela AMOLED de alta resolução e câmera inovadora para fotos mais nítidas mesmo em ambientes com pouca luz.",
    images: [
      "https://placehold.co/600x400?text=S23-Front",
      "https://placehold.co/600x400?text=S23-Back",
      "https://placehold.co/600x400?text=S23-Side"
    ],
    price: 3499.90,
    originalPrice: 4299.90,
    marketplace: "Amazon",
    marketplaceLogo: "https://placehold.co/200?text=AM",
    rating: 4.8,
    hasFreeShipping: true,
    attributes: [
      { name: "Memória", value: "128GB" },
      { name: "RAM", value: "8GB" },
      { name: "Cor", value: "Preto" },
      { name: "Tela", value: "6.1 polegadas" },
      { name: "Sistema", value: "Android 13" }
    ],
    offers: [
      { marketplace: "Amazon", logo: "https://placehold.co/200?text=AM", price: 3499.90, originalPrice: 4299.90, freeShipping: true, deliveryDays: 2 },
      { marketplace: "MercadoLivre", logo: "https://placehold.co/200?text=ML", price: 3599.90, originalPrice: 4299.90, freeShipping: true, deliveryDays: 3 },
      { marketplace: "Magazine Luiza", logo: "https://placehold.co/200?text=ML", price: 3699.90, originalPrice: 4399.90, freeShipping: false, deliveryDays: 5 }
    ]
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const product = mockProducts[id as keyof typeof mockProducts];
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
            <p className="mb-6">O produto que você está procurando não está disponível.</p>
            <Button asChild>
              <a href="/search">Voltar para pesquisa</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container py-8">
        <div className="mb-4">
          <a href="/search" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"></path>
            </svg>
            Voltar para resultados
          </a>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                src={product.images[currentImage]} 
                alt={product.title} 
                className="max-h-full w-auto object-contain"
              />
            </div>
            
            <div className="flex gap-3 overflow-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`w-20 h-20 rounded border-2 flex-shrink-0 ${currentImage === index ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setCurrentImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.title} - imagem ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img
                src={product.marketplaceLogo}
                alt={product.marketplace}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm text-muted-foreground">Vendido por {product.marketplace}</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              {product.rating && (
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="none"
                    className="text-marketplace-yellow"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span className="font-medium">{product.rating.toFixed(1)}</span>
                </div>
              )}
              
              {product.hasFreeShipping && (
                <Badge variant="outline" className="text-green-600 bg-green-50">
                  Frete grátis
                </Badge>
              )}
              
              {discount > 0 && (
                <Badge className="bg-marketplace-red">
                  -{discount}% OFF
                </Badge>
              )}
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground">
                ou 10x de R$ {(product.price / 10).toFixed(2).replace('.', ',')} sem juros
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <Button className="w-full h-12 text-lg">Ir para oferta</Button>
              
              <Button variant="outline" className="w-full">Adicionar aos favoritos</Button>
            </div>
            
            {/* Other offers */}
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Outras ofertas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {product.offers.map((offer, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-2">
                        <img
                          src={offer.logo}
                          alt={offer.marketplace}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="font-medium">{offer.marketplace}</span>
                        {offer.freeShipping && (
                          <Badge variant="outline" className="text-xs text-green-600 bg-green-50">
                            Frete grátis
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          R$ {offer.price.toFixed(2).replace('.', ',')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Entrega em {offer.deliveryDays} dias úteis
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Attributes */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Especificações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-y-2">
                  {product.attributes.map((attr, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-sm text-muted-foreground">{attr.name}</span>
                      <span className="font-medium">{attr.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Product details tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="mb-6">
            <TabsTrigger value="description">Descrição</TabsTrigger>
            <TabsTrigger value="specifications">Especificações</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
              </p>
              <p>
                Aenean vel metus magna. Mauris eget lacus in ante posuere convallis. Morbi magna nulla, egestas eu ultricies in, fermentum nec dolor.
              </p>
              <h3>Características principais:</h3>
              <ul>
                <li>Processador octa-core de última geração</li>
                <li>Tela AMOLED de alta resolução</li>
                <li>Câmera tripla com estabilização óptica</li>
                <li>Bateria de longa duração</li>
                <li>Design premium com acabamento em vidro</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {product.attributes.map((attr, index) => (
                <div key={index} className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">{attr.name}</span>
                  <span className="font-medium">{attr.value}</span>
                </div>
              ))}
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Processador</span>
                <span className="font-medium">Octa-core 3.2GHz</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Bateria</span>
                <span className="font-medium">4500mAh</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Câmera traseira</span>
                <span className="font-medium">50MP + 12MP + 10MP</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Câmera frontal</span>
                <span className="font-medium">12MP</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Resistência à água</span>
                <span className="font-medium">IP68</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Dimensões</span>
                <span className="font-medium">146.3 x 70.9 x 7.6 mm</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Peso</span>
                <span className="font-medium">168g</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Garantia</span>
                <span className="font-medium">12 meses</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">Avaliações em breve</h3>
              <p className="text-muted-foreground mb-6">
                Estamos trabalhando para trazer avaliações de clientes para este produto.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
