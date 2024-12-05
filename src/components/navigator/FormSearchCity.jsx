import { useContext, useState } from "react";
import { NavBarContext } from "../../context/Contexts";
import { Input, Button } from "@nextui-org/react";
import { isMobile as deviceIsMobile } from "react-device-detect";

export default function FormSearchCity() {
    const [inputValue, setInputValue] = useState("");
    const [isMobile, setIsMobile] = useState(deviceIsMobile || window.innerWidth <= 768);
    const { searchCity, setSearchCity, setTypePanel } = useContext(NavBarContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim() !== "") {
            if (inputValue === searchCity) {
                setInputValue("");
                return
            }
            else {
                setSearchCity(inputValue);
                setInputValue("");
                setTypePanel(2);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "row"}}>
            <Input
                style={{ width: isMobile ? "50px" : "140px" }}
                type="text" id="search" name="search" placeholder={isMobile ? "Ciudad" : "Introduzca una ciudad"} value={inputValue} onChange={(e) => setInputValue(e.target.value)}
            />
            <Button type="submit">Buscar</Button>
        </form>
    );
}