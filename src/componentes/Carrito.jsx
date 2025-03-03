import React from 'react';
import { useCarrito } from '../context/CarritoContext';
import { loadStripe } from '@stripe/stripe-js';
import './styles/Carrito.css';

const stripePromise = loadStripe('tu_clave_publica_de_stripe');

const Carrito = () => {
  const { carrito, incrementarCantidad, disminuirCantidad, calcularTotal } = useCarrito();

  const handleFinalizarCompra = async () => {
    const stripe = await stripePromise;

    try {
      const response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carrito }),
      });

      const data = await response.json();
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error('Error al procesar el pago:', error);
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
              <p>Talle: {producto.medida}</p>
              <p>Precio unitario: ${producto.precio}</p>
            </div>
            <div className="carrito-cantidad">
              <button className="cantidad-btn" onClick={() => disminuirCantidad(producto.id)} disabled={producto.cantidad <= 1}>
                -
              </button>
              <span>{producto.cantidad}</span>
              <button className="cantidad-btn" onClick={() => incrementarCantidad(producto.id)}>
                +
              </button>
              <p>Total: ${producto.precio * producto.cantidad || 0}</p>
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


