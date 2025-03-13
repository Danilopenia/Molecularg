// server.js
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

// Cargar las variables de entorno desde un archivo .env
dotenv.config();

// Inicialización de Express
const app = express();
app.use(express.json());
app.use(cors()); // Permitir solicitudes desde el frontend (puedes ajustar esto según tus necesidades)

// Puerto donde escuchará el servidor
const PORT = process.env.PORT || 500;

// Variables de entorno para las credenciales de Shopify
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_PASSWORD = process.env.SHOPIFY_API_PASSWORD;
const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL;

// Endpoint para obtener el carrito (simulado)
app.get('/api/carrito', async (req, res) => {
  try {
    // Este endpoint debería devolver los productos del carrito. Aquí simulamos una respuesta.
    // Conéctate a Shopify para obtener los datos reales si es necesario.
    const carritoSimulado = [
      {
        id: 123,
        product_title: 'Producto de prueba',
        price: 1000, // En centavos
        quantity: 2,
        image: 'https://via.placeholder.com/150',
        variant_options: [{ name: 'size', value: 'M' }],
      },
      // Agrega más productos según lo que recibas de Shopify
    ];

    res.json({ items: carritoSimulado });
  } catch (error) {
    console.error('Error obteniendo el carrito:', error);
    res.status(500).json({ error: 'Hubo un error al obtener el carrito.' });
  }
});

// Endpoint para agregar productos al carrito y generar el checkout
app.post('/api/carrito/agregar', async (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ error: 'La estructura de los datos es incorrecta.' });
  }

  try {
    // Construir el objeto de línea de productos para Shopify
    const line_items = items.map(item => ({
      variant_id: item.id,
      quantity: item.cantidad,
      properties: { size: item.talle || 'No disponible' },
    }));

    // Crear el checkout usando la API de Shopify
    const response = await axios.post(
      `https://${SHOPIFY_STORE_URL}/admin/api/2023-01/checkouts.json`,
      {
        checkout: {
          line_items,
        },
      },
      {
        headers: {
          'X-Shopify-Storefront-Access-Token': SHOPIFY_API_PASSWORD,
          'Content-Type': 'application/json',
        },
      }
    );

    // Obtener la URL de checkout y enviarla al frontend
    const checkoutUrl = response.data.checkout.web_url;
    res.json({ checkoutUrl });
  } catch (error) {
    console.error('Error creando el checkout:', error);
    res.status(500).json({ error: 'Hubo un problema al procesar el checkout.' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
