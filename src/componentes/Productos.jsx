import React, { useState } from 'react';
import { useCarrito } from '../context/CarritoContext'; // Asegúrate de tener el contexto de carrito importado
import './styles/Productos.css';

const productos = [
  {
    id: 1,
    nombre: 'Buzo bsas',
    precio: 250,
    tallesDisponibles: ['S', 'M', 'L'],
    imagen: '/img/buzobsas.jpg',
  },
  {
    id: 2,
    nombre: 'T-shirt',
    precio: 300,
    tallesDisponibles: ['S', 'M', 'L', 'XL'],
    imagen: '/img/buzobsas.jpg',
  },
  {
    id: 3,
    nombre: 'bsas',
    precio: 280,
    tallesDisponibles: ['42', '43', '44'],
    imagen: '/img/buzobsas.jpg',
  },  {
    id: 4,
    nombre: 'Buzo bsas',
    precio: 250,
    tallesDisponibles: ['S', 'M', 'L'],
    imagen: '/img/buzobsas.jpg',
  },
  {
    id: 5,
    nombre: 'T-shirt',
    precio: 300,
    tallesDisponibles: ['S', 'M', 'L', 'XL'],
    imagen: '/img/buzobsas.jpg',
  },
  {
    id: 6,
    nombre: 'bsas',
    precio: 280,
    tallesDisponibles: ['42', '43', '44'],
    imagen: '/img/buzobsas.jpg',
  },  {
    id: 7,
    nombre: 'Buzo bsas',
    precio: 250,
    tallesDisponibles: ['S', 'M', 'L'],
    imagen: '/img/buzobsas.jpg',
  },
  {
    id: 8,
    nombre: 'T-shirt',
    precio: 300,
    tallesDisponibles: ['S', 'M', 'L', 'XL'],
    imagen: '/img/buzobsas.jpg',
  },
  {
    id: 9,
    nombre: 'bsas',
    precio: 280,
    tallesDisponibles: ['42', '43', '44'],
    imagen: '/img/buzobsas.jpg',
  },
];

const Productos = () => {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [talle, setTalle] = useState(''); // Inicializamos el talle vacío
  const { agregarAlCarrito } = useCarrito();

  // Esta función se activa al hacer click en el producto
  const handleZoom = (producto) => {
    // Solo activamos el zoom si no se ha seleccionado un talle
    if (!productoSeleccionado || productoSeleccionado?.id !== producto.id) {
      setProductoSeleccionado(producto);
      setTalle(''); // Reiniciamos el talle al abrir la vista
    }
  };

  // Esta función agrega el producto al carrito
  const handleAddToCart = () => {
    if (talle) {
      agregarAlCarrito({ ...productoSeleccionado, talle });
      alert(`Producto agregado al carrito: ${productoSeleccionado.nombre} - Talle: ${talle}`);
      setTalle(''); // Reiniciamos el talle después de agregar al carrito
      setProductoSeleccionado(null); // Cerramos los detalles del producto
    }
  };

  // Esta función maneja la selección del talle
  const handleSelectTalle = (size) => {
    setTalle(size); // Actualizamos el estado con el talle seleccionado
  };

  // Prevenimos que el clic en el talle cierre el zoom
  const handleTalleClick = (e) => {
    e.stopPropagation(); // Evita que el evento se propague al contenedor y cierre el zoom
    setTalle(e.target.value);
  };

  return (
    <div className={`productos-container ${productoSeleccionado ? 'zoom-activo' : ''}`}>
      {productos.map((producto) => (
        <div
          key={producto.id}
          className={`producto-card ${productoSeleccionado?.id === producto.id ? 'zoom' : ''}`}
          onClick={() => handleZoom(producto)} // Activar zoom solo si no está seleccionado
        >
          <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />
          <h3 className="h3-home">{producto.nombre}</h3>
          {productoSeleccionado?.id === producto.id && (
            <div className="producto-detalles">
              <p>Precio: ${producto.precio}</p>
              <div>
                <p>Talles disponibles:</p>
                {producto.tallesDisponibles.map((size) => (
                  <button
                    key={size}
                    value={size}
                    onClick={handleTalleClick} // Usamos onClick para seleccionar el talle
                    className={talle === size ? 'selected' : ''} // Resalta el talle seleccionado
                  >
                    {size}
                  </button>
                ))}
              </div>
              {talle && (
                <button onClick={handleAddToCart}>Agregar al carrito</button> // El botón solo aparece si hay un talle seleccionado
              )}
              <button onClick={() => setProductoSeleccionado(null)}>Cerrar</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Productos;
