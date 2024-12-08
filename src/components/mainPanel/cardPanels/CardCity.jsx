import { useContext, useEffect, useState } from "react";
import ShowWeather from "../ShowWeather";
import { DataContext, MainPanelContext } from '../../../context/Contexts';
import fetchWeatherByCity from "../../../api/weather/fetchWeatherByCity";
import DataFallback from "../DataFallback";
import './CardCity.css';

export default function CardCity() {
  const { units, weatherData, searchCity, setPosition, setWeatherData, historyCities, setHistoryCities, login } = useContext(MainPanelContext);
  const [loading, setLoading] = useState(true);

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
    if (login) {
      let updatedHistory = [{ name_city: newWeatherData.name }, ...(historyCities || [])]
      setHistoryCities(updatedHistory)
    }
  };

  if (loading) {
    return (
      <div className="loading-message">
        <h2>Cargando...</h2>
      </div>
    );
  }

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