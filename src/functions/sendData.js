import swal from 'sweetalert';
import  deliasiaAPI  from '../api/deliasiaAPI';

export const sendData = async(data,extension) =>{
  const x = await deliasiaAPI.post(extension,data)
  .then((response) => {
            console.log(response)
            if (response.statusText == 'OK' ) { 
              //localStorage.setItem('token',response.data.token)
              if (extension !=='/post-login'){
                swal({
                  title: "Good job!",
                  text: "Los datos fueron guardados con exito!",
                  icon: "success",
                  button: "Ok",
                  })     
              }
              return response;
            } else {
              swal({
                title: "Fallo ingresando los datos",
                text: "Hubo un error procesando sus datos. Vuelva a intentarlo",
                icon: "error",
                button: "Ok",
                })
              throw new Error('Error en la petición');
            }
          })
          .catch(error => {
            console.error(error);
          });
          return x


}