import { useContext } from 'react';
import { DataContext } from "../context/Contexts";
import { Card, CardHeader, CardBody, CardFooter, Table, TableHeader, TableBody, TableRow, TableColumn, TableCell } from "@nextui-org/react";

const ShowWeather = () => {
  const { units, weatherData } = useContext(DataContext);
  const { name, main: { temp, feels_like, humidity, pressure }, wind: { deg, speed }, weather, sys: { country } } = weatherData;

  const temperatureUnit = units === 'metric' ? '°C' : '°F';
  const speedUnit = units === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="show-weather-container">
      <Card className="card-weather">
        <CardHeader className="card-header-weather">
          <h1 className="card-header-title">{`Clima en ${name} (${country})`}</h1>

          <div className="weather-icon-container">
            <img
              src={`https://rodrigokamada.github.io/openweathermap/images/${weather[0].icon}_t@4x.png`}
              alt="Icono del clima"
              className="weather-icon"
            />
            <h2 className="weather-temp">
              {temp}{temperatureUnit}
            </h2>
          </div>
        </CardHeader>

        {/* Body with Table */}
        <CardBody>
          <Table aria-label="Información Meteorológica" className="weather-table">
            <TableHeader>
              <TableColumn className="weather-table-header">Descripción</TableColumn>
              <TableColumn className="weather-table-header">Valor</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="weather-table-cell-bold">Temperatura</TableCell>
                <TableCell className="weather-table-cell">{`${temp} ${temperatureUnit}`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="weather-table-cell-bold">Sensación Térmica</TableCell>
                <TableCell className="weather-table-cell">{`${feels_like} ${temperatureUnit}`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="weather-table-cell-bold">Humedad</TableCell>
                <TableCell className="weather-table-cell">{humidity} %</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="weather-table-cell-bold">Descripción</TableCell>
                <TableCell className="weather-table-cell">{weather[0].description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="weather-table-cell-bold">Dirección del Viento</TableCell>
                <TableCell className="weather-table-cell">{deg}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="weather-table-cell-bold">Velocidad del Viento</TableCell>
                <TableCell className="weather-table-cell">{`${speed} ${speedUnit}`}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="weather-table-cell-bold">Presión Atmosférica</TableCell>
                <TableCell className="weather-table-cell">{pressure} hpa</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardBody>

        {/* Footer */}
        <CardFooter>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ShowWeather;
