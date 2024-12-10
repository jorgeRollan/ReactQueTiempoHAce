import { useContext, useEffect, useState } from "react";
import ShowWeather from "../ShowWeather";
import { DataContext, MainPanelContext } from "../../../context/Contexts";
import DataFallback from "../DataFallback";
import fetchWeatherByCoordinates from "../../../api/weather/fetchWeatherByCoordinates";
import "./CityLocation.css";

// Componente para mostrar la información meteorológica de la ubicación actual del usuario
export default function CityLocation() {
  const [loading, setLoading] = useState(true);
  const [noLocation, setNoLocation] = useState(false);
  const [localPosition, setLocalPosition] = useState(null);
  const [localWeatherData, setLocalWeatherData] = useState(null);

  const reloadLocationTime = 100000;

  const { units, setPosition, setWeatherData } = useContext(MainPanelContext);

  // UseEffect obtener la ubicacion del usuario
  useEffect(() => {
    if (!navigator.geolocation) {
      setNoLocation(true);
      setLoading(false);
      console.error("Geolocalización no soportada por el navegador.");
      return;
    }

    // Llama a la función getLocation antes del intervalo porque si no se descuadra
    getLocation();
    const interval = setInterval(() => {
      getLocation();
    }, reloadLocationTime);

    return () => clearInterval(interval);
  }, []);

  // UseEffect para actualizar la información meteorológica cuando cambie la ubicación o el sistema de unidades
  useEffect(() => {
    if (localPosition) {
      setLoading(true);
      fetchWeatherByCoordinates(
        localPosition.coords.latitude,
        localPosition.coords.longitude,
        units,
        handleFetch
      );
    }
  }, [localPosition, units]);

  const handleFetch = (newWeatherData) => {
    if (newWeatherData) {
      const processedData = DataFallback(newWeatherData);
      setLocalWeatherData(processedData);
      setWeatherData(processedData);
      setPosition(localPosition);
    }
    setLoading(false);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocalPosition(pos);
        setNoLocation(false);
      },
      (error) => {
        console.error(`Error obteniendo la ubicación: ${error.message}`);
        setNoLocation(true);
        setLoading(false);
      }
    );
  };

  if (loading) {
    return (
      <div className="loading-message">
        <h2>Devolviendo datos del servidor...</h2>
      </div>
    );
  }

  if (noLocation) {
    return (
      <div className="error-message">
        <h2>No se pudo obtener la ubicación</h2>
      </div>
    );
  }

  return (
    <div className="city-location-container">
      <DataContext.Provider value={{ units, weatherData: localWeatherData }}>
        <ShowWeather />
      </DataContext.Provider>
    </div>
  );
}
