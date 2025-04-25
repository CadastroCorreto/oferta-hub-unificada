
import { supabase } from '@/lib/supabase'
import type { MarketplaceConnection, MarketplaceCredentials } from '@/types/marketplace'

export async function connectMarketplace(
  marketplaceId: number, 
  credentials: MarketplaceCredentials
): Promise<MarketplaceConnection> {
  try {
    // Simula uma chamada à API do marketplace para obter o token
    const mockToken = btoa(`${credentials.email}:${marketplaceId}`)
    
    const { data: connection, error } = await supabase
      .from('marketplace_connections')
      .insert({
        marketplace_id: marketplaceId,
        access_token: mockToken,
        // O user_id será automaticamente preenchido pela RLS do Supabase
      })
      .select()
      .single()

    if (error) throw error

    return connection
  } catch (error) {
    console.error('Erro ao conectar marketplace:', error)
    throw error
  }
}

export async function disconnectMarketplace(marketplaceId: number): Promise<void> {
  try {
    const { error } = await supabase
      .from('marketplace_connections')
      .delete()
      .match({ marketplace_id: marketplaceId })

    if (error) throw error
  } catch (error) {
    console.error('Erro ao desconectar marketplace:', error)
    throw error
  }
}

export async function getConnectedMarketplaces(): Promise<MarketplaceConnection[]> {
  try {
    const { data: connections, error } = await supabase
      .from('marketplace_connections')
      .select('*')

    if (error) throw error

    return connections || []
  } catch (error) {
    console.error('Erro ao buscar marketplaces conectados:', error)
    throw error
  }
}
