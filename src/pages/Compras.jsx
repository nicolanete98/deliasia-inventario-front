import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Table } from '../components/Table'
import { ProductsContext } from '../context/ProductsContext'
import { isAuth } from '../functions/isAuth'
import { searchProducts } from '../functions/searchProducts'
import { sendData } from '../functions/sendData'
import { getEnvVariables } from '../helpers/getEnvvariable'
export const Compras = () => {
  const env = getEnvVariables()
    const tiendas = ['Makro','Olimpica','PriceSmart','CountryPlast','Alkosto','Exito','Carulla','13 de Mayo','Best Choice', 'Atlantic', 'Carnes Santa Cruz']
    const {dataProductos,getDataProductos} = useContext(ProductsContext)
    const [dataCompras, setDataCompras] = useState([])
    const dispatch = useDispatch()
    const [ComprasForm, setComprasForm] = useState({
        Nombre: '',
        Cantidad: '',
        Tienda: '',
        Unidad: '--',
        Precio: ''
    })
    const onInputChange =({target}) =>{
        const {value,name} = target    
        if(name == 'Nombre'){
            const x = dataProductos.filter(_data => _data['nomb_producto'].toString().includes(value))
            setComprasForm({
                ...ComprasForm,
                Nombre: x[0].nomb_producto,
                Unidad: x[0].unidad,
                })

        }else{
          let x = 0;
          if(!isNaN(Number(value.replaceAll(',',''))) && value[value.length-1]!= '.'){
            const formateador = new Intl.NumberFormat('es-MX');
            x = formateador.format(Number(value.replaceAll(',','')));
            setComprasForm({
              ...ComprasForm,
              [name]: x
              })
           }
           else{
            setComprasForm({
              ...ComprasForm,
              [name]: String(value)
              })
          }
        }
    }
    const onSubmit = async() =>{
        await sendData(ComprasForm,'/post-compras')
        setComprasForm({
            Nombre: '',
            Cantidad: '',
            Tienda: '',
            Unidad: '--',
            Precio: ''  
        })
        await getDataProductos()
        console.log(ComprasForm)
        await getCompras()
        //setFilterNombrePlato('')
    }
    const getCompras = async()=>{
        const resp = await fetch(env.VITE_APP_API_URL + '/get-compras')
        const data1 = await resp.json() 
        setDataCompras([...data1])
    }
    useEffect(() => {
      getCompras()     
      isAuth(dispatch)
    }, [])



    
    const onEnter = ({key}) =>{
      if(
        key == 'Enter' && 
        !(
          ComprasForm.Nombre.trim().length == 0 ||
          ComprasForm.Cantidad.trim().length == 0 ||
          ComprasForm.Tienda.trim().length == 0 ||
          ComprasForm.Unidad.trim().length == 0 ||
          ComprasForm.Precio.trim().length == 0
        )){ 
        onSubmit()
        console.log('fun')
      }
    }


  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-4'>
          <div className='card position-relative start-50 top-50 translate-middle'>    
            <h1 className='h1'>Compras</h1>    
            <select className=" mt-1 me-1 ms-1" aria-label="Default select example" value= {ComprasForm.Nombre} name='Nombre' onChange={onInputChange}>
            <option  value="">Selecciona el producto</option>
            {dataProductos.map((element,index) =>
              <option 
                key={index} 
                value={element.nomb_producto}>{element.nomb_producto}
              </option>
              )}
            </select>        

            <select className=" mt-1 me-1 ms-1" aria-label="Default select example" value= {ComprasForm.Tienda} name='Tienda' onChange={onInputChange}>
            <option  value="">Selecciona el proveedor</option>
            {tiendas.map((element,index) =>
              <option 
                key={index} 
                value={element}>{element}
              </option>
              )}
            </select>
            <div className='row'>
                <div className='col pe-0'>
                    <input 
                    className='w-100 mt-1 me-1 ms-1 '
                    key = "02"
                    type = "text"
                    name = "Cantidad"
                    placeholder='Cantidad'
                    value={ComprasForm.Cantidad}
                    onChange={onInputChange}
                    />
                </div>
                <div className='col-2 text-center ps-0 mt-1'>
                    {ComprasForm.Unidad}
                </div>

            </div>
            <input 
              className='mt-1 me-1 ms-1'
              key = "03"
              type = "text"
              name = "Precio"
              placeholder='Precio'
              value={ComprasForm.Precio}
              onChange={onInputChange}
              onKeyDown = {onEnter}
              />
            <button 
              className='btn btn-primary mt-3 mb-2 me-1 ms-1' 
              onClick={onSubmit}
              disabled = {
                ComprasForm.Nombre.trim().length == 0 ||
                ComprasForm.Cantidad.trim().length == 0 ||
                ComprasForm.Tienda.trim().length == 0 ||
                ComprasForm.Unidad.trim().length == 0 ||
                ComprasForm.Precio.trim().length == 0
              }>Agregar + </button>
          </div>
        </div>
        <div className='col d-none d-md-block'>
          <div className='card'>
            <Table data={dataCompras} eliminar ={false} ></Table>
          </div>
        </div>
    </div>
    </div>
  )
}
