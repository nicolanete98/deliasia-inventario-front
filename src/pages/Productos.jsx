import { useContext, useEffect, useState } from 'react'
import { Table } from '../components/Table'
import { searchProducts } from '../functions/searchProducts'
import { ProductsContext } from '../context/ProductsContext'
import { sendData } from '../functions/sendData'
import { useDispatch, useSelector } from 'react-redux'
import deliasiaAPI from '../api/deliasiaAPI'
import { login, logout } from '../store/auth/authSlice'
import { isAuth } from '../functions/isAuth'
 
export const Productos =() => { 
  const {status} = useSelector(state => state.auth)
  const dispatch =useDispatch()
  const [productoForm, setProductoForm] = useState({
    Nombre: '',  
    Categoria: '',
    Unidad: '' ,
    Merma: ''
  })
  const {dataProductos,setDataProductos,getDataProductos} = useContext(ProductsContext)
  const [filter, setFilter] = useState('')  
  
  const onInputChange =({target}) =>{
    const {value,name} = target    
    let x = 0;
    if(!isNaN(Number(value.replaceAll(',',''))) && value[value.length-1]!= '.'){
      const formateador = new Intl.NumberFormat('es-MX');
      x = formateador.format(Number(value.replaceAll(',','')));
      setProductoForm({
        ...productoForm,
        [name]: x
        })
     }
     else{
      setProductoForm({
        ...productoForm,
        [name]: String(value)
        })
    }     
} 
  const alerta =()=>{
    alert('El producto ya existe')  
  }
      
  const onSubmit = async() => { 
    await sendData(productoForm,'post-productos')
    setProductoForm({
      Nombre: '',
      Categoria: '',
      Unidad: '',
      Merma: ''
    })
    await getDataProductos()
    setFilter('') 
  }
  
  const onFilterChange =({target})=>{
    const {value} = target    
    setFilter(value)  
  }
  const returndata = searchProducts(filter,dataProductos,'nomb_producto') 
  useEffect(() => {
    getDataProductos() 
    isAuth(dispatch)
  }, [])

  const onEnter = ({key}) =>{
    if(key == 'Enter'&& !(
      productoForm.Categoria.trim().length ===0 || 
      productoForm.Nombre.trim().length ===0 || 
      productoForm.Unidad.trim().length ===0|| 
      productoForm.Merma.trim().length ===0)){ 
      onSubmit()
    }
  }
   
  return (
    <div className="App" >
      {(status)
      ?<div className='container mt-5'>
        <div className='row'>
          <div className='col-md-4' > 
            <div className='card position-relative start-50 top-50 translate-middle'>
              <h1 className='h1'>Productos</h1>
              <input 
                  className='mt-1 me-1 ms-1'
                  key = "01"
                  type = "text"
                  name = "Nombre"
                  placeholder='Nombre'
                  value = {productoForm.Nombre}
                  onChange = {onInputChange}
                  required
                  />
              <input 
                  className='mt-1 me-1 ms-1'
                  key = "02"
                  type = "text"
                  name = "Categoria"
                  placeholder='Categoria'
                  value = {productoForm.Categoria}
                  onChange = {onInputChange}
                  required
                  />    
              <input 
                  className='mt-1 me-1 ms-1'
                  key = "03"
                  type = "text"
                  name = "Unidad"
                  placeholder='Unidad'
                  value = {productoForm.Unidad}
                  onChange = {onInputChange}
                  required
                  />
              <input 
                  className='mt-1 me-1 ms-1'
                  key = "04"
                  type = "text"
                  name = "Merma"
                  placeholder='Merma'
                  value = {productoForm.Merma}
                  onChange = {onInputChange}
                  required
                  onKeyDown={onEnter}
                  />
                <button 
                  className='btn btn-primary mt-3 mb-2 me-1 ms-1' onClick={onSubmit} disabled = {productoForm.Categoria.trim().length ===0 || productoForm.Nombre.trim().length ===0 || productoForm.Unidad.trim().length ===0|| productoForm.Merma.trim().length ===0}>+ Agregar</button>
            </div>
        </div> 
        <div className='col mt-3 mt-md-1 d-none d-md-block'>
          <div className='card'>
            <input 
              key = "4"
              type = "text"
              name = "Search" 
              placeholder='Buscar ...'
              value = {filter}
              onChange = {onFilterChange}/>              
            <Table data={returndata} eliminar ={false}></Table>
          </div>
        </div>       
      </div>      
    </div>
    :<></>}
    </div>
 ) 
}