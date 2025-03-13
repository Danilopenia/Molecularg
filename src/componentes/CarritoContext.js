import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => {
  return useContext(CarritoContext);
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const actualizarCarrito = (nuevosProductos) => {
    setCarrito(nuevosProductos);
  };

  const agregarProducto = (producto) => {
    setCarrito((prevCarrito) => [...prevCarrito, producto]);
  };

  const eliminarProducto = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter(producto => producto.id !== id));
  };

  const incrementarCantidad = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map(producto =>
        producto.id === id ? { ...producto, cantidad: producto.cantidad + 1 } : producto
      )
    );
  };

  const disminuirCantidad = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map(producto =>
        producto.id === id && producto.cantidad > 1 ? { ...producto, cantidad: producto.cantidad - 1 } : producto
      )
    );
  };

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        actualizarCarrito,
        agregarProducto,
        eliminarProducto,
        incrementarCantidad,
        disminuirCantidad,
        calcularTotal
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
