import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './LayersMap.css';
import CountrySearch from './CountrySearch'; // Importamos CountrySearch
import FetchCountryLocation from '../api/FetchCountryLocation';

const LayersMap = () => {
    const [layer, setLayer] = useState('temp');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [coordinates, setCoordinates] = useState([40.4168, -3.7038]); // Para el país seleccionado
    const [mapKey, setMapKey] = useState(Date.now());
    const apiId = import.meta.env.VITE_OPENWEATHER_API_KEY;

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

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        console.log("País seleccionado:", country);

        // Aquí debes invocar la función FetchCountryLocation
        const url = `http://localhost:8000/api/geoCountry?selectCity=${country.capital}&selectCountry=${country.code}`;
        const method = 'GET';
        const headers = {
            'Content-Type': 'application/json',  // Agregar el encabezado correcto
        };

        // Llamada a la función FetchCountryLocation
        FetchCountryLocation(url, method, headers, (data) => {
            console.log('Pais cambiado', data);
            if (data.latitude && data.longitude) {
                setCoordinates([data.latitude, data.longitude]);
                setMapKey(Date.now());
            }
            // Aquí puedes manejar los datos de las coordenadas (data.latitude, data.longitude)
        });
    }

    return (
        <div className="map-container">
            <h1>Mapa de {selectedCountry ? selectedCountry.nombre : "España"}</h1>

            <div className="search-country">
                <CountrySearch onSelectCountry={handleCountrySelect} />
            </div>

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
