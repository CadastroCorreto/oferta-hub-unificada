
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
    // Usar o redirectUri do config ou recuperar do localStorage
    const redirectUri = config.redirectUri || localStorage.getItem('ml_redirect_uri') || `${window.location.origin}/callback/mercadolivre`;
    console.log('URL de callback sendo usada:', redirectUri);
    
    // Verificar se o redirectUri é válido
    if (!redirectUri.startsWith('http')) {
      throw new Error('URI de redirecionamento inválido: ' + redirectUri);
    }
    
    console.log('Realizando autenticação com código:', code);
    console.log('Configuração:', {
      apiKey: config.apiKey,
      apiSecret: config.apiSecret ? '*****' : 'Não definido', // Não logar a chave secreta inteira
      redirectUri: redirectUri
    });
    
    const response = await fetch(`${config.apiUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: config.apiKey,
        client_secret: config.apiSecret || '',
        code: code,
        redirect_uri: redirectUri
      }),
    });

    const responseText = await response.text();
    console.log('Resposta bruta:', responseText);
    
    let authData;
    try {
      authData = JSON.parse(responseText);
    } catch (e) {
      console.error('Erro ao parsear resposta JSON:', e);
      throw new Error('Resposta inválida do servidor');
    }

    if (!response.ok) {
      console.error('Erro na resposta do ML:', authData);
      throw new Error(`Falha na autenticação com o Mercado Livre: ${authData.message || response.statusText}`);
    }

    console.log('Resposta da autenticação:', authData);
    
    // Limpar o URI de redirecionamento do localStorage após o uso
    localStorage.removeItem('ml_redirect_uri');
    
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

export function getAuthorizationUrl(clientId: string, redirectUri?: string): string {
  const finalRedirectUri = redirectUri || `${window.location.origin}/callback/mercadolivre`;
  
  if (!finalRedirectUri.startsWith('http')) {
    console.error('RedirectURI inválido:', finalRedirectUri);
    throw new Error('URL de redirecionamento inválida');
  }
  
  console.log('Gerando URL de autorização...');
  console.log('Client ID:', clientId);
  console.log('Redirect URI:', finalRedirectUri);
  
  // Usando o domínio principal do Mercado Livre ao invés do subdomínio auth
  // Isso pode resolver problemas de DNS em alguns casos
  const authUrl = new URL('https://www.mercadolibre.com/jms/mlb/lgz/login');
  const params = new URLSearchParams({
    platform_id: 'ml',
    go: '/authorization',
    response_type: 'code',
    client_id: clientId,
    redirect_uri: finalRedirectUri
  });
  
  authUrl.search = params.toString();
  const fullUrl = authUrl.toString();
  
  console.log('URL de autorização completa:', fullUrl);
  return fullUrl;
}
