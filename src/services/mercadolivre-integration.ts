import { supabase } from '@/lib/supabase';
import type { MarketplaceApiConfig, MarketplaceAuthResponse } from '@/types/marketplace-integration';

export async function authenticateMercadoLivre(
  config: MarketplaceApiConfig
): Promise<MarketplaceAuthResponse> {
  try {
    // Implementação do fluxo de autorização do Mercado Livre
    const response = await fetch(`${config.apiUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${config.apiKey}:${config.apiSecret}`)}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: config.apiKey,
        client_secret: config.apiSecret,
      }),
    });

    if (!response.ok) {
      throw new Error('Falha na autenticação com o Mercado Livre');
    }

    const authData = await response.json();
    return {
      access_token: authData.access_token,
      expires_in: authData.expires_in,
      token_type: authData.token_type,
    };
  } catch (error) {
    console.error('Erro na autenticação do Mercado Livre:', error);
    throw error;
  }
}

export async function authenticateWithCode(
  code: string,
  config: MarketplaceApiConfig
): Promise<MarketplaceAuthResponse> {
  try {
    // Usar o redirectUri do config ou obter da URL atual do site publicado
    const redirectUri = config.redirectUri || `${window.location.origin}/callback/mercadolivre`;
    console.log('URL de callback sendo usada:', redirectUri);
    
    const response = await fetch(`${config.apiUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: config.apiKey,
        client_secret: config.apiSecret,
        code: code,
        redirect_uri: redirectUri
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro na resposta do ML:', errorData);
      throw new Error(`Falha na autenticação com o Mercado Livre: ${errorData.message || response.statusText}`);
    }

    const authData = await response.json();
    console.log('Resposta da autenticação:', authData);
    
    return {
      access_token: authData.access_token,
      refresh_token: authData.refresh_token,
      expires_in: authData.expires_in,
      token_type: authData.token_type,
    };
  } catch (error) {
    console.error('Erro na autenticação do Mercado Livre com código:', error);
    throw error;
  }
}

export async function fetchMercadoLivreUserInfo(accessToken: string) {
  try {
    const response = await fetch('https://api.mercadolibre.com/users/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar informações do usuário');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar informações do usuário:', error);
    throw error;
  }
}

// Função auxiliar para iniciar o fluxo de autorização OAuth
export function getAuthorizationUrl(clientId: string, redirectUri: string): string {
  const authUrl = new URL('https://auth.mercadolivre.com.br/authorization');
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
  });
  
  authUrl.search = params.toString();
  return authUrl.toString();
}
