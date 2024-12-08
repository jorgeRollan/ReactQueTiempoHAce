import React, { useState, useContext, useRef, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './LayersMap.css';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import CountrySearch from './CountrySearch'; // Importamos CountrySearch
import fetchCountryLocation from '../../api/locations/fetchCountryLocation';
import { MainPanelContext } from '../../context/Contexts';

const LayersMap = () => {
    const [layer, setLayer] = useState('temp');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [coordinates, setCoordinates] = useState([40.4168, -3.7038]);
    const [mapKey, setMapKey] = useState(Date.now());
    const apiId = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const mapRef = useRef(null);
    const { login } = useContext(MainPanelContext);

    const getLayerUrl = (layerType) =>
        `https://tile.openweathermap.org/map/${layerType}_new/{z}/{x}/{y}.png?appid=${apiId}`;

    const layers = {
        temp: getLayerUrl('temp'),
        precipitation: getLayerUrl('precipitation'),
        pressure: getLayerUrl('pressure'),
        clouds: getLayerUrl('clouds'),
        wind: getLayerUrl('wind'),
        snow: getLayerUrl('snow'),
    };
    // la api de opennWeather no devuelve las capas pedidas en español
    const spanishLayerNames = {
        TEMPERATURA: 'temp',
        PRECIPITACION: 'precipitation',
        PRESION: 'pressure',
        NUBES: 'clouds',
        VIENTO: 'wind',
        NIEVE: 'snow',
    };


    // useEffect para agregar el control de pantalla completa al mapa(se usa una libreria externa)
    useEffect(() => {
        if (!mapRef.current) return;
        mapRef.current.addControl(new L.Control.Fullscreen());

        return () => {
            mapRef.current.removeControl(new L.Control.Fullscreen());
        };
    }, [mapRef]);

    
    // CAMBIAR!!!!!!!!!
    


    // Evento de cambio en el selector de  con los botones
    const handleLayerChange = (selectedLayer) => {
        setLayer(spanishLayerNames[selectedLayer]);
    };

    // Evento de cambio de ubicación en el mapa
    const handleCountryLocation = (response) => {
        setCoordinates([response.latitude, response.longitude]);
        setMapKey(Date.now());
    }

    // Evento de selección de país
    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        fetchCountryLocation(country, handleCountryLocation);
    }

    return (
        <div className="map-container">
            <h1>Mapa de {selectedCountry ? selectedCountry.nombre : "España"}</h1>

            {/* Si está logueado se muestra el componente de búsqueda de país */}
            {login &&
                <div className="search-country">
                    <CountrySearch onSelectCountry={handleCountrySelect} />
                </div>
            }
            <div className="layer-buttons">
                {Object.keys(spanishLayerNames).map((key) => (
                    <button key={key} onClick={() => handleLayerChange(key)}>
                        {key}
                    </button>
                ))}
            </div>

            <MapContainer
                key={mapKey}
                center={coordinates}
                zoom={6}
                className="map-container-map"
                fullscreenControl={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <TileLayer
                    key={layer}
                    url={layers[layer]}
                    attribution='&copy; <a href="http://openweathermap.org">OpenWeather</a> contributors'
                />
            </MapContainer>
        </div>
    );
};

export default LayersMap;
