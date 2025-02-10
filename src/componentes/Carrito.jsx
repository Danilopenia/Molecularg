import React from 'react';
import { useCarrito } from '../context/CarritoContext';
import './styles/Carrito.css';

const Carrito = () => {
  const { carrito, incrementarCantidad, disminuirCantidad, calcularTotal } = useCarrito();

  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        carrito.map((producto) => (
          <div key={producto.id} className="carrito-card">
            {/* Imagen del producto */}
            <img src={producto.imagen} alt={producto.name} className="carrito-img" />

            {/* Columna con información */}
            <div className="carrito-info">
              <h3>{producto.name}</h3>
              <p>Talle: {producto.medida}</p>
              <p>Precio unitario: ${producto.precio}</p>
            </div>

            {/* Columna con cantidad y precio total */}
            <div className="carrito-cantidad">
              <button
                className="cantidad-btn"
                onClick={() => disminuirCantidad(producto.id)}
                disabled={producto.cantidad <= 1} // Deshabilitar el botón de restar si la cantidad es 1
              >
                -
              </button>
              <span>{producto.cantidad}</span>
              <button
                className="cantidad-btn"
                onClick={() => incrementarCantidad(producto.id)}
              >
                +
              </button>
              <p>Total: ${producto.precio * producto.cantidad || 0}</p> {/* Aseguramos que no aparezca NaN */}
            </div>
          </div>
        ))
      )}
      {carrito.length > 0 && (
        <div className="total">
          <h3>Total: ${calcularTotal() || 0}</h3> {/* Aseguramos que no aparezca NaN */}
          <button className="finalizar-btn">Finalizar Compra</button>
        </div>
      )}
    </div>
  );
};

export default Carrito;

