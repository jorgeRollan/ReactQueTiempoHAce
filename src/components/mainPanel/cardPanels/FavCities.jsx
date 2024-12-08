import { useEffect, useState, useContext } from "react";
import fetchWeatherByCity from  "../../../api/weather/fetchWeatherByCity";
import ShowWeather from "../ShowWeather";
import Select from "./Select";
import { MainPanelContext, DataContext, FavCitiesContext } from '../../../context/Contexts';
import DataFallback from "../DataFallback";
import "./FavCities.css";

// Componente para mostrar la información meteorológica de las ciudades favoritas del usuario contiene el select de ciudades
export default function FavCities() {
  const [loading, setLoading] = useState(false);
  const { units, setPosition, weatherData, setWeatherData, selectCity, setSelectCity, selectCities } = useContext(MainPanelContext);
  
  const handleFetch = (newWeatherData) => {
    setPosition({ coords: { latitude: newWeatherData.coord.lat, longitude: newWeatherData.coord.lon } });
    setWeatherData(DataFallback(newWeatherData));
    setLoading(false);
  };

  // UseEffect para actualizar la información meteorológica cuando cambie la ciudad favorita o el sistema de unidades
  useEffect(() => {
    if (selectCity !== null) {
      setLoading(true);
      fetchWeatherByCity(selectCity, handleFetch, units);
    }
    else {
      setWeatherData(null);
    }
  }, [selectCity, units]);

  return (
    <div style={{ display: 'flex',flexWrap:'wrap', flexDirection:"column", justifyContent: 'flex-start', alignItems: 'flex-start', flexGrow: 2, padding: '20px' }}>
      <FavCitiesContext.Provider value={{ selectCity, setSelectCity, selectCities, setLoading }}>
        <div style={{ display: 'flex', width: "200px" }}>
          <Select />
        </div>
      </FavCitiesContext.Provider>

      <DataContext.Provider value={{ units, weatherData }}>
        {loading ? (
          <div className="loading-message">
            <h2>Cargando...</h2>
          </div>
        ) : selectCity && weatherData ? (
          <ShowWeather />
        ) : (
          <div className="error-message">
            <h2>Selecciona una ciudad para ver el clima</h2>
          </div>
        )}
      </DataContext.Provider>
    </div>
  );
}