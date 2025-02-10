import React from 'react';
import { Link } from 'react-router-dom';
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
    nombre: 't-shirt',
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
  },
  {
    id: 4,
    nombre: 'Buzo bsas',
    precio: 250,
    tallesDisponibles: ['S', 'M', 'L'],
    imagen: '/img/buzobsas.jpg',
  },
  {
    id: 5,
    nombre: 't-shirt',
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
  },{
    id: 7,
    nombre: 'Buzo bsas',
    precio: 250,
    tallesDisponibles: ['S', 'M', 'L'],
    imagen: '/img/buzobsas.jpg',
  },
  {
    id: 8,
    nombre: 't-shirt',
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
  return (
    <div className="productos-container">
      {productos.map((producto) => (
        <div key={producto.id} className="producto-card">
          <Link to={`/producto/${producto.id}`}>
            <img src={producto.imagen} alt={producto.nombre} className="producto-imagen"/>
          </Link>
          <h3 className='h3-home'>{producto.nombre}</h3>
          {/* Se ha eliminado la línea que mostraba el precio */}
        </div>
      ))}
    </div>
  );
};


export default Productos;


