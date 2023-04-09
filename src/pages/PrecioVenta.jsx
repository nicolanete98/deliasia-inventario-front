import React from 'react'
import { useState,useEffect,useContext } from 'react'
import { useDispatch } from 'react-redux'
import { Table } from '../components/Table'
import { ProductsContext } from '../context/ProductsContext'
import { isAuth } from '../functions/isAuth'
import { searchProducts } from '../functions/searchProducts'
import { sendData } from '../functions/sendData'
import { getEnvVariables } from '../helpers/getEnvvariable'
export const PrecioVenta = () => {
  const env = getEnvVariables()
  const dispatch = useDispatch()
    const {data,recetasData} = useContext(ProductsContext)
    const [preciosForm, setPreciosForm] = useState({
        Nombre: '',
        Precio: ''
    })
    const [filterNombrePlato, setFilterNombrePlato] = useState('')
    const [nombrePlato, setNombrePlato] = useState([])
    const [precioData, setPrecioData] = useState([])
 
    const getNombrePlato = ()=>{
        let array = []
        for(let i = 0; recetasData.length>i; i++){
            array.push(recetasData[i].nomb_plato)
        }
        const data1 =[... new Set(array)]
        setNombrePlato([...data1])
    }
    const getPrecioVenta = async()=>{
        const resp = await fetch(env.VITE_APP_API_URL + '/get-precio')
        const data1 = await resp.json() 
        setPrecioData([...data1])
        console.log(data1)
    }

    const onInputChange =({target}) =>{
      const {value,name} = target    
      let x = 0;
      if(!isNaN(Number(value.replaceAll(',',''))) && value[value.length-1]!= '.'){
        const formateador = new Intl.NumberFormat('es-MX');
        x = formateador.format(Number(value.replaceAll(',','')));
        setPreciosForm({
          ...preciosForm,
          [name]: x
          })
       }
       else{
        setPreciosForm({
          ...preciosForm,
          [name]: String(value)
          })
      }     
    }

    const onSubmit = async() =>{
        await sendData(preciosForm,'/post-precios')
        setPreciosForm({
            Nombre: '',
            Precio: ''  
        })
        await getPrecioVenta()
        setFilterNombrePlato('')
    }
    const onFilterChange =({target})=>{
        const {value} = target    
        setFilterNombrePlato(value) 
      }
    const returndata = searchProducts(filterNombrePlato,precioData,'nomb_plato')

    useEffect(() => {
        getPrecioVenta()
        getNombrePlato()
        isAuth(dispatch)
      
      }, [])
      useEffect(() => {
        getNombrePlato()
      
      }, [recetasData])

    const onEnter = ({key}) =>{
      if(
        key == 'Enter' && 
        (preciosForm.Nombre.trim().length != 0 &&
          preciosForm.Precio.trim().length != 0)){ 
        onSubmit()
        console.log('fun')
      }
    }
  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-4'>
          <div className='card position-relative start-50 top-50 translate-middle'>    
            <h1 className='h1'>Precios de venta</h1>    
            <select className=" mt-1 me-1 ms-1" aria-label="Default select example" value= {preciosForm.Nombre} name='Nombre' onChange={onInputChange}>
            <option  value="">Selecciona el plato</option>
            {nombrePlato.map((element,index) =>
              <option 
                key={index} 
                value={element}>{element}
              </option>
              )}
            </select>        

            <input 
              className='mt-1 me-1 ms-1'
              key = "01"
              type = "text"
              name = "Precio"
              placeholder='Precio'
              value={preciosForm.Precio}
              onChange={onInputChange}
              onKeyDown={onEnter}
              
              />
            <button 
              className='btn btn-primary mt-3 mb-2 me-1 ms-1' 
              onClick={onSubmit}
              disabled = {
                preciosForm.Nombre.trim().length == 0||
                preciosForm.Precio.trim().length == 0
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
              value = {filterNombrePlato}
              onChange = {onFilterChange}/>  
            <Table data={returndata} eliminar ={false} ></Table>
          </div>
        </div>
      </div>     
    </div>
  )
}
