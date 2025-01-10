import { useContext, useEffect, useState } from "react";
import { MainPanelContext } from "../../../context/Contexts";
import { Button } from "@nextui-org/button";
import fetchInsertCity from "../../../api/cities/insertCity";

// Componente para guardar la ciudad favorita seleccionada
const SaveFavCity = () => {
    const [nameCity, setNameCity] = useState(null);
    const [nameLongCity, setNameLongCity] = useState(null);
    const { selectCities, setSelectCities, weatherData } = useContext(MainPanelContext);

    const saveCity = () => {
        if (weatherData) {
            setNameCity(weatherData.name);
            setNameLongCity(weatherData.name);
        }
    }

    // UseEffect para guardar la ciudad favorita si se selecciona una ciudad que no esté en la lista de ciudades favoritas 
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
        <Button color="secondary" onPress={() => { saveCity() }}>Guardar Ciudad en favoritas</Button>
    )
}

export default SaveFavCity;
