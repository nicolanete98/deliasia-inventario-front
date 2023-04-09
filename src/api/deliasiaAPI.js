import axios from 'axios'
import { getEnvVariables } from '../helpers/getEnvvariable'
const env = getEnvVariables()
const deliasiaAPI =axios.create({
    baseURL:env.VITE_APP_API_URL
})
deliasiaAPI.interceptors.request.use( config => {
    try{
        config.headers={
            ...config.headers,
            'x-token': localStorage.getItem('token')
        }
        return config;
    }
    catch{
        console.log('error');
        config.headers={
            ...config.headers,
            'x-token': ''
        }
        return config;
    }
   
}
)
export default deliasiaAPI;