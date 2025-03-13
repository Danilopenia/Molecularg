const fetchShopifyData = async (query) => {
  const url = 'https://typpg2-1a.myshopify.com/api/2024-01/graphql.json';

  const token = process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN;

  if (!token) {
    throw new Error('API Key (Access Token) is missing in the environment variables');
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error('Error de la API: ', data.errors);
      throw new Error('Error al cargar los productos');
    }

    console.log('Productos cargados: ', data);
    return data;
  } catch (error) {
    console.error('Error de fetch: ', error);
    throw new Error('Error al cargar los productos');
  }
};

// ✅ Aquí defines la consulta para obtener los productos correctamente
export const fetchProductsQuery = `
  {
    products(first: 10) {
      edges {
        node {
          id
          title
          description
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export default fetchShopifyData;

