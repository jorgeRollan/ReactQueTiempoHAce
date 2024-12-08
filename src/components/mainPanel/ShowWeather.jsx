import { useContext } from 'react';
import { DataContext } from '../../context/Contexts';
import { Card, CardHeader, CardBody, CardFooter, Table, TableHeader, TableBody, TableRow, TableColumn, TableCell, Image } from "@nextui-org/react";


// Componente para mostrar el tiempo actual de la ciudad mediante una tarjeta de nextui con una cabecera y una taabla
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
          <Card isFooterBlurred className="w-full h-[200px] w-[200px] left-20 sm:col-span-5">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <h2 className="text-black font-medium text-2xl">
                {temp}{temperatureUnit}
              </h2>
            </CardHeader>
            <Image
              removeWrapper
              alt="Icono del clima"
              className="w-full h-full scale-100 -translate-y-2 object-cover"
              src={`https://rodrigokamada.github.io/openweathermap/images/${weather[0].icon}_t@4x.png`}
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
              <div className="w-full text-center">
                <p className="text-black font-semibold text-lg capitalize">{weather[0].description}</p>
              </div>
            </CardFooter>
          </Card>
        </CardHeader>

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
      </Card>
    </div>
  );
};

export default ShowWeather;
