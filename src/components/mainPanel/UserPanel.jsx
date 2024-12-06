import { useContext, useState } from "react";
import FetchRemoveCity from "../../api/FetchRemoveCity";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  TableCell,
  Divider,
  Spacer,
  Button,
} from "@nextui-org/react";
import { MainPanelContext } from "../../context/Contexts";

const UserPanel = () => {
  const appUrl = import.meta.env.VITE_APP_URL;

  const [selectedCity, setSelectedCity] = useState(null);

  const { login, selectCities, setSelectCities, historyCities } = useContext(MainPanelContext);

  const deleteCity = () => {
    let formData = new FormData();
    if (selectedCity !== null) {
      formData.append('nameCity', selectedCity.name_city);
      FetchRemoveCity(`${appUrl}:8000/deleteCiudad`, "POST", {}, formData, handleRemoveCity);
    }
    else window.alert("Seleccione una ciudad a borrar")
  };

  const handleRemoveCity = (response) => {
    if (response.success === true) {
      let updatedCities = selectCities.filter((city) => city.name_city !== selectedCity.name_city);
      setSelectCities(updatedCities);
      setSelectedCity(null);
    }
  };

  const handleSelectionChange = (selected) => {
    const iterator = selected.values();
    if (selected.size > 0) {
      const city = selectCities[iterator.next().value];
      setSelectedCity(city);
    }
  };

  return (
    <Card css={{ mw: "400px", p: "$6", margin: "20px auto" }}>
      {/* Header */}
      <CardHeader>
        <h3>Información del Usuario</h3>
      </CardHeader>

      {/* Body */}
      <CardBody>
        <span b>Nombre de usuario:</span>
        <span>{login?.name || "N/A"}</span>
        <Spacer y={5.0} />

        <span b>Correo de Usuario:</span>
        <span>{login?.email || "N/A"}</span>
        <Spacer y={5.0} />
        <Divider />
        {selectCities && selectCities.length > 0 ? (
          <Table aria-label="Ciudades Favoritas"
            selectionMode="single"
            onSelectionChange={handleSelectionChange}>
            <TableHeader>
              <TableColumn>Ciudades Favoritas</TableColumn>
            </TableHeader>
            <TableBody>
              {selectCities.map((element, index) => (
                <TableRow key={index}>
                  <TableCell>{element.name_city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <span>No hay ciudades favoritas seleccionadas.</span>
        )}
        <Button
          color="error"
          onClick={() => deleteCity()}
        >Eliminar Ciudad</Button>
        <Spacer y={5.0} />
        <Divider />
        {historyCities && historyCities.length > 0 ? (
          <Table aria-label="Historial Ciudades Visitadas">
            <TableHeader>
              <TableColumn>Historial Ciudades Visitadas</TableColumn>
            </TableHeader>
            <TableBody>
              {historyCities.map((element, index) => (
                <TableRow key={index}>
                  <TableCell>{element.name_city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <span>No hay ciudades visitadas por el usuario.</span>
        )}
      </CardBody>
    </Card>
  );
};

export default UserPanel;
