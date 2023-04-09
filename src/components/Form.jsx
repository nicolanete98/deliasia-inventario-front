import { element } from 'prop-types'
import React from 'react'
import { sendData } from '../functions/sendProductos'
export const Form = ({title, data,setData}) => {
    const onInputChange = ({target})=>{
        const [name,value] = target 
        setData({
            ...data,
            [name] : value
        })
    }

    return (
        <div className='card'>
            <h1>{title}</h1>
            <input 
                key = ""
                type = "text"
                name = ""
                 />
            <button onClick={()=>sendData(variables)}>+ Agregar</button>
        </div>
    )
}
