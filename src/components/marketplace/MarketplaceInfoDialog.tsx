
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface MarketplaceInfoDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  marketplace?: {
    name: string;
    id: number;
  };
  onConnectClick: () => void;
}

export function MarketplaceInfoDialog({
  isOpen,
  onOpenChange,
  marketplace,
  onConnectClick,
}: MarketplaceInfoDialogProps) {
  if (!marketplace) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações sobre {marketplace.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p>Mesmo sem conectar sua conta, você ainda pode ver ofertas do {marketplace.name} em nossa plataforma.</p>
          
          <div className="space-y-2">
            <h4 className="font-medium">Benefícios de conectar:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Acompanhamento de pedidos</li>
              <li>Recomendações personalizadas</li>
              <li>Alertas de preço para produtos do seu interesse</li>
              <li>Uso de cupons e promoções exclusivas</li>
            </ul>
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Ver ofertas sem conectar
            </Button>
            
            <Button
              className="flex-1"
              onClick={() => {
                onOpenChange(false);
                onConnectClick();
              }}
            >
              Conectar conta
            </Button>
          </div>
          
          <div className="pt-2 flex justify-center">
            <a 
              href={`https://${marketplace.name.toLowerCase().replace(/\s+/g, '')}.com.br`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary flex items-center gap-1 hover:underline"
            >
              Visitar site oficial <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
