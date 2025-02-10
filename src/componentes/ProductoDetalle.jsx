// src/componentes/ProductoDetalle.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import './styles/ProductoDetalle.css';

// Lista de productos (simulación de una base de datos)
const productos = [
  {
    id: 1,
    nombre: 'Buzo bsas',
    precio: 250,
    imagen: '/img/buzobsas.jpg',
    tallesDisponibles: ['S', 'M', 'L'],
  },
  {
    id: 2,
    nombre: 'T-shirt',
    precio: 300,
    imagen: '/img/buzobsas.jpg',
    tallesDisponibles: ['S', 'M', 'L'],
  },
  {
    id: 3,
    nombre: 'bsas',
    precio: 280,
    imagen: '/img/buzobsas.jpg',
    tallesDisponibles: ['42', '43', '44'],
  },
];

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito();

  // Buscar el producto en la lista según el ID de la URL
  const producto = productos.find((p) => p.id === parseInt(id));

  const [talle, setTalle] = useState('');
  const [talleSeleccionado, setTalleSeleccionado] = useState(false);

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  const handleAddToCart = () => {
    if (talle) {
      agregarAlCarrito({ ...producto, talle });
      alert(`Producto agregado al carrito: ${producto.nombre} - Talle: ${talle}`);
    }
  };

  const handleSelectTalle = (size) => {
    setTalle(size);
    setTalleSeleccionado(true);
  };

  return (
    <div className="producto-detalle">
      <img src={producto.imagen} alt={producto.nombre} />
      <h2>{producto.nombre}</h2>
      <p>Precio: ${producto.precio}</p> {/* Muestra el precio */}
      <div className="icono-plus" onClick={() => setTalleSeleccionado(!talleSeleccionado)}>
        +
      </div>
      {talleSeleccionado && (
        <div>
          <p>Selecciona el talle:</p>
          <div>
            {producto.tallesDisponibles.map((size) => (
              <button key={size} onClick={() => handleSelectTalle(size)}>
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
      {talle && <button onClick={handleAddToCart}>Agregar al carrito</button>}
      <button onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
};

export default ProductoDetalle;
