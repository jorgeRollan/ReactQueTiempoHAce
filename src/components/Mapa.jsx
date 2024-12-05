import React, { useContext, useEffect,useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import L from 'leaflet';
import { MainPanelContext } from "../context/Contexts";

const Map = () => {
  const { position, weatherData } = useContext(MainPanelContext);
  const mapRef = useRef(null);


  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.addControl(new L.Control.Fullscreen());

    return () => {
      mapRef.current.removeControl(new L.Control.Fullscreen());
    };
  }, [mapRef]);


  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      const resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
      });

      const container = document.getElementById("map-container");
      if (container) {
        resizeObserver.observe(container);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  var weatherIcon = L.icon({
    iconUrl: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
    shadowUrl: "https://img.icons8.com/?size=64&id=r3zZvjy5L6eB&format=png",

    iconSize: [38, 55],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [30, 100],
    popupAnchor: [-3, -76]
  });


  if (weatherData !== null) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%"
        }}
      >
        <MapContainer
          center={[position.coords.latitude, position.coords.longitude]}
          zoom={13}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            zIndex: 1,
          }}
          fullscreenControl={true}
          key={`${position.coords.latitude}-${position.coords.longitude}`}
        >
          {/* Capa base del mapa */}
          <TileLayer
          zIndex={1}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Marcador con el icono del clima */}
          <Marker
            position={[position.coords.latitude, position.coords.longitude]}
            icon={weatherIcon}
          />
        </MapContainer>
      </div>
    );
  }
}

export default Map;