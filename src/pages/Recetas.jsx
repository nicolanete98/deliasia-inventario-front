import { element } from 'prop-types'
import React, { useContext,useState,useEffect } from 'react'
import { Table } from '../components/Table'
import { ProductsContext } from '../context/ProductsContext'
import { searchProducts } from '../functions/searchProducts'
import { deleteRecetas } from '../functions/deleteRecetas'
import { sendData } from '../functions/sendData'
import { isAuth } from '../functions/isAuth'
import { useDispatch } from 'react-redux'
import { getEnvVariables } from '../helpers/getEnvvariable'

const Recetas = () => {
  const env = getEnvVariables()
  const dispatch = useDispatch()
  const {dataProductos,recetasData,setRecetasData,getDataProductos} = useContext(ProductsContext)
  const [unidadValue, setUnidadValue] = useState('')
  const [filterRecetas, setFilterRecetas] = useState('')
  const [payload, setPayload] = useState({
    Nombre:'',
    Categoria:'',
    Producto:'',
    Cantidad:'',
    Unidad:'' 

  })
  useEffect(() => {
    setPayload({
      ...payload,
      Unidad:unidadValue,
    })
  
  }, [unidadValue])
  

  const handleSelect = ({target})=>{
    const {value,name} = target
    setUnidadValue((dataProductos.filter(element => element.nomb_producto == value))[0].unidad)    
    setPayload({
      ...payload,
      [name]: value
    })
  } 

  const onInputChange =({target}) =>{
    const {value,name} = target    
    let x = 0;
    if(!isNaN(Number(value.replaceAll(',',''))) && value[value.length-1]!= '.'){
      const formateador = new Intl.NumberFormat('es-MX');
      x = formateador.format(Number(value.replaceAll(',','')));
      setPayload({
        ...payload,
        [name]: x
        })
     }
     else{
      setPayload({
        ...payload,
        [name]: String(value)
        })
    }     
  }

  const onSubmit = async() =>{
    console.log(payload)
    await sendData(payload,'/post-recetas')
    setPayload({
      Nombre:'',
      Categoria:'',
      Producto:'',
      Cantidad:'',
      Unidad:''
  
    })  
    await getRecetasData()
    setFilterRecetas('')
  }
  useEffect(() => {
    getRecetasData()
    getDataProductos()
    isAuth(dispatch)
  
  }, [])
  const onFilterChange =({target})=>{
    const {value} = target    
    setFilterRecetas(value) 
  }

  const onDelete = async(index) =>{
    console.log(returndata[index])
    await deleteRecetas(returndata[index])
    await getRecetasData()
  }
  const getRecetasData =async()=>{
    const resp = await fetch(env.VITE_APP_API_URL + '/get-recetas')
    const data1 = await resp.json()
    console.log(data1)
    setRecetasData([...data1])
  }
  const returndata = searchProducts(filterRecetas,recetasData,'nomb_plato')
  const onEnter = ({key}) =>{
    if(
      key == 'Enter'&&
      !(payload.Nombre.trim().length == 0||
        payload.Categoria.trim().length == 0||
        payload.Producto.trim().length == 0||
        payload.Cantidad.trim().length == 0||
        payload.Unidad.trim().length == 0
      )
    ){ 
      onSubmit()
    }
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-4'>
          <div className='card position-relative start-50 top-50 translate-middle'>    
            <h1 className='h1'>Recetas</h1>    
            <input 
              className='mt-1 me-1 ms-1'
              key = "00"
              type = "text"
              name = "Nombre"
              value={payload.Nombre}
              placeholder='Nombre del plato'
              onChange={onInputChange}
              />
            <select className=" mt-1 me-1 ms-1" aria-label="Default select example" value= {payload.Categoria} name='Categoria' onChange={onInputChange}>
              <option  value="" >Selecciona la categoria</option>
              <option key="Bebidas" value="Bebidas">Bebidas</option>
              <option key="Pastas" value="Pastas">Pastas</option>
              <option key="Arroz" value="Arroz">Arroz</option>
              <option key="Sopas" value="Sopas">Sopas</option>
              <option key="Entradas" value="Entradas">Entradas</option>
              <option key="Sushi" value="Sushi">Sushi</option>
              <option key="Congelados" value="Congelados">Congelados</option>
            </select>
            <select className=" mt-1 me-1 ms-1" aria-label="Default select example" value= {payload.Producto} name='Producto' onChange={handleSelect}>
            <option  value="">Selecciona el Producto</option>
            {dataProductos.map(element =>
              <option 
                key={element.nomb_producto} 
                value={element.nomb_producto}>{element.nomb_producto}
              </option>
              )}
            </select>        

            <input 
              className='mt-1 me-1 ms-1'
              key = "01"
              type = "text"
              name = "Cantidad"
              placeholder='Cantidad'
              value={payload.Cantidad}
              onChange={onInputChange}
              onKeyDown = {onEnter}
              />
            <input 
              className='mt-1 me-1 ms-1'
              key = "02"
              type = "text"
              name = "Unidad"
              placeholder='Unidad'
              value = {payload.Unidad}
              disabled
              />
            <button 
              className='btn btn-primary mt-3 mb-2 me-1 ms-1' 
              onClick={onSubmit}
              disabled= {
                payload.Nombre.trim().length == 0||
                payload.Categoria.trim().length == 0||
                payload.Producto.trim().length == 0||
                payload.Cantidad.trim().length == 0||
                payload.Unidad.trim().length == 0
                }>Agregar + </button>
          </div>
        </div>
        <div className='col d-none d-md-block'>
          <div className='card'>
          <input 
              key = "4"
              type = "text"
              name = "Search"
              placeholder='Buscar ...'
              value = {filterRecetas}
              onChange = {onFilterChange}/>  
            <Table data={returndata} eliminar ={true} _function = {onDelete}></Table>
          </div>
        </div>
      </div>     
    </div>
  )
}

export default Recetas