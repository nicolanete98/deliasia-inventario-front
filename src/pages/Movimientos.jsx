import React, { useEffect, useState } from 'react'
import { Table } from '../components/Table'
import { sendData } from '../functions/sendData'
import swal from 'sweetalert';
import deliasiaAPI from '../api/deliasiaAPI';
import { isAuth } from '../functions/isAuth';
import { useDispatch } from 'react-redux';
import { getEnvVariables } from '../helpers/getEnvvariable'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
export const Movimientos = () => {
  const env = getEnvVariables()
  const dispatch = useDispatch()
  const locales = ['Parque alegra', 'Caiman del rio', 'Principal']
    const [movimientoForm, setMovimientoForm] = useState({
        Movimiento: '',
        Fecha: new Date(),
        Tipo: '',
        Monto: '',
        Local: '',
        Descripcion: ''
    })
    const [movimientoData, setMovimientoData] = useState([])
    const movimiento = ['Egreso', 'Ingreso']
    const tipo =['Efectivo', 'Tarjeta','Transferencias']

    const onInputChange =({target}) =>{
        const {value,name} = target    
        let x = 0;
        if(!isNaN(Number(value.replaceAll(',',''))) && value[value.length-1]!= '.'){
          const formateador = new Intl.NumberFormat('es-MX');
          x = formateador.format(Number(value.replaceAll(',','')));
          setMovimientoForm({
            ...movimientoForm,
            [name]: x
            })
         }
         else{
          setMovimientoForm({
            ...movimientoForm,
            [name]: String(value)
            })
        }     
    }

    const onSubmit = async() =>{
        await sendData(movimientoForm,'post-movimiento')

        setMovimientoForm({
          Movimiento: '',
          Fecha: new Date(),
          Tipo: '',
          Monto: '',
          Local: '',
          Descripcion: ''
        })
        await getMovimientoData()
    }
    const getMovimientoData = async()=>{
        const {data} = await deliasiaAPI.get(env.VITE_APP_API_URL + '/get-movimiento')
        setMovimientoData([...data])
    }

    useEffect(() => {
        getMovimientoData()     
        isAuth(dispatch)
      }, [])
    const onEnter = ({key}) =>{
      if(
        key == 'Enter' && 
        !(
          movimientoForm.Movimiento.trim().length == 0||
          movimientoForm.Tipo.trim().length == 0||
          movimientoForm.Monto.trim().length == 0||
          movimientoForm.Descripcion.trim().length == 0||
          movimientoForm.Fecha.trim().length == 0||
          movimientoForm.Local.trim().length == 0
        )){ 
        onSubmit()
        console.log('fun')
      }
    }
    

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-4'>
          <div className='card px-4 pt-4 pb-5position-relative start-50 top-50 translate-middle'>    
            <h1 className='h1 text-center'>Movimientos</h1>  
            <input type="date" 
              className='fs-4 mt-1 w-100'
              key = "00"
              name = "Fecha"
              placeholderText='Ingrese fecha'
              value={movimientoForm.Fecha}
              onChange={onInputChange}/>  
            <select className="fs-4 mt-2 me-1 ms-1" aria-label="Default select example" value= {movimientoForm.Movimiento} name='Movimiento' onChange={onInputChange}>
            <option  value="">Selecciona el movimiento</option>
            {movimiento.map((element,index) =>
              <option 
                key={index} 
                value={element}>{element}
              </option>
              )}
            </select>        

            <select className="fs-4 mt-1 me-1 ms-1" aria-label="Default select example" value= {movimientoForm.Tipo} name='Tipo' onChange={onInputChange}>
            <option  value="">Selecciona el tipo</option>
            {tipo.map((element,index) =>
              <option 
                key={index} 
                value={element}>{element}
              </option>
              )}
            </select>
            <select className="fs-4 mt-1 me-1 ms-1" aria-label="Default select example" value= {movimientoForm.Local} name='Local' onChange={onInputChange}>
            <option  value="">Selecciona el Local </option>
            {locales.map((element,index) =>
              <option 
                key={index} 
                value={element}>{element}
              </option>
              )}
            </select>
            <input 
                className='fs-4 mt-1 me-1 ms-1 '
                key = "02"
                type = "text"
                name = "Monto"
                placeholder='Monto'
                value={movimientoForm.Monto}
                onChange={onInputChange}
                />
            <input 
                className='fs-4 mt-1 me-1 ms-1 '
                key = "03"
                type = "text"
                name = "Descripcion"
                placeholder='Descripcion'
                value={movimientoForm.Descripcion}
                onChange={onInputChange}
                onKeyDown={onEnter}
                />
            <button 
              className='btn btn-primary mt-3 mb-2 me-1 ms-1' 
              onClick={onSubmit}
              disabled = {
                movimientoForm.Movimiento.trim().length == 0||
                movimientoForm.Tipo.trim().length == 0||
                movimientoForm.Monto.trim().length == 0||
                movimientoForm.Descripcion.trim().length == 0||
                movimientoForm.Fecha.trim().length == 0||
                movimientoForm.Local.trim().length == 0
              }>Agregar + </button>
          </div>
        </div>
        <div className='col d-none d-md-block'>
          <div className='card'>
            <Table data={movimientoData} eliminar ={false} ></Table>
          </div>
        </div>
    </div>
    </div>
  )
}
