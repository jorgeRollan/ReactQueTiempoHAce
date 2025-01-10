import { useContext, useState } from "react";
import fetchRemoveCity from "../../../api/cities/removeCity";
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
  Avatar
} from "@nextui-org/react";
import { MainPanelContext } from "../../../context/Contexts";


// Componente para mostrar los datos del usuario en el mainPanel
const UserPanel = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const { login, selectCities, setSelectCities, historyCities } = useContext(MainPanelContext);

  const deleteCity = () => {
    let formData = new FormData();
    if (selectedCity !== null) {
      formData.append('nameCity', selectedCity.name_city);
      fetchRemoveCity(formData, handleRemoveCity);
    }
    else window.alert("Seleccione una ciudad a borrar")
  };


  const handleRemoveCity = (response) => {
    if (response.success === true) {
      window.alert("Se ha eliminado la ciudad de favoritos");
      let updatedCities = selectCities.filter((city) => city.name_city !== selectedCity.name_city);
      setSelectCities(updatedCities);
      setSelectedCity(null);
    }
  };

  const handleSelectionChange = (selected) => {
    const selectedIndex = Array.from(selected)[0];
    setSelectedCity(selectCities[selectedIndex]);
  };

  return (
    <Card className="w-[700px] sm:col-span-5">
      <CardHeader className="flex flex-col gap-5 items-start justify-center ml-3">
        <h3>Información del Usuario</h3>
        <div className="flex gap-5 flex-row">
          <Avatar
            className="mt-5"
            isBordered
            radius="full"
            size="md"
            src="src\assets\termometro.svg"
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <span className="font-bold">Nombre de usuario:</span>
            <span>{login?.name || "N/A"}</span>
            <span className="font-bold">Correo de Usuario:</span>
            <span>{login?.email || "N/A"}</span>
          </div>
        </div>
        <Divider />
      </CardHeader>

      <CardBody>
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
          onPress={() => deleteCity()}
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
    </Card >
  );
};

export default UserPanel;