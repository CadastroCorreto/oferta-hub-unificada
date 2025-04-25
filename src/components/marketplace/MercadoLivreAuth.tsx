
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
      
      // Garantir que temos um client ID válido
      if (!clientId || clientId === 'SUA_APP_ID' || clientId === 'APP_ID_MERCADO_LIVRE') {
        toast({
          variant: "destructive",
          title: "Erro de configuração",
          description: "ID do aplicativo do Mercado Livre não configurado corretamente.",
        });
        console.error("Client ID inválido:", clientId);
        setIsLoading(false);
        return;
      }

      const finalRedirectUri = redirectUri || `${window.location.origin}/callback/mercadolivre`;
      console.log("Redirecionando para:", finalRedirectUri);

      const authUrl = getAuthorizationUrl(clientId, finalRedirectUri);
      console.log('URL de autenticação completa:', authUrl);
      
      // Usar uma pequena delay antes de redirecionar
      setTimeout(() => {
        window.location.href = authUrl;
      }, 100);
    } catch (error) {
      console.error("Erro ao iniciar autenticação:", error);
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
