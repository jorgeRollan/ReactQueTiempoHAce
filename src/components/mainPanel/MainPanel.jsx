import { useContext, useEffect, useState } from "react";
import { MainPanelContext } from "../../context/Contexts";
import { Button } from "@nextui-org/react";
import CardCity from "./cardPanels/CardCity";
import Map from "./weather/Map";
import LayersMap from "./LayersMap";
import FavCities from "./cardPanels/FavCities";
import CityLocation from "./cardPanels/CityLocation";
import SaveFavCity from "./cardPanels/SaveFavCity";
import Register from "./auth/Register";
import Login from "./auth/Login";
import WeatherChart from "./weather/WeatherChart";
import WeatherHourlyChart from "./weather/WeatherHourlyChart";
import "./MainPanel.css";
import UserPanel from "./auth/UserPanel";
import MapaComunidades from "./MapaComunidades";


export default function MainPanel() {
    let { currentView, setHistoryCities, historyCities, units, searchCity, login, setLogin, typePanel, loading, setLoading, showWeather, setShowWeather, position, setPosition, weatherData, setWeatherData, selectCity, setSelectCity, setTypePanel, selectCities, setSelectCities, fetchCities, setFetchCities } = useContext(MainPanelContext);

    const [info, setInfo] = useState(false);
    const [forecast, setForecast] = useState(false);
    const [forecastH, setForecastH] = useState(false);

    // useffect para limpiar al cambiar entre paneles porque si no se cruzan los datos
    useEffect(() => {
        setWeatherData(null);
        setForecast(false);
        setForecastH(false);
        setSelectCity(null);
    }
        , [currentView]);

    return (
        <div className="mainPanel">
            {(typePanel === 1 || typePanel === 2 || typePanel === 5) &&
                <MainPanelContext.Provider
                    value={{
                        historyCities,
                        setHistoryCities,
                        units,
                        searchCity,
                        login,
                        setLogin,
                        position,
                        setPosition,
                        weatherData,
                        setWeatherData,
                        loading,
                        setLoading,
                        selectCity,
                        setSelectCity,
                        selectCities,
                        setSelectCities,
                        showWeather,
                        setShowWeather,
                        typePanel,
                        setTypePanel,
                        fetchCities,
                        setFetchCities
                    }}
                >
                    {!forecast && !forecastH ?
                        <div className="panel-card">
                            {/* Columna izquierda */}
                            <div className="left-panel">
                                {typePanel === 1 && <CityLocation />}
                                {typePanel === 2 && <CardCity />}
                                {typePanel === 5 && <FavCities />}
                            </div>

                            {/* Columna derecha */}
                            <div className="right-panel">
                                {weatherData && position && <Map />}

                            </div>
                        </div> : (
                            <>
                                {forecast && <WeatherChart />}
                                {forecastH && <WeatherHourlyChart />}
                            </>
                        )}
                    <div className="button-div" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", margin: "10px", gap: "5px" }}>
                        {login && weatherData && typePanel !== 5 && <SaveFavCity />}
                        {!forecastH && weatherData && <Button color="primary" className="forecast-button" onPress={() => setForecast(!forecast)}>{!forecast ? "Tiempo próximos días" : "Cerrar"}</Button>}
                        {!forecast && weatherData && <Button color="primary" className="forecast-button" onPress={() => setForecastH(!forecastH)}>{!forecastH ? "Tiempo próximas horas" : "Cerrar"}</Button>}
                    </div>
                </MainPanelContext.Provider>
            }

            {typePanel === 3 && (
                <MainPanelContext.Provider value={{ setForecast, setForecastH, info, setInfo, units, login, historyCities, setHistoryCities }}>
                    <MapaComunidades />
                </MainPanelContext.Provider>
            )}

            {typePanel === 4 && (
                <MainPanelContext.Provider value={{ login }}>
                    <LayersMap />
                </MainPanelContext.Provider>
            )}

            {typePanel === 6 && (
                <MainPanelContext.Provider value={setTypePanel}>
                    <Register />
                </MainPanelContext.Provider>
            )}

            {typePanel === 7 && (
                <MainPanelContext.Provider value={{ setTypePanel, setLogin, setSelectCities, setSelectCity, setHistoryCities }}>
                    <Login />
                </MainPanelContext.Provider>
            )}

            {typePanel === 10 && (
                <MainPanelContext.Provider value={{ historyCities, login, selectCities, setSelectCities }}>
                    <UserPanel />
                </MainPanelContext.Provider>
            )}
        </div>
    );
}
