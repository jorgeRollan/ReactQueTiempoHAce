import axios from 'axios';

const FetchCiudades = async (url, method, header, handleFunction) => {
    try {
        const response = await axios({
            url: url,
            method: method,
            header: header,
            withCredentials: true
        });
        if (response.status === 200) {
            handleFunction(response.data);
        }
        else throw new Error(`Error en la obtencion url ${response.data.cod}`);
    }
    catch (error) {
        if (error.status === 406) {
            window.alert("El usuario no tiene ciudades favoritas guardadas");
        }
        else
            window.alert(error.message);
    }
};

export default FetchCiudades;