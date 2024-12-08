import { useContext, useEffect, useState } from "react";
import { MainPanelContext } from "../../../context/Contexts";
import { Button } from "@nextui-org/button";
import fetchInsertCity from "../../../api/cities/insertCity";

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
            if (selectCities) {
                const isCityAlreadySaved = selectCities.some(city => city.nameLongCity === nameLongCity);

                if (isCityAlreadySaved) {
                    window.alert("La ciudad ya está en tus favoritas.");
                    return;
                }
            }
            fetchInsertCity({ nameCity: nameCity, nameLongCity: nameLongCity }, handleFetchInsertCity);
        }
    }, [nameCity, nameLongCity]);

    const handleFetchInsertCity = (response) => {
        if (response) {
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
