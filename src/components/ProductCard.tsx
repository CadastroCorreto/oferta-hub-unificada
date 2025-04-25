
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  marketplace: string;
  marketplaceLogo: string;
  rating?: number;
  hasFreeShipping?: boolean;
}

export function ProductCard({
  id,
  title,
  image,
  price,
  originalPrice,
  marketplace,
  marketplaceLogo,
  rating,
  hasFreeShipping = false,
}: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link to={`/product/${id}`}>
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain p-4"
          />
          {discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-marketplace-red">
              -{discount}%
            </Badge>
          )}
          {hasFreeShipping && (
            <Badge variant="outline" className="absolute top-2 right-2 bg-background">
              Frete grátis
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="pt-4">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={marketplaceLogo}
            alt={marketplace}
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="text-xs text-muted-foreground">{marketplace}</span>
        </div>
        <Link to={`/product/${id}`} className="hover:underline">
          <h3 className="font-medium line-clamp-2 mb-2 min-h-[40px]">{title}</h3>
        </Link>
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">
              R$ {price.toFixed(2).replace('.', ',')}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                R$ {originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
          {rating && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
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
              <span>{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full">Ver oferta</Button>
      </CardFooter>
    </Card>
  );
}
