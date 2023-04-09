import { ProductsContext } from './ProductsContext'
import { useEffect, useState } from 'react'
import React from 'react'
import { getEnvVariables } from '../helpers/getEnvvariable'

export const ProductProvider = ({ children }) => {
  const env = getEnvVariables()
  const [dataProductos, setDataProductos] = useState([])
  const [recetasData, setRecetasData] = useState([]) 
  const [auth, setAuth] = useState(false)

  const getDataProductos = async() =>{
    const resp = await fetch(env.VITE_APP_API_URL + '/get-productos')
    const data1 = await resp.json()
    setDataProductos([...data1])
  } 

  const  getDataRecetas = async() =>{
    const resp = await fetch(env.VITE_APP_API_URL + '/get-recetas') 
    const data1 = await resp.json()
    setRecetasData([...data1])
  }
  useEffect(() => {
    getDataProductos()
    getDataRecetas()
  }, [])
  

  return (
    <ProductsContext.Provider value = {{dataProductos,setDataProductos,recetasData, setRecetasData,getDataProductos,setAuth,auth}}>
        { children }
    </ProductsContext.Provider>
  )
}
