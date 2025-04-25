
export interface MarketplaceConnection {
  id: string
  user_id: string
  marketplace_id: number
  access_token: string
  refresh_token?: string
  created_at: string
  updated_at: string
  expires_at?: string
}

export interface MarketplaceCredentials {
  email: string
  password: string
}
