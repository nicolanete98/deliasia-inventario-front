import React from 'react'
import ReactDOM from 'react-dom/client'
import {Productos} from './pages/Productos' 
import Recetas  from './pages/Recetas'
import './index.css'
import { ProductProvider } from './context/ProductProvider'
import { PrecioVenta } from './pages/PrecioVenta'
import { Compras } from './pages/Compras'
import { Ventas } from './pages/Ventas'
import { Movimientos } from './pages/Movimientos'
import { Navbar } from './components/Navbar'
import { Login } from './pages/Login'
import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ProductProvider>
      <App/> 
    </ProductProvider>
  </Provider>
  
    

  
)
