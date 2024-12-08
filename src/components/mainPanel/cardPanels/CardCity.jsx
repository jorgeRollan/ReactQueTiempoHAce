import { useContext, useEffect, useState } from "react";
import ShowWeather from "../ShowWeather";
import { DataContext, MainPanelContext } from '../../../context/Contexts';
import fetchWeatherByCity from "../../../api/weather/fetchWeatherByCity";
import DataFallback from "../DataFallback";
import './CardCity.css';

export default function CardCity() {
  const { units, weatherData, searchCity, setPosition, setWeatherData, historyCities, setHistoryCities, login } = useContext(MainPanelContext);
  const [loading, setLoading] = useState(true);


  // UseEffect para actualizar la información de la ciudad buscada, se ejecutará cuando cambie la ciudad buscada o el sistema de unidades
  useEffect(() => {
    if (searchCity) {
      setWeatherData(null);
      setLoading(true);
      fetchWeatherByCity(searchCity, handleFetch, units).finally(() => setLoading(false));
    }
  }, [searchCity, units]);

  const handleFetch = (newWeatherData) => {
    setWeatherData(DataFallback(newWeatherData));
    setPosition({
      coords: {
        latitude: newWeatherData.coord.lat,
        longitude: newWeatherData.coord.lon,
      },
    });

    // Si el usuario está registrado, se agrega la ciudad a la lista de ciudades visitadas
    if (login) {
      let updatedHistory = [{ name_city: newWeatherData.name }, ...(historyCities || [])]
      setHistoryCities(updatedHistory)
    }
  };

  // Si se está buscando una ciudad, se muestra un mensaje de carga
  if (loading) {
    return (
      <div className="loading-message">
        <h2>Cargando...</h2>
      </div>
    );
  }

  // Si la ciudad buscada existe y hay datos meteorológicos, se muestra el componente ShowWeather
  if (searchCity && weatherData) {
    return (
      <div className="show-weather-container">
        <DataContext.Provider value={{ weatherData, units }}>
          <ShowWeather />
        </DataContext.Provider>
      </div>
    );
  }
}