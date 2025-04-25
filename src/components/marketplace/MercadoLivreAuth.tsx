
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

interface MercadoLivreAuthProps {
  clientId: string;
  redirectUri?: string;
}

export function MercadoLivreAuth({ clientId, redirectUri }: MercadoLivreAuthProps) {
  const handleAuth = () => {
    // Usar o redirectUri passado ou construir um com base na URL atual do site
    const finalRedirectUri = redirectUri || `${window.location.origin}/callback/mercadolivre`;
    
    // Construir a URL de autorização do Mercado Livre
    const authUrl = new URL('https://auth.mercadolivre.com.br/authorization');
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: finalRedirectUri,
    });
    
    // Adicionar os parâmetros à URL e redirecionar
    authUrl.search = params.toString();
    console.log('URL de autenticação:', authUrl.toString());
    console.log('Redirect URI:', finalRedirectUri);
    window.location.href = authUrl.toString();
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
