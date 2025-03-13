import React, { useState, useEffect } from 'react';
import { useCarrito } from '../context/CarritoContext';
import './styles/Productos.css';
import fetchShopifyData from '../api/shopifyApi';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [talle, setTalle] = useState('');
  const [zoomNivel, setZoomNivel] = useState(0); // 0 = sin zoom, 1 = zoom inicial, 2 = zoom completo
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    const getProductos = async () => {
      const query = `{
        products(first: 250) {
          edges {
            node {
              id
              title
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    priceV2 {
                      amount
                      currencyCode
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }`;

      try {
        const data = await fetchShopifyData(query);
        console.log('Datos de Shopify:', data);
        setProductos(data.data.products.edges);
      } catch (error) {
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    getProductos();
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  const handleProductoClick = (producto) => {
    if (zoomNivel === 2) {
      setZoomNivel(0);
      setProductoSeleccionado(null);
    } else if (zoomNivel === 1) {
      setZoomNivel(2);
    } else {
      setZoomNivel(1);
      setProductoSeleccionado(producto);
    }
  };

  return (
    <div className={`productos-container ${productoSeleccionado && zoomNivel === 1 ? 'zoom-activo' : ''}`}>
      {productos.map((producto) => {
        const tallesDisponibles = producto.node.variants.edges
          .map((variant) => variant.node.selectedOptions.find(opt => opt.name === 'Size')?.value)
          .filter((value, index, self) => value && self.indexOf(value) === index);

        const isProductoSeleccionado = productoSeleccionado?.id === producto.node.id;
        const esZoom = isProductoSeleccionado && zoomNivel === 1;

        return (
          <div
            key={producto.node.id}
            className={`producto-card ${esZoom ? 'zoom' : ''}`}
            onClick={() => handleProductoClick(producto.node)} // Aquí se maneja el clic para aplicar el zoom
          >
            <img
              src={producto.node.images.edges[0]?.node.url || 'placeholder.jpg'}
              alt={producto.node.title}
              className={`producto-imagen ${zoomNivel === 1 ? 'zoom-activo-imagen' : ''}`}
            />
            <h3 className="h3-home">{producto.node.title}</h3>

            {esZoom && (
              <div className="producto-detalles">
                <p>Precio: ${producto.node.variants.edges[0].node.priceV2.amount} {producto.node.variants.edges[0].node.priceV2.currencyCode}</p>

                {tallesDisponibles.length > 0 ? (
                  <div>
                    <p>Talles disponibles:</p>
                    {tallesDisponibles.map((size) => (
                      <button
                        key={size}
                        value={size}
                        onClick={(e) => {
                          e.stopPropagation();
                          setTalle(e.target.value);
                        }}
                        className={talle === size ? 'selected' : ''}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p>No hay talles disponibles</p>
                )}

                {talle && (
                  <button
                    onClick={() => {
                      const varianteSeleccionada = producto.node.variants.edges.find(variant =>
                        variant.node.selectedOptions.some(opt => opt.name === 'Size' && opt.value === talle)
                      );

                      if (varianteSeleccionada) {
                        agregarAlCarrito({
                          id: varianteSeleccionada.node.id,
                          name: producto.node.title,
                          imagen: producto.node.images.edges[0]?.node.url,
                          precio: varianteSeleccionada.node.priceV2.amount,
                          talle,
                          cantidad: 1
                        });
                      } else {
                        console.error('No se encontró una variante para el talle seleccionado');
                      }
                    }}
                  >
                    Agregar al carrito
                  </button>
                )}
                <button onClick={() => setProductoSeleccionado(null)}>Cerrar</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Productos;
