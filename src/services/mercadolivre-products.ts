
import type { MarketplaceApiConfig } from '@/types/marketplace-integration';

export interface MercadoLivreProduct {
  id: string;
  title: string;
  price: number;
  available_quantity: number;
  sold_quantity: number;
  thumbnail: string;
  permalink: string;
  condition: string;
  listing_type_id: string;
  status: string;
}

export async function listMercadoLivreProducts(accessToken: string): Promise<MercadoLivreProduct[]> {
  try {
    // Primeiro, buscar o ID do usuário autenticado
    const userResponse = await fetch('https://api.mercadolibre.com/users/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error('Falha ao buscar informações do usuário');
    }

    const userData = await userResponse.json();
    const userId = userData.id;

    // Agora buscar os produtos do usuário
    const productsResponse = await fetch(
      `https://api.mercadolibre.com/users/${userId}/items/search`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (!productsResponse.ok) {
      throw new Error('Falha ao buscar produtos');
    }

    const searchData = await productsResponse.json();

    // Buscar detalhes de cada produto
    const productDetails = await Promise.all(
      searchData.results.map(async (productId: string) => {
        const detailResponse = await fetch(
          `https://api.mercadolibre.com/items/${productId}`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );
        if (!detailResponse.ok) {
          console.error(`Falha ao buscar detalhes do produto ${productId}`);
          return null;
        }
        return detailResponse.json();
      })
    );

    // Filtrar produtos nulos (que falharam ao buscar) e retornar
    return productDetails.filter((product): product is MercadoLivreProduct => product !== null);
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    throw error;
  }
}

export async function createMercadoLivreProduct(
  accessToken: string,
  productData: {
    title: string;
    category_id: string;
    price: number;
    currency_id: string;
    available_quantity: number;
    buying_mode: string;
    condition: string;
    listing_type_id: string;
    description: string;
    pictures: { source: string }[];
  }
) {
  try {
    const response = await fetch('https://api.mercadolibre.com/items', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Falha ao criar produto: ${errorData.message}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw error;
  }
}
