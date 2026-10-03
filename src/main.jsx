import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import PaginaPresentes from './PaginaPresentes';
import PaginaObrigado from './PaginaObrigado';
import PaginaCategoria from './PaginaCategoria';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/presentes" element={<PaginaPresentes />} />
        <Route path="/presentes/:slug" element={<PaginaCategoria />} />
        <Route path="/presentes/obrigado" element={<PaginaObrigado />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);