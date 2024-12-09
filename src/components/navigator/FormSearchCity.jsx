import { useContext, useState, useEffect } from "react";
import { NavBarContext } from "../../context/Contexts";
import { Input, Button } from "@nextui-org/react";
import { isMobile as deviceIsMobile } from "react-device-detect";

//Componente para buscar ciudades en la barra de navegación
export default function FormSearchCity() {
    const [inputValue, setInputValue] = useState("");
    const [isMobile, setIsMobile] = useState(deviceIsMobile || window.innerWidth <= 768);
    const { setSearchCity, setTypePanel } = useContext(NavBarContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim() !== "") {
            setSearchCity(inputValue);
            setInputValue("");
            setTypePanel(2);
        }
    };

    // useEffect para cambiar si hace mas pequeña la pantalla o si es movil
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(deviceIsMobile || window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Input
                style={{ width: isMobile ? "50px" : "180px" }}
                type="text" id="search" name="search" placeholder={isMobile ? "Ciudad" : "Introduzca una ciudad(,país)"} value={inputValue} onChange={(e) => setInputValue(e.target.value)}
            />
            <Button size="sm" type="submit">Buscar</Button>
        </form>
    );
}