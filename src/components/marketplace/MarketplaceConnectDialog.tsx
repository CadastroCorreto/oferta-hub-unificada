
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MarketplaceConnectDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  marketplace?: {
    name: string;
  };
  credentials: {
    email: string;
    password: string;
  };
  onCredentialsChange: (field: "email" | "password", value: string) => void;
  onConnect: () => void;
}

export function MarketplaceConnectDialog({
  isOpen,
  onOpenChange,
  marketplace,
  credentials,
  onCredentialsChange,
  onConnect,
}: MarketplaceConnectDialogProps) {
  if (!marketplace) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Conectar {marketplace.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email ou usuário</Label>
            <Input
              id="email"
              type="text"
              value={credentials.email}
              onChange={(e) => onCredentialsChange("email", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) => onCredentialsChange("password", e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={onConnect}>
            Conectar conta
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
