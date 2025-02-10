import React, { createContext, useState, useContext } from 'react';

// Crear un contexto para el carrito
const CarritoContext = createContext();

// Proveedor del contexto
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    // Verificamos si el producto ya existe en el carrito
    const productoExistente = carrito.find((item) => item.id === producto.id);
    
    if (productoExistente) {
      // Si el producto ya existe, incrementamos la cantidad
      setCarrito((prevCarrito) =>
        prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 } // Incrementamos la cantidad
            : item
        )
      );
    } else {
      // Si el producto no existe, lo agregamos con cantidad 1
      setCarrito((prevCarrito) => [...prevCarrito, { ...producto, cantidad: 1 }]);
    }
  };

  // Función para incrementar la cantidad de un producto
  const incrementarCantidad = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((producto) =>
        producto.id === id ? { ...producto, cantidad: producto.cantidad + 1 } : producto
      )
    );
  };

  // Función para disminuir la cantidad de un producto (mínimo 1)
  const disminuirCantidad = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((producto) =>
        producto.id === id && producto.cantidad > 1
          ? { ...producto, cantidad: producto.cantidad - 1 }
          : producto
      )
    );
  };

  // Calcular el total del carrito
  const calcularTotal = () => {
    return carrito.reduce((total, producto) => {
      // Verificamos que el precio y la cantidad existan antes de calcular el total
      if (producto.precio && producto.cantidad) {
        return total + producto.precio * producto.cantidad;
      }
      return total;
    }, 0);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        incrementarCantidad,
        disminuirCantidad,
        calcularTotal
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

// Hook para acceder al carrito
export const useCarrito = () => useContext(CarritoContext);
