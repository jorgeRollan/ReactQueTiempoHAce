import React, { useContext, useRef, useState, useEffect } from "react";
import Spain from "@react-map/spain";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@nextui-org/react";
import DataFallback from "./DataFallback";
import ShowWeather from "./ShowWeather";
import fetchWeatherByCity from "../../api/weather/fetchWeatherByCity";
import { DataContext, MainPanelContext } from "../../context/Contexts";
import { isMobile } from "react-device-detect";
import communities from "../../utils/communityList";
import "./MapaComunidades.css";

// Componente para mostrar el mapa interactivo de las comunidades de España y su clima
const MapaComunidades = () => {
  const toastIdRef = useRef(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentView, setForecast, setForecastH, info, setInfo, units, login, setHistoryCities } = useContext(MainPanelContext);
  const [community, setCommunity] = useState(null);

  useEffect(() => {
    if (currentView !== "weatherByComunity") {
      setWeatherData(null);
      setForecast(false);
      setForecastH(false);
    }
  }, [currentView]);

  const handleFetch = (data, community) => {
    if (data) {
      const updatedWeatherData = DataFallback(data);
      setWeatherData(updatedWeatherData);

      const temperature = updatedWeatherData.main.temp;
      const description = updatedWeatherData.weather[0].description;
      // Si el usuario está registrado, se agrega la ciudad a la lista de ciudades visitadas
      if (login) {
        setHistoryCities(prevHistory => {
          const validHistory = prevHistory || []; // Asegurarse de que prevHistory no sea null
          return [{ name_city: updatedWeatherData.name }, ...validHistory];
        });
      }      
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }
      setLoading(false);
      toastIdRef.current = toast(
        <div style={{ zIndex: 2000 }}>
          <strong>{community.name} ({community.city}):</strong> {temperature}{units === "metric" ? "º" : "F"}, {description}
          <Button
            color="primary"
            className="toast-button"
            onPress={() => setInfo(true)}
          >
            Más info
          </Button>
        </div>,
        {
          type: "info",
          autoClose: false,
        }
      );
    }
  };

  // Evento de selección de comunidad
  const handleRegionSelect = async (regionName) => {
    const selectedCommunity = communities[regionName];

    if (!selectedCommunity) {
      return;
    }

    // Si la comunidad seleccionada es la misma que la actual se desaparece el toast y se limpia la comunidad
    if (community && community.name === selectedCommunity.name) {
      toast.dismiss(toastIdRef.current);
      setCommunity(null);
      return;
    }

    // Si hace click en una comunidad sin haber pinchado antes se muestra 
    setCommunity(selectedCommunity);
    setLoading(true);
    fetchWeatherByCity(
      selectedCommunity.city,
      (data) => handleFetch(data, selectedCommunity),
      units
    );
  };

  useEffect(() => {
    if (community) {
      fetchWeatherByCity(
        community.city,
        (data) => handleFetch(data, community),
        units
      );
    }
  }, [units]);

  const handleCloseWeather = () => {
    setInfo(false);
  };

  if (info && weatherData) {
    return (
      <div className="weather-data-container">
        <DataContext.Provider value={{ units, weatherData }}>
          <div className="weather-data-panel">
            <ShowWeather />
          </div>
          <div className="close-button-container">
            <Button className="close-button" onPress={handleCloseWeather}>Cerrar</Button>
          </div>
          {loading && <h2>Devolviendo datos del servidor...</h2>}
        </DataContext.Provider>
      </div>
    );
  } else {
    return (
      <div className="map-container">
        <h1 style={{ marginBottom: "10px", }}>Haz clic en una región para ver el clima</h1>
        <Spain
          size={isMobile ? 100 : 700}
          className="map"
          hoverColor="orange"
          type="select-single"
          onSelect={handleRegionSelect}
        />
        <ToastContainer zIndex={2000} position="bottom-right" autoClose={5000} hideProgressBar={false} />
      </div>
    );
  }
};

export default MapaComunidades;