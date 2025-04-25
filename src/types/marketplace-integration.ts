
export type MarketplaceApiConfig = {
  apiKey: string;
  apiSecret?: string;
  apiUrl: string;
  marketplace_id: number;
};

export type MarketplaceAuthResponse = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
};

export type MarketplaceIntegrationStatus = 'connected' | 'disconnected' | 'error';

export interface MarketplaceIntegration {
  id: string;
  user_id: string;
  marketplace_id: number;
  status: MarketplaceIntegrationStatus;
  access_token: string;
  refresh_token?: string;
  expires_at?: string;
  created_at: string;
  last_sync?: string;
  settings?: Record<string, any>;
}
