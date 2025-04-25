
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { getAuthorizationUrl } from '@/services/mercadolivre-integration';

interface MercadoLivreAuthProps {
  clientId: string;
  redirectUri?: string;
}

export function MercadoLivreAuth({ clientId, redirectUri }: MercadoLivreAuthProps) {
  const handleAuth = () => {
    const authUrl = getAuthorizationUrl(clientId, redirectUri);
    console.log('URL de autenticação:', authUrl);
    window.location.href = authUrl;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-gray-600 mb-2">
        Para conectar sua conta do Mercado Livre, clique no botão abaixo:
      </p>
      
      <Button 
        onClick={handleAuth}
        className="bg-yellow-400 hover:bg-yellow-500 text-black flex items-center gap-2"
      >
        <LogIn size={16} />
        Conectar ao Mercado Livre
      </Button>
      
      <p className="text-xs text-gray-500 mt-2 text-center max-w-md">
        Você será redirecionado para o site do Mercado Livre para autorizar o acesso.
        Após a autorização, você retornará automaticamente para o aplicativo.
      </p>
    </div>
  );
}
