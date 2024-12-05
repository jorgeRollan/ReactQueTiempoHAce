import { useContext, useEffect } from "react";
import { MainPanelContext } from "../context/Contexts";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import FetchInsertCity from "../api/FetchInsertCity";

const SaveFavCity = () => {
    const appUrl = import.meta.env.VITE_APP_URL;
    const [nameCity, setNameCity] = useState(null);
    const [nameLongCity, setNameLongCity] = useState(null);
    const { selectCities, setSelectCities, weatherData } = useContext(MainPanelContext);


    const saveCity = () => {
        if (weatherData) {
            setNameCity(weatherData.name);
            setNameLongCity(weatherData.name);
        }
    }

    useEffect(() => {
        if (nameCity && nameLongCity) {
            if(selectCities){
            const isCityAlreadySaved = selectCities.some(city => city.nameLongCity === nameLongCity);

            if (isCityAlreadySaved) {
                window.alert("La ciudad ya está en tus favoritas.");
                return;
            }
        }
            FetchInsertCity(`${appUrl}:8000/insertCiudad`, "POST", {}, { nameCity: nameCity, nameLongCity: nameLongCity }, handleFetchInsertCity);
        }
    }, [nameCity, nameLongCity]);

    const handleFetchInsertCity = (resultOp) => {
        if (resultOp.success === true) {
            let updatedCities = [...(selectCities || []), { name_city: nameLongCity }]
            setSelectCities(updatedCities);
            window.alert(`Se ha guardado correctamente la ciudad ${nameLongCity}`);
        }
    }

    return (
        <Button color="secondary" onClick={() => { saveCity() }}>Guardar Ciudad en favoritas</Button>
    )
}

export default SaveFavCity;
