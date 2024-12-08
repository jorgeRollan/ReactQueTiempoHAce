import React, { useContext, useEffect, useState } from 'react';
import { MainPanelContext } from '../../../context/Contexts';
import { Chip, Chart } from 'react-google-charts';
import { Card, CardBody } from '@nextui-org/react';
import './WeatherChart.css';
import fetchWeatherHourly from '../../../api/weather/fetchWeatherHourly';

const WeatherHourlyChart = () => {
  const { units, weatherData } = useContext(MainPanelContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHourData, setSelectedHourData] = useState(null); // Estado para almacenar los datos de la hora seleccionada
  const [forecastData, setForecastData] = useState([]); // Para guardar las horas con todos los datos

  // Función para cargar los datos meteorológicos
  const fetchWeatherData = async () => {
    if (!weatherData || !weatherData.name) {
      setLoading(false);
      return;
    }
    fetchWeatherHourly({ selectCity: weatherData.name, units }, handleFetch);
  }

  // Procesar los datos meteorológicos
  const handleFetch = (response) => {
    const forecast = response.list;
    const hours = forecast.slice(0, 32).map((entry) => [
      String(entry.dt_txt).slice(11, 13), // Hora
      entry.main.temp, // Temperatura
      entry.rain ? entry.rain['1h'] || 0 : 0, // Lluvia
    ]);

    // Guardar los datos detallados
    const forecastWithDetails = forecast.slice(0, 32).map((entry) => ({
      hour: String(entry.dt_txt).slice(11, 13), // Hora
      temp: entry.main.temp, // Temperatura
      rain: entry.rain ? entry.rain['1h'] || 0 : 0, // Lluvia
      description: entry.weather[0].description, // Descripción
      pressure: entry.main.pressure, // Presión
      humidity: entry.main.humidity, // Humedad
      icon: entry.weather[0].icon, // Icono
    }));

    // Datos para el gráfico
    const chartData = [
      ["Hora", units === 'metric' ? "Temperatura (°C)" : "Temperatura (°F)", "Lluvia (mm)"],
      ...hours,
    ];

    setData(chartData);
    setForecastData(forecastWithDetails);
    setLoading(false);
  };

  // Lógica para gestionar los eventos del gráfico
  const chartEvents = [
    {
      eventName: "select",
      callback({ chartWrapper }) {
        const chart = chartWrapper.getChart();
        const selection = chart.getSelection();
        if (selection.length > 0) {
          const [selectedItem] = selection;
          const row = selectedItem.row; // Fila seleccionada
          const selectedHour = data[row + 1][0]; // Hora de la fila seleccionada
          const hourData = forecastData.find((entry) => entry.hour === selectedHour);

          if (hourData) {
            setSelectedHourData(hourData);
          }
        }
      },
    },
  ];

  // Cargar los datos al montar el componente
  useEffect(() => {
    fetchWeatherData();
  }, [weatherData, units]); // Se ejecuta cuando cambian `weatherData` o `units`

  // Configuración del gráfico
  const options = {
    title: weatherData?.name
      ? `Temperaturas y Lluvia para las próximas 4 días (por hora) en ${weatherData.name}`
      : 'Temperaturas y Lluvia para las próximas 4 días (por hora)',
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

  // Render del componente
  return (
    <>
      {loading ? (
        <div className="loading-message">
          <h2>Cargando datos...</h2>
        </div>
      ) : (
        <>
          <Chart
            chartType="ComboChart"
            chartEvents={chartEvents}
            width="100%"
            height="400px"
            data={data}
            options={options}
          />

          {selectedHourData && (
            <Card id='card'>
              <CardBody style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Chip>
                  <h2 style={{ textAlign: "center" }}>
                    <strong>Hora:</strong> {selectedHourData.hour}:00
                  </h2>
                </Chip>
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
          )}
        </>
      )}
    </>
  );
};

export default WeatherHourlyChart;
