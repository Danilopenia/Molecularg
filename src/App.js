import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext'; // Asegúrate de importar correctamente el CarritoProvider
import Navbar from './componentes/Navbar';
import Productos from './componentes/Productos';
import ProductoDetalle from './componentes/ProductoDetalle';
import Carrito from './componentes/Carrito';
import CarritoIcon from './componentes/CarritoIcon';
import About from './componentes/About';
import Contact from './componentes/Contact';

import './App.css';

const App = () => {
  return (
    <CarritoProvider>
      <Router>
        <div>
          <header>
            <h1>Molecularg</h1>
          </header>
          <Navbar />
          <CarritoIcon />
          <Routes>
            <Route path="/" element={<Productos />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </CarritoProvider>
  );
};

export default App;

