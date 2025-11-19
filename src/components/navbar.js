import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: 10, backgroundColor: '#4CAF50', color: 'white' }}>
      <Link to="/" style={{ marginRight: 10, color: 'white', textDecoration: 'none' }}>Proyecto</Link>
      <Link to="/sector" style={{ marginRight: 10, color: 'white', textDecoration: 'none' }}>Sector</Link>
      <Link to="/vivienda" style={{ marginRight: 10, color: 'white', textDecoration: 'none' }}>Vivienda</Link>
      <Link to="/fotos" style={{ color: 'white', textDecoration: 'none' }}>Fotos</Link>
    </nav>
  );
}