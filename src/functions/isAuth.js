import deliasiaAPI from "../api/deliasiaAPI"
import { login, logout } from "../store/auth/authSlice"

export const isAuth = async(dispatch) => {
    
    const resp = await deliasiaAPI.post(
      '/checkJWT',
      {token: localStorage.getItem('token')}
      ).then(({data})=>{
          if(!data.auth){
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