
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
      
      // Usar este Client ID que está cadastrado na app do Mercado Livre
      const mlClientId = '8588307915989482';
      
      // Preparar corretamente o redirect URI - a URL completa é importante e deve estar registrada no app do ML
      const mlRedirectUri = redirectUri || `${window.location.origin}/callback/mercadolivre`;
      
      console.log('Client ID:', mlClientId);
      console.log('Redirect URI:', mlRedirectUri);
      
      // Garantir que o redirectUri está corretamente formatado
      const encodedRedirectUri = encodeURIComponent(mlRedirectUri);
      console.log('Redirect URI (encoded):', encodedRedirectUri);

      // Salvar o URI de redirecionamento no localStorage para uso posterior
      localStorage.setItem('ml_redirect_uri', mlRedirectUri);
      
      const authUrl = getAuthorizationUrl(mlClientId, mlRedirectUri);
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
        Após a autorização ou criação da conta, você retornará automaticamente para o aplicativo.
      </p>
    </div>
  );
}
