import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import './styles/ProductoDetalle.css';

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito();
  
  const [producto, setProducto] = useState(null);
  const [talle, setTalle] = useState('');
  const [talleSeleccionado, setTalleSeleccionado] = useState(false);
  const [loading, setLoading] = useState(true);

  // Función para obtener el producto desde Shopify
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`https://tu-dominio.myshopify.com/admin/api/2023-04/products/${id}.json`, {
          headers: {
            'X-Shopify-Access-Token': 'TU_ACCESS_TOKEN',
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        if (data.product) {
          setProducto({
            id: data.product.id,
            nombre: data.product.title,
            precio: data.product.variants[0].price,
            imagen: data.product.images.length > 0 ? data.product.images[0].src : '/img/default.jpg',
            tallesDisponibles: data.product.options.length > 0 ? data.product.options[0].values : []
          });
        }
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  const handleAddToCart = () => {
    if (talle) {
      agregarAlCarrito({ ...producto, talle });
      alert(`Producto agregado al carrito: ${producto.nombre} - Talle: ${talle}`);
    }
  };

  return (
    <div className="producto-detalle">
      <img src={producto.imagen} alt={producto.nombre} />
      <h2>{producto.nombre}</h2>
      <p>Precio: ${producto.precio}</p>

      <div className="icono-plus" onClick={() => setTalleSeleccionado(!talleSeleccionado)}>
        +
      </div>

      {talleSeleccionado && (
        <div>
          <p>Selecciona el talle:</p>
          <div>
            {producto.tallesDisponibles.map((size) => (
              <button key={size} onClick={() => setTalle(size)}>
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {talle && <button onClick={handleAddToCart}>Agregar al carrito</button>}

      <button 
        onClick={() => {
          // Si el historial tiene más de 2 elementos, retrocede en el historial
          // De lo contrario, redirige a la página principal
          if (window.history.length > 2) {
            navigate(-1); 
          } else {
            navigate('/');
          }
        }}
      >
        Volver
      </button>
    </div>
  );
};

export default ProductoDetalle;

