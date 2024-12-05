import axios from "axios";

async function saveCityToFavorites(url, method, header, { nameCity, nameLongCity }, handleChange) {
    try {
        const response = await axios({
            url: url,
            method: method,
            headers: header,
            data: {
                nameCity: nameCity,
                nameLongCity: nameLongCity
            },
            withCredentials: true
        });
        handleChange(response.data);
    } catch (error) {
        window.alert("error al guardar la ciudad en la base de datos la ciudad ya se encuentra en la lista del usuario o hay error de conexion");
    }
}

export default saveCityToFavorites;