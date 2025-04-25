import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { authenticateMercadoLivre } from '@/services/mercadolivre-integration';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

export function MercadoLivreCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    const processAuth = async () => {
      if (error) {
        setStatus('error');
        setErrorMessage('Acesso negado ou autenticação cancelada.');
        toast({
          variant: 'destructive',
          title: 'Erro de autenticação',
          description: 'A autenticação com o Mercado Livre falhou.',
        });
        return;
      }

      if (!code) {
        setStatus('error');
        setErrorMessage('Código de autorização não encontrado.');
        return;
      }

      try {
        const config = {
          apiUrl: 'https://api.mercadolibre.com',
          apiKey: 'SUA_APP_ID',
          apiSecret: 'SUA_SECRET_KEY',
          marketplace_id: 1,
        };
        
        const authResponse = await authenticateMercadoLivre(config);
        console.log('Autenticação bem sucedida:', authResponse);
        
        setStatus('success');
        toast({
          title: 'Conta conectada!',
          description: 'Sua conta do Mercado Livre foi conectada com sucesso.',
        });

        setTimeout(() => {
          navigate('/marketplaces');
        }, 3000);
      } catch (error) {
        console.error('Erro na autenticação:', error);
        setStatus('error');
        setErrorMessage('Ocorreu um erro ao processar a autenticação.');
        toast({
          variant: 'destructive',
          title: 'Erro de autenticação',
          description: 'Não foi possível autenticar com o Mercado Livre.',
        });
      }
    };

    processAuth();
  }, [searchParams, navigate, toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Autenticação do Mercado Livre</h1>
        
        {status === 'loading' && (
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p>Processando autenticação...</p>
          </div>
        )}
        
        {status === 'success' && (
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <p>Autenticação concluída com sucesso!</p>
            <p className="text-sm text-gray-500">Você será redirecionado em instantes...</p>
          </div>
        )}
        
        {status === 'error' && (
          <div className="flex flex-col items-center space-y-4">
            <XCircle className="h-12 w-12 text-red-500" />
            <p>Erro na autenticação</p>
            <p className="text-sm text-red-500">{errorMessage}</p>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => navigate('/marketplaces')}
            >
              <ArrowLeft size={16} />
              Voltar para Marketplaces
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
