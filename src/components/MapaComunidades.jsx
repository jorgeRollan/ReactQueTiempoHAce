import React, { useContext, useRef, useState, useEffect } from "react";
import Spain from "@react-map/spain";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@nextui-org/react";
import DataFallback from "./DataFallback";
import ShowWeather from "./ShowWeather";
import FetchWeatherByCity from "../api/FetchWeatherByCity";
import { DataContext, MainPanelContext } from "../context/Contexts";
import { isMobile } from "react-device-detect";
import "./MapaComunidades.css";

const communities = {
  "Andalusia": { name: "Andalucía", city: "Sevilla" },
  "Aragon": { name: "Aragón", city: "Zaragoza" },
  "Asturias": { name: "Asturias", city: "Oviedo" },
  "Balearic Islands": { name: "Islas Baleares", city: "Palma" },
  "Basque Country": { name: "País Vasco", city: "Bilbao" },
  "Canary Islands": { name: "Islas Canarias", city: "Las Palmas de Gran Canaria" },
  "Cantabria": { name: "Cantabria", city: "Santander" },
  "Castile and Leon": { name: "Castilla y León", city: "Valladolid" },
  "Castile-La Mancha": { name: "Castilla-La Mancha", city: "Toledo" },
  "Catalonia": { name: "Cataluña", city: "Barcelona" },
  "Extremadura": { name: "Extremadura", city: "Mérida" },
  "Galicia": { name: "Galicia", city: "Santiago de Compostela" },
  "La Rioja": { name: "La Rioja", city: "Logroño" },
  "Madrid": { name: "Madrid", city: "Madrid" },
  "Murcia": { name: "Región de Murcia", city: "Murcia" },
  "Navarra": { name: "Navarra", city: "Pamplona" },
  "Valencia": { name: "Valencia", city: "Valencia" },
  "Ceuta": { name: "Ceuta", city: "Ceuta" },
  "Melilla": { name: "Melilla", city: "Melilla" },
};


const MapaComunidades = () => {
  const toastIdRef = useRef(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { info, setInfo, units } = useContext(MainPanelContext);
  const [community, setCommunity] = useState(null);

  const handleFetch = (data, community) => {
    if (data) {
      const updatedWeatherData = DataFallback(data);
      setWeatherData(updatedWeatherData);

      const temperature = updatedWeatherData.main.temp;
      const description = updatedWeatherData.weather[0].description;

      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }
      setLoading(false);
      toastIdRef.current = toast(
        <div style={{zIndex: 2000}}>
          <strong>{community.name} ({community.city}):</strong> {temperature}{units === "metric" ? "º" : "F"}, {description}
          <Button
            color="primary"
            className="toast-button"
            onClick={() => setInfo(true)}
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

  const handleRegionSelect = async (regionName) => {
    const selectedCommunity = communities[regionName];

    if (!selectedCommunity) {
      return;
    }

    if (community && community.name === selectedCommunity.name) {
      toast.dismiss(toastIdRef.current);
      setCommunity(null);
      return;
    }

    setCommunity(selectedCommunity);
    setLoading(true);
    FetchWeatherByCity(
      selectedCommunity.city,
      (data) => handleFetch(data, selectedCommunity),
      units
    );
  };

  useEffect(() => {
    if (community) {
      FetchWeatherByCity(
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
            <Button className="close-button" onClick={handleCloseWeather}>Cerrar</Button>
          </div>
          {loading && <h2>Devolviendo datos del servidor...</h2>}
        </DataContext.Provider>
      </div>
    );
  } else {
    return (
      <div className="map-container">
        <h1>Haz clic en una región para ver el clima</h1>
        <Spain
          size={isMobile ? 300 : 700}
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