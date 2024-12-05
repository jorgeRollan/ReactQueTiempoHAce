import * as Compass from 'cardinal-direction';

const DataFallback = (dataWeather) => {
  let { name, main: { temp, feels_like, humidity, pressure }, wind: { deg, speed }, weather, sys: { country } } = dataWeather

  const degToSpanish = (degrees) => {
    switch (degrees) {
      case "North":
        return "Norte";
      case "North by East":
        return "Norte por Este";
      case "North Northeast":
        return "Norte-Noreste";
      case "Northeast by North":
        return "Noreste por Norte";
      case "Northeast":
        return "Noreste";
      case "Northeast by East":
        return "Noreste por Este";
      case "East Northeast":
        return "Este-Noreste";
      case "East by North":
        return "Este por Norte";
      case "East":
        return "Este";
      case "East by South":
        return "Este por Sur";
      case "East Southeast":
        return "Este-Sureste";
      case "Southeast by East":
        return "Sureste por Este";
      case "Southeast":
        return "Sureste";
      case "Southeast by South":
        return "Sureste por Sur";
      case "South Southeast":
        return "Sur-Sureste";
      case "South by East":
        return "Sur por Este";
      case "South":
        return "Sur";
      case "South by West":
        return "Sur por Oeste";
      case "South Southwest":
        return "Sur-Suroeste";
      case "Southwest by South":
        return "Suroeste por Sur";
      case "Southwest":
        return "Suroeste";
      case "Southwest by West":
        return "Suroeste por Oeste";
      case "West Southwest":
        return "Oeste-Suroeste";
      case "West by South":
        return "Oeste por Sur";
      case "West":
        return "Oeste";
      case "West by North":
        return "Oeste por Norte";
      case "West Northwest":
        return "Oeste-Noroeste";
      case "Northwest by West":
        return "Noroeste por Oeste";
      case "Northwest":
        return "Noroeste";
      case "Northwest by North":
        return "Noroeste por Norte";
      case "North Northwest":
        return "Norte-Noroeste";
      case "North by West":
        return "Norte por Oeste";
      default:
        return "Dirección desconocida";
    }
  };

  name ||= "Nombre no disponible";
  country ||= "País no disponible";
  temp = temp ? `${Math.trunc(temp)}` : "Temperatura no disponible";
  feels_like = feels_like ? `${Math.trunc(feels_like)}` : "Sensación térmica no disponible";
  humidity = humidity ? `${humidity}` : "Humedad no disponible";
  weather[0].description ??= "Descripción no disponible";
  let card = Compass.cardinalConverter(Compass.cardinalFromDegree(deg)) ?? "Dirección del viento no disponible";
  deg = degToSpanish(card);
  speed = speed ? `${speed}` : "Velocidad del viento no disponible";
  pressure = pressure ? `${pressure}` : "Presión atmosférica no disponible";

  return { name, main: { temp, feels_like, humidity, pressure }, wind: { deg, speed }, weather, sys: { country } }
}

export default DataFallback;