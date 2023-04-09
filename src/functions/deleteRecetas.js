import { getEnvVariables } from '../helpers/getEnvvariable'
const env = getEnvVariables()
export const deleteRecetas = async(data) => {
    await fetch(env.VITE_APP_API_URL + '/post-delete-recetas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          throw new Error('Error en la petición');
        }
      })
      .then(data => {
        console.log(data);
        return data;
      })
      .catch(error => {
        console.error(error);
      });
  }