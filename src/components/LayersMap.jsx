import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './LayersMap.css';

const LayersMap = () => {
    const [layer, setLayer] = useState('temp');
    const apiId = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const getLayerUrl = (layerType) => `https://tile.openweathermap.org/map/${layerType}_new/{z}/{x}/{y}.png?appid=${apiId}`;

    const layers = {
        temp: getLayerUrl('temp'),
        precipitation: getLayerUrl('precipitation'),
        pressure: getLayerUrl('pressure'),
        clouds: getLayerUrl('clouds'),
        wind: getLayerUrl('wind'),
        snow: getLayerUrl('snow'),
    };

    const spanishLayerNames = {
        TEMPERATURA: 'temp',
        PRECIPITACION: 'precipitation',
        PRESION: 'pressure',
        NUBES: 'clouds',
        VIENTO: 'wind',
        NIEVE: 'snow',
    };

    const handleLayerChange = (selectedLayer) => {
        setLayer(spanishLayerNames[selectedLayer]);
    };

    return (
        <div className="map-container">
            <h1>Mapa de España</h1>
            <div className="layer-buttons">
                {Object.keys(spanishLayerNames).map((key) => (
                    <button key={key} onClick={() => handleLayerChange(key)}>
                        {key}
                    </button>
                ))}
            </div>
            <MapContainer
                center={[40.4168, -3.7038]}
                zoom={6}
                className="map-container-map"
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
