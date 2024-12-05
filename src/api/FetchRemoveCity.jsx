import axios from "axios";

async function removeCityToFavorites(url, method, header, formdata, handleChange) {
    try {
        const response = await axios({
            url: url,
            method: method,
            headers: header,
            data: formdata,
            withCredentials: true
        });
        handleChange(response.data);
    } catch (error) {
        window.alert("Error al borrar la ciudad en la base de datos");
    }
}

export default removeCityToFavorites;