import React from 'react';
import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/CarritoIcon.css';

const CarritoIcon = () => {
  const { carrito } = useCarrito();

  return (
    <div className="carrito-icon">
      <Link to="/carrito">
        <i className="bi bi-cart-fill"></i> {/* Ícono de carrito negro */}
        {carrito.length > 0 && <span className="contador">{carrito.length}</span>}
      </Link>
    </div>
  );
};

export default CarritoIcon;
