import React, { useContext, useEffect, useState } from 'react';
import { MainPanelContext } from '../../../context/Contexts';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import { Card, CardBody } from '@nextui-org/react';
import './WeatherChart.css';

const WeatherHourlyChart = () => {
  const appUrl = import.meta.env.VITE_APP_URL;
  const { units, weatherData } = useContext(MainPanelContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHourData, setSelectedHourData] = useState(null); // Estado para almacenar los datos de la hora seleccionada
  const [forecastData, setForecastData] = useState([]); // Para guardar las horas con todos los datos

  // Evento de selección
  const chartEvents = [
    {
      eventName: "select",
      callback({ chartWrapper }) {
        const chart = chartWrapper.getChart();
        const selection = chart.getSelection();
        if (selection.length > 0) {
          const [selectedItem] = selection;
          const row = selectedItem.row; // Obtenemos la fila seleccionada

          // Comparar la hora seleccionada con las horas previamente guardadas
          const selectedHour = data[row + 1][0]; // La hora está en la primera columna (índice 0)

          // Buscar todos los datos de esa hora en la lista de forecastData
          const hourData = forecastData.find((entry) => entry.hour === selectedHour);

          if (hourData) {
            setSelectedHourData(hourData); // Guardamos los datos correspondientes a esa hora
          }
        }
      },
    }
  ];

  // Cargar los datos meteorológicos
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!weatherData || !weatherData.name) {
        console.error("City name is not defined in weatherData.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${appUrl}:8000/api/weatherForecastHourly`, {
          params: {
            selectCity: weatherData.name,
            units,
          }
        });

        const forecast = response.data.list;
        const hours = forecast.slice(0, 32).map((entry) => [
          String(entry.dt_txt).slice(11, 13),  // Hora
          entry.main.temp,                      // Temperatura
          entry.rain ? entry.rain['1h'] || 0 : 0,  // Lluvia
        ]);

        // Guardamos todos los datos con las horas
        const forecastWithDetails = forecast.slice(0, 32).map((entry) => ({
          hour: String(entry.dt_txt).slice(11, 13),  // Hora
          temp: entry.main.temp,                      // Temperatura
          rain: entry.rain ? entry.rain['1h'] || 0 : 0,  // Lluvia
          description: entry.weather[0].description, // Descripción del clima
          pressure: entry.main.pressure,            // Presión
          humidity: entry.main.humidity,            // Humedad
          icon: entry.weather[0].icon
        }));

        // Seteamos los datos del gráfico
        const chartData = [
          ["Hora", units === 'metric' ? "Temperatura (°C)" : "Temperatura (°F)", "Lluvia (mm)"],
          ...hours
        ];

        setData(chartData);
        setForecastData(forecastWithDetails); // Guardamos la lista de datos detallados

      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (weatherData?.name) {
      fetchWeatherData();
    }
  }, [weatherData, units]);

  // Configuración del gráfico
  const options = {
    title: weatherData?.name ? `Temperaturas y Lluvia para las próximas 4 días (por hora) en ${weatherData.name}` : 'Temperaturas y Lluvia para las próximas 4 días (por hora)',
    hAxis: { title: "Hora" },
    vAxes: {
      0: { title: units === 'metric' ? "Temperatura (°C)" : "Temperatura (°F)" },
      1: { title: "Lluvia (mm)" },
    },
    series: {
      0: { targetAxisIndex: 0, type: "line", color: "#1E88E5" },
      1: { targetAxisIndex: 1, type: "bars", color: "#76A7FA" },
    },
    isStacked: true,
  };

  return (
    <>
      {loading ? (
        <div className="loading-message">
          <h2>Cargando datos...</h2>
        </div>
      ) : (
        <>
          {/* Gráfico con eventos de selección */}
          <Chart
            chartType="ComboChart"
            chartEvents={chartEvents}
            width="100%"
            height="400px"
            data={data}
            options={options}
          />

          {/* Si hay datos de la hora seleccionada, mostrarla en una tarjeta */}
          {selectedHourData && (
            <div>
              <Card id = 'card'>
                <CardBody>
                <h2 style={
                            { textAlign: "center" }
                  }><strong>Hora:</strong> {selectedHourData.hour}:00</h2>
                 <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={`https://rodrigokamada.github.io/openweathermap/images/${selectedHourData.icon}_t@2x.png`}
          alt="Icono del clima"
          className="weather-icon"
        />
      </div>
                  <div>
                    <p><strong>Temperatura:</strong> {selectedHourData.temp} {units === 'metric' ? '°C' : '°F'}</p>
                    <p><strong>Lluvia:</strong> {selectedHourData.rain} mm</p>
                    <p><strong>Descripción:</strong> {selectedHourData.description}</p>
                    <p><strong>Presión:</strong> {selectedHourData.pressure} hPa</p>
                    <p><strong>Humedad:</strong> {selectedHourData.humidity} %</p>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default WeatherHourlyChart;
