import { useEffect, useState, useContext } from "react";
import FetchWeatherByCity from "../api/FetchWeatherByCity";
import ShowWeather from "./ShowWeather";
import Select from "./selectCities/Select";
import { MainPanelContext, DataContext, FavCitiesContext } from '../context/Contexts';
import DataFallback from "./DataFallback";
import "./FavCities.css";

export default function FavCities() {
  const [loading, setLoading] = useState(false);
  const { units, setPosition, weatherData, setWeatherData, selectCity, setSelectCity, selectCities } = useContext(MainPanelContext);
  
  const handleFetch = (newWeatherData) => {
    setPosition({ coords: { latitude: newWeatherData.coord.lat, longitude: newWeatherData.coord.lon } });
    setWeatherData(DataFallback(newWeatherData));
    setLoading(false);
  };

  useEffect(() => {
    if (selectCity !== null) {
      setLoading(true);
      FetchWeatherByCity(selectCity, handleFetch, units);
    }
    else {
      setWeatherData(null);
    }
  }, [selectCity, units]);

  return (
    <div style={{ display: 'flex',flexWrap:'wrap', justifyContent: 'flex-start', alignItems: 'flex-start', flexGrow: 2, padding: '20px' }}>
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
