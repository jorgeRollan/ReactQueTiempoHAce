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
  const reloadLocationTime = 100000; // Tiempo de recarga de la ubicación en milisegundos

  const { units, position, setPosition, weatherData, setWeatherData } =
    useContext(MainPanelContext);

  useEffect(() => {
    if (!navigator.geolocation) {
      setNoLocation(true);
      setLoading(false);
      console.error("Geolocalización no soportada por el navegador.");
      return;
    }

    // LLamo a la función getLocation antes del intervalo porque si no se descuadra 
    getLocation();
    const interval = setInterval(() => {
      getLocation();
    }, reloadLocationTime);

    return () => clearInterval(interval);
  }, []);


  // UseEffect para actualizar la información meteorológica cuando cambie la ubicación o el sistema de unidades
  useEffect(() => {
    setLoading(true);
    if (position) {
      fetchWeatherByCoordinates(position.coords.latitude, position.coords.longitude, units, handleFetch)
    }
  }, [position, units]);

  const handleFetch = (newWeatherData) => {
    if (newWeatherData) {
      setWeatherData(DataFallback(newWeatherData));
    }
    setLoading(false)
  };


  // Función para obtener la ubicación del usuario mediante la API de geolocalización del navegador
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition(pos);
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

  // Si no se puede obtener la ubicación o si el usuario no ha activado la ubicación, se muestra un mensaje de error
  if (noLocation) {
    return (
      <div className="error-message">
        <h2>No se pudo obtener la ubicación</h2>
      </div>
    );
  }

  return (
    <div className="city-location-container">
      <DataContext.Provider value={{ units, weatherData }}>
        <ShowWeather />
      </DataContext.Provider>
    </div>
  );
}