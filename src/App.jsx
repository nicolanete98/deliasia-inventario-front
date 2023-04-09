import { useContext, useEffect, useState } from 'react'
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
import { ProductsContext } from './context/ProductsContext'
import { useDispatch, useSelector } from 'react-redux'
import deliasiaAPI from './api/deliasiaAPI'
import { login, logout } from './store/auth/authSlice'
import { Loading } from './pages/Loading'

function App() {
  
  const dispatch = useDispatch()
  
  const isAuth = async() => {
    const resp = await deliasiaAPI.post(
      '/checkJWT',
      {token: localStorage.getItem('token')}
      ).then(({data})=>{
          if(!data.auth){
            console.log('entras')
            dispatch(logout())
          }else{
            dispatch(login({token:localStorage.getItem('token')}))
          }
        })
        .catch(({message}) => {
          console.log(message)
          dispatch(logout())
        }

        )

  }
  const {status} = useSelector(state => state.auth)
  useEffect(() => {
    isAuth()
  }, [])
  

  return (
    
    <BrowserRouter>
      { (status =='Authenticated')
        ? <Navbar />
        :<></>
      }
      <Routes>
        { (status == 'Checking')
            ? <Route path='/*' element={<Loading/>} />
            :(status == 'Not-authenticated') 
              ?<Route path='/*' element={<Login/>} /> 
              :<>
                <Route path='/' element= {<Movimientos/>} />  
                <Route path='/Movimientos' element= {<Movimientos/>} />
                <Route path='/Productos' element= {<Productos/>} />
                <Route path='/Recetas' element= {<Recetas/>} />
                <Route path='/PrecioVenta' element= {<PrecioVenta/>} />
                <Route path='/Compras' element= {<Compras/>} />
                <Route path='/Ventas' element= {<Ventas/>} />
              </>
      }
      </Routes>
  </BrowserRouter>
  ) 
}

export default App
