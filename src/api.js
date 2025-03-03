import axios from 'axios';

const API_URL = 'https://api.tiendanuve.com/v1/products'; // URL de la API Tiendanube

// Función para obtener productos de Tiendanube
export const fetchProducts = async (accessToken) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Usa el token de acceso para autenticar la solicitud
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
};
