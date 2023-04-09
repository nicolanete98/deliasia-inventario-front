import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Table } from '../components/Table'
import { ProductsContext } from '../context/ProductsContext'
import { isAuth } from '../functions/isAuth'
import { sendData } from '../functions/sendData'
import { getEnvVariables } from '../helpers/getEnvvariable'
export const Ventas = () => {
  const env = getEnvVariables()
    const dispatch = useDispatch()
    const Local = ['Principal','Caiman','Parque','Productos']
    const {dataProductos,recetasData,getDataProductos} = useContext(ProductsContext)
    const [dataVentas, setDataVentas] = useState([])
    const [nombrePlato, setNombrePlato] = useState([])
    const [ventasForm, setVentasForm] = useState({
        Nombre: '',
        Cantidad: '',
        Local: ''
    })
    const onInputChange =({target}) =>{
      const {value,name} = target    
      let x = 0;
      if(!isNaN(Number(value.replaceAll(',',''))) && value[value.length-1]!= '.'){
        const formateador = new Intl.NumberFormat('es-MX');
        x = formateador.format(Number(value.replaceAll(',','')));
        setVentasForm({
          ...ventasForm,
          [name]: x
          })
       }
       else{
        setVentasForm({
          ...ventasForm,
          [name]: String(value)
          })
      }     
  }
    const getNombrePlato = ()=>{
        let array = []
        for(let i = 0; recetasData.length>i; i++){
            array.push(recetasData[i].nomb_plato)
        }
        const data1 =[... new Set(array)]
        setNombrePlato([...data1])
    }
    const onSubmit = async() =>{
        await sendData(ventasForm,'post-ventas')
        setVentasForm({
            Nombre: '',
            Cantidad: '',
            Local: ''
        })
        
        await getVentas()
        await getDataProductos()
        //setFilterNombrePlato('')
    }
    const getVentas = async()=>{
        const resp = await fetch(env.VITE_APP_API_URL + '/get-ventas')
        const data1 = await resp.json() 
        setDataVentas([...data1])
    }
    useEffect(() => {
      getVentas()     
      isAuth(dispatch)
    }, [])
    useEffect(() => {
        getNombrePlato()
      
      }, [recetasData])
      const onEnter = ({key}) =>{
        if(
            key == 'Enter' &&
            !(ventasForm.Cantidad.length ===0 || 
              ventasForm.Local.trim().length ===0 ||
              ventasForm.Nombre.trim().length ===0
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
            <h1 className='h1'>Ventas</h1>    
            <select className=" mt-1 me-1 ms-1" aria-label="Default select example" value= {ventasForm.Nombre} name='Nombre' onChange={onInputChange}>
            <option  value="">Selecciona el Plato</option>
            {nombrePlato.map((element,index) =>
              <option 
                key={index} 
                value={element}>{element}
              </option>
              )}
            </select>        

            <select className=" mt-1 me-1 ms-1" aria-label="Default select example" value= {ventasForm.Local} name='Local' onChange={onInputChange}>
            <option  value="">Selecciona el Local</option>
            {Local.map((element,index) =>
              <option 
                key={index} 
                value={element}>{element}
              </option>
              )}
            </select>
            <input 
                className='mt-1 me-1 ms-1 '
                key = "02"
                type = "text"
                name = "Cantidad"
                placeholder='Cantidad'
                value={ventasForm.Cantidad}
                onChange={onInputChange}
                onKeyDown ={onEnter}
                />
            <button 
              className='btn btn-primary mt-3 mb-2 me-1 ms-1' 
              onClick={onSubmit}
              disabled = {
                ventasForm.Cantidad.length ===0 || 
                ventasForm.Local.trim().length ===0 ||
                ventasForm.Nombre.trim().length ===0
              }
                >Agregar + </button>
          </div>
        </div>
        <div className='col d-none d-md-block'>
          <div className='card'>
            <Table data={dataVentas} eliminar ={false} ></Table>
          </div>
        </div>
    </div>
    </div>
  )
}
