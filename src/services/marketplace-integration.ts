
import { supabase } from '@/lib/supabase';
import type { MarketplaceApiConfig, MarketplaceIntegration, MarketplaceAuthResponse } from '@/types/marketplace-integration';

export async function authenticateMarketplace(
  credentials: { email: string; password: string },
  config: MarketplaceApiConfig
): Promise<MarketplaceAuthResponse> {
  try {
    // Aqui você faria a chamada real para a API do marketplace
    const response = await fetch(`${config.apiUrl}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': config.apiKey,
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Falha na autenticação com o marketplace');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    throw error;
  }
}

export async function saveMarketplaceIntegration(
  marketplaceId: number,
  authResponse: MarketplaceAuthResponse
): Promise<MarketplaceIntegration> {
  try {
    const { data: integration, error } = await supabase
      .from('marketplace_integrations')
      .insert({
        marketplace_id: marketplaceId,
        access_token: authResponse.access_token,
        refresh_token: authResponse.refresh_token,
        status: 'connected',
        expires_at: authResponse.expires_in 
          ? new Date(Date.now() + authResponse.expires_in * 1000).toISOString()
          : null,
      })
      .select()
      .single();

    if (error) throw error;
    return integration;
  } catch (error) {
    console.error('Erro ao salvar integração:', error);
    throw error;
  }
}

export async function getMarketplaceIntegrations(): Promise<MarketplaceIntegration[]> {
  try {
    const { data: integrations, error } = await supabase
      .from('marketplace_integrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return integrations || [];
  } catch (error) {
    console.error('Erro ao buscar integrações:', error);
    throw error;
  }
}

export async function disconnectMarketplaceIntegration(integrationId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('marketplace_integrations')
      .update({ status: 'disconnected' })
      .eq('id', integrationId);

    if (error) throw error;
  } catch (error) {
    console.error('Erro ao desconectar marketplace:', error);
    throw error;
  }
}
