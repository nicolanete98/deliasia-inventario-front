import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import deliasiaAPI from '../api/deliasiaAPI'
import { ProductsContext } from '../context/ProductsContext'
import { sendData } from '../functions/sendData'
import { login } from '../store/auth/authSlice'

export const Login = () => {
  const [loginData, setLoginData] = useState({
    User: '',
    Password: '',
    Email: 'nicolanete98@gmail.com'
  })
  const {setAuth} = useContext(ProductsContext)
  const {status} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  
  const onInputChange =({target}) =>{
    const {value,name} = target   
    setLoginData({
        ...loginData,
        [name]: value
        })        
  }

  const onSubmit = async() =>{
   deliasiaAPI.post('/post-login',loginData)
   .then(({data}) => {
      if(data.auth) {
        dispatch(login(data));
        localStorage.setItem('token',data.token)
      }
   }).catch((({message}) => {
        swal({
              title: "Fallo ingresando los datos",
              text: "Hubo un error procesando sus datos. Vuelva a intentarlo",
              icon: "error",
              button: "Ok",
            })
   }))
   setLoginData({
      User: '',
      Password: ''
    })
  }

  const onEnter = ({key}) =>{
    if(key == 'Enter'){ 
      onSubmit()
    }
  }
  
  return (
    <div className='container mt-5'>
        <div className='card card-login position-absolute top-50 start-50 translate-middle lign-items-end' style={{maxHeight: 400, minHeight: 400,minWidth:300}}>
          <div className='card-header'>
            <div className='text-center'><img width="150" src="/ORIGINAL.png" alt="" /> </div>
            <h4 className='text-center'>Inventario</h4>
          </div>
          <div className='card-body py-0 pt-5'>
            <div className='row w-100 m-0'>
            <input key='00' className='mt-2' type="text" name = 'User'placeholder='Username' value = {loginData.User} onChange = {onInputChange}/>
            </div>
            <div className='row w-100 m-0 '>
            <input key='01'className='mt-3' type="password" name="Password" placeholder='Password' value = {loginData.Password} onChange = {onInputChange} onKeyDown={onEnter}/>
            </div>            
          </div>
          <button  className='btn btn-primary mb-5 mx-2' onClick={onSubmit}> Login </button>          
        </div>
    </div>

  )
}
