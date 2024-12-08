import React, { useContext, useEffect, useState } from 'react';
import { MainPanelContext } from '../../../context/Contexts';
import { Chart } from 'react-google-charts';
import { Chip, Card, CardBody } from '@nextui-org/react';
import fetchWeatherDaily from '../../../api/weather/fetchWeatherDaily';
import './WeatherChart.css';


// Componente para mostrar el tiempo de los próximos dias en un gráfico
const WeatherChart = () => {
  const { units, weatherData } = useContext(MainPanelContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDayData, setSelectedDayData] = useState(null); // Datos del día seleccionado
  const [forecastData, setForecastData] = useState([]); // Para guardar los detalles de los días

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
          const selectedDay = data[row + 1][0]; // El día está en la primera columna (índice 0)

          // Buscar todos los detalles de ese día en la lista de forecastData
          const dayData = forecastData.find(entry => entry.day === selectedDay);

          if (dayData) {
            setSelectedDayData(dayData);
          }
        }
      },
    }
  ];

  // Cargar los datos meteorológicos
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!weatherData || !weatherData.name) {
        setLoading(false);
        return;
      }

      fetchWeatherDaily({ selectCity: weatherData.name, units }, handleFetchWeatherData);
    }

    const handleFetchWeatherData = (response) => {
      const forecast = response.list;

      // Procesamos los datos por día
      const forecastWithDetails = forecast.map((day) => ({
        day: new Date(day.dt * 1000).toLocaleDateString("es-ES", { day: "numeric", month: "short" }), // Fecha del día
        tempMin: day.temp.min, // Temperatura mínima
        tempMax: day.temp.max, // Temperatura máxima
        pressure: day.pressure, // Presión
        humidity: day.humidity, // Humedad
        description: day.weather[0].description, // Descripción del clima
        icon: day.weather[0].icon, // Icono del clima
      }));

      // Preparamos los datos para el gráfico (solo las temperaturas mínimas y máximas)
      const chartData = [
        ["Día", "Temperatura Mínima", "Temperatura Máxima"],
        ...forecastWithDetails.map((day) => [
          day.day,  // Día (formato: 03 dic, 04 dic, etc.)
          day.tempMin,
          day.tempMax,
        ]),
      ];

      setData(chartData);
      setForecastData(forecastWithDetails); // Guardamos todos los detalles de los días
      setLoading(false);
    }

    if (weatherData?.name) {
      fetchWeatherData();
    }
  }, [weatherData, units]);

  // Configuración del gráfico
  const options = {
    title: weatherData?.name ? `Temperaturas para los próximos 16 días en ${weatherData.name}` : 'Temperaturas para los próximos 16 días',
    hAxis: { title: "Día" },
    vAxis: { title: units === 'metric' ? "Temperatura (°C)" : "Temperatura (°F)" },
    series: {
      0: { color: "#1E88E5" }, // Color de la línea para la temperatura mínima
      1: { color: "#D32F2F" }, // Color de la línea para la temperatura máxima
    },
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
            chartType="LineChart"
            chartEvents={chartEvents}
            width="100%"
            height="400px"
            data={data}
            options={options}
          />

          {/* Si hay datos del día seleccionado, mostrarla en una tarjeta */}
          {selectedDayData && (
            <div >
              <Card id='card'>
                <CardBody style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                  <Chip>
                    <h2 style={
                      { textAlign: "center" }
                    }><strong>Día:</strong> {selectedDayData.day}</h2>
                  </Chip>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={`https://rodrigokamada.github.io/openweathermap/images/${selectedDayData.icon}_t@2x.png`}
                      alt="Icono del clima"
                      className="weather-icon"
                    />
                  </div>
                  <div>
                    <p><strong>Temperatura Mínima:</strong> {selectedDayData.tempMin} {units === 'metric' ? '°C' : '°F'}</p>
                    <p><strong>Temperatura Máxima:</strong> {selectedDayData.tempMax} {units === 'metric' ? '°C' : '°F'}</p>
                    <p><strong>Descripción:</strong> {selectedDayData.description}</p>
                    <p><strong>Presión:</strong> {selectedDayData.pressure} hPa</p>
                    <p><strong>Humedad:</strong> {selectedDayData.humidity} %</p>
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

export default WeatherChart;
