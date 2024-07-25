import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/auth';
import { Toaster } from 'react-hot-toast';
import 'antd/dist/reset.css'
import { SearchProvider } from './Context/Search';
import { CartProvider } from './Context/cart';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <BrowserRouter>

            <App />
          </BrowserRouter>
        </CartProvider>
        <Toaster />
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>,

);

reportWebVitals();
