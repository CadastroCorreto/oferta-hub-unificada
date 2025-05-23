
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
      
      // Use hardcoded Client ID to ensure it works
      const mlClientId = '8588307915989482';
      
      // Prepare redirect URI properly
      const mlRedirectUri = redirectUri || `${window.location.origin}/callback/mercadolivre`;
      
      console.log('Client ID:', mlClientId);
      console.log('Redirect URI:', mlRedirectUri);
      console.log('Origin:', window.location.origin);
      
      // Save the URI for later use during callback
      localStorage.setItem('ml_redirect_uri', mlRedirectUri);
      
      // Create a test link first to verify if we can connect
      const testUrl = 'https://www.mercadolivre.com.br';
      
      // Try to fetch the test URL first to check connectivity
      fetch(testUrl, { mode: 'no-cors' })
        .then(() => {
          console.log('Conexão com Mercado Livre OK, prosseguindo com autenticação');
          const authUrl = getAuthorizationUrl(mlClientId, mlRedirectUri);
          console.log('URL de autenticação gerada:', authUrl);
          
          // Redirect to auth URL
          window.location.href = authUrl;
        })
        .catch((error) => {
          console.error('Erro de conectividade com Mercado Livre:', error);
          toast({
            variant: "destructive",
            title: "Erro de conectividade",
            description: "Não foi possível conectar ao Mercado Livre. Verifique sua conexão e tente novamente.",
          });
          setIsLoading(false);
        });
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
      
      <div className="mt-4 text-xs text-gray-400">
        <p>Se você encontrar problemas de conexão, tente:</p>
        <ul className="list-disc pl-5 mt-1">
          <li>Verificar se você tem cookies de terceiros habilitados</li>
          <li>Usar um navegador diferente</li>
          <li>Desativar extensões de bloqueio</li>
        </ul>
      </div>
    </div>
  );
}
