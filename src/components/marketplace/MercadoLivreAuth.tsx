
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { getAuthorizationUrl } from '@/services/mercadolivre-integration';
import { toast } from '@/hooks/use-toast';

interface MercadoLivreAuthProps {
  clientId: string;
  redirectUri?: string;
}

export function MercadoLivreAuth({ clientId, redirectUri }: MercadoLivreAuthProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = () => {
    try {
      setIsLoading(true);
      console.log('Iniciando autenticação com Mercado Livre...');
      console.log('Client ID recebido:', clientId);
      
      // Usando o Client ID correto que você mostrou na imagem
      const mlClientId = '8588307915989482';
      
      const finalRedirectUri = redirectUri || `${window.location.origin}/callback/mercadolivre`;
      console.log('Redirect URI:', finalRedirectUri);

      const authUrl = getAuthorizationUrl(mlClientId, finalRedirectUri);
      console.log('URL de autenticação gerada:', authUrl);
      
      window.location.href = authUrl;
    } catch (error) {
      console.error('Erro ao iniciar autenticação:', error);
      toast({
        variant: "destructive",
        title: "Erro de autenticação",
        description: "Não foi possível iniciar o processo de autenticação com o Mercado Livre.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-gray-600 mb-2">
        Para conectar sua conta do Mercado Livre, clique no botão abaixo:
      </p>
      
      <Button 
        onClick={handleAuth}
        className="bg-yellow-400 hover:bg-yellow-500 text-black flex items-center gap-2"
        disabled={isLoading}
      >
        <LogIn size={16} />
        {isLoading ? "Conectando..." : "Conectar ao Mercado Livre"}
      </Button>
      
      <p className="text-xs text-gray-500 mt-2 text-center max-w-md">
        Você será redirecionado para o site do Mercado Livre para autorizar o acesso.
        Após a autorização, você retornará automaticamente para o aplicativo.
      </p>
    </div>
  );
}
