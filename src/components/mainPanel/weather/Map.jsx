import React, { useContext, useEffect,useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import L from 'leaflet';
import { MainPanelContext } from '../../../context/Contexts';

// Componente para mostrar un mapa con la ubicacion búsqueda/localizada y el icono del clima
const Map = () => {
  const { position, weatherData } = useContext(MainPanelContext);
  const mapRef = useRef(null);

  //Los siguientes useEffect los tuve que utilizar por problemas de la librearia leaflet al poner el botón de pantalla
  // completa en el mapa y redimensionarlo estas son las dos soluciones que investigué


  // UseEffect para agregar el control de pantalla completa al mapa(se usa una libreria externa)
  useEffect(() => {
    // se usa el ref para interactuar con el mapa
    if (!mapRef.current) return;
    // se agrega el control de pantalla completa al mapa
    mapRef.current.addControl(new L.Control.Fullscreen());

    return () => {
      // si se desmonta el componente se elimina el control de pantalla completa
      mapRef.current.removeControl(new L.Control.Fullscreen());
    };
  }, [mapRef]);


  // useEffect para redimensionar el mapa cuando cambie el tamaño de la ventana o el div donde se muestra el mapa
  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      const resizeObserver = new ResizeObserver(() => {
        // se llama a la función invalidateSize del mapa para redimensionarlo(encontrado en internet)
        map.invalidateSize();
      });

      const container = document.getElementById("map-container");
      if (container) {
        resizeObserver.observe(container);
      }

      return () => {
        // se desconecta el resizeObserver para que no se repita la función
        resizeObserver.disconnect();
      };
    }
  }, []);

  // Icono del tiempo sobre el mapa
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