import { useState, useEffect, useContext } from 'react';
import { MainContext, NavBarContext, MainPanelContext, HeaderContext } from './context/Contexts';
import MainPanel from './components/mainPanel/MainPanel';
import fetchCities from './api/cities/fetchCities';
import Navigator from './components/navigator/Navigator';
import Header from './components/header/Header';
import checkAuth from './api/auth/checkAuth';

function App() {
  const [clean, setClean] = useState(true);
  const [position, setPosition] = useState(null);
  const [showWeather, setShowWeather] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [fetch30, setFetch30] = useState(null);
  const [selectCity, setSelectCity] = useState(null);
  const [searchCity, setSearchCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [typePanel, setTypePanel] = useState(1);
  const [login, setLogin] = useState(null);
  const [selectCities, setSelectCities] = useState(null);
  const [historyCities, setHistoryCities] = useState(null);
  const [fetchCiudades, setFetchCiudades] = useState(false);
  const [units, setUnits] = useState('metric');
  const { theme, setTheme } = useContext(MainContext);

  const handleFetchCiudades = (newCities) => {
    if (newCities.length > 0) {
      setSelectCities(newCities);
      setSelectCity(newCities[0]?.name_city || null); // Update selectCity to the first city or null
    }
  };

  const handleFetchCiudadesHistory = (newCities) => {
    if (newCities.length > 0) {
      setHistoryCities(newCities);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await checkAuth();
        console.log(response);
        if (response.authenticated) {
          setLogin(response.user);
          window.alert(`Bienvenido ${response.user.name}`);
          fetchCities("favorites", handleFetchCiudades);
          fetchCities("history", handleFetchCiudadesHistory);
        }
      } catch (error) {
        window.alert('Error al autenticar. Por favor, intente nuevamente.');
      }
    };
    initializeAuth();
  }, []);

  return (
    <div>
      <HeaderContext.Provider value={{ setTypePanel, login, setLogin, setSelectCities, setLoading, setSelectCity }}>
        <Header />
      </HeaderContext.Provider>
      <NavBarContext.Provider value={{ units, setUnits, setTypePanel, theme, setTheme, searchCity, setSearchCity, setLoading }}>
        <Navigator />
      </NavBarContext.Provider>
      <MainPanelContext.Provider value={{ historyCities, setHistoryCities, units, searchCity, login, setLogin, typePanel, loading, setLoading, clean, setClean, showWeather, setShowWeather, position, setPosition, weatherData, setWeatherData, selectCity, setSelectCity, fetch30, setFetch30, setTypePanel, fetchCiudades, setFetchCiudades, selectCities, setSelectCities }} >
        <MainPanel />
      </MainPanelContext.Provider>
    </div>
  );
}

export default App;