import React from 'react';
import './styles/ProductoCard.css';

const ProductoCard = ({ producto }) => {
  return (
    <div className="producto-card">
      <img src={producto.imagen}/>
      <h2>{producto.nombre}</h2>
      <p>${producto.precio}</p>
    </div>
  );
};

export default ProductoCard;
