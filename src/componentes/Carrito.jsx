import React, { useEffect, useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import './styles/Carrito.css';

const Carrito = () => {
  const { carrito, incrementarCantidad, disminuirCantidad, calcularTotal, actualizarCarrito } = useCarrito();
  const [carritoShopify, setCarritoShopify] = useState([]);

  // Fetch carrito desde el backend (que se comunica con Shopify)
  useEffect(() => {
    const fetchCarritoDesdeBackend = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/carrito');
        const data = await response.json();

        if (!data.items || !Array.isArray(data.items)) {
          throw new Error("La respuesta del backend no tiene la estructura esperada.");
        }

        const carritoDesdeShopify = data.items.map((producto) => ({
          id: producto.id,
          name: producto.product_title,
          talle: producto.variant_options?.find(option => option.name.toLowerCase() === 'size')?.value || producto.variant_title || producto.option1 || "No disponible",
          precio: parseFloat(producto.price) / 100,
          cantidad: producto.quantity,
          imagen: producto.image,
        }));

        setCarritoShopify(carritoDesdeShopify);
        actualizarCarrito(carritoDesdeShopify); // Actualiza el carrito global si es necesario
      } catch (error) {
        console.error("Error obteniendo el carrito desde el backend:", error);
        alert("Hubo un error al obtener los productos del carrito. Intenta nuevamente.");
      }
    };

    fetchCarritoDesdeBackend();
  }, [actualizarCarrito]);

  const handleFinalizarCompra = async () => {
    if (carritoShopify.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    try {
      // Formateo de productos para enviarlos a Shopify
      const productosFormateados = carritoShopify.map((producto) => ({
        id: producto.id,
        name: producto.name,
        cantidad: producto.cantidad,
        precio: parseFloat(producto.precio),
        talle: producto.talle,
      }));

      const response = await fetch('http://localhost:5001/api/carrito/agregar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: productosFormateados }),
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        // Si Shopify devuelve una URL válida para el checkout, redirigimos
        window.location.href = data.checkoutUrl; 
      } else {
        alert("Error al generar el checkout, por favor intente nuevamente.");
        console.error('Error: No se recibió una URL de checkout');
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert("Hubo un problema al procesar tu compra. Intenta nuevamente más tarde.");
    }
  };

  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        carrito.map((producto) => (
          <div key={producto.id} className="carrito-card">
            <img src={producto.imagen} alt={producto.name} className="carrito-img" />
            <div className="carrito-info">
              <h3>{producto.name}</h3>
              <p>Talle: {producto.talle || 'No disponible'}</p>
              <p>Precio unitario: ${parseFloat(producto.precio) || 0}</p>
            </div>
            <div className="carrito-cantidad">
              <button className="cantidad-btn" onClick={() => disminuirCantidad(producto.id)} disabled={producto.cantidad <= 1}>
                -
              </button>
              <span>{producto.cantidad}</span>
              <button className="cantidad-btn" onClick={() => incrementarCantidad(producto.id)}>
                +
              </button>
              <p>Total: ${parseFloat(producto.precio) * producto.cantidad || 0}</p>
            </div>
          </div>
        ))
      )}
      {carrito.length > 0 && (
        <div className="total">
          <h3>Total: ${calcularTotal() || 0}</h3>
          <button className="finalizar-btn" onClick={handleFinalizarCompra}>
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
};

export default Carrito;
