import { useContext } from "react";
import { FavCitiesContext } from "../../context/Contexts"
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectCities() {
    let { selectCity, setSelectCity, selectCities, setLoading } = useContext(FavCitiesContext);

    const handleChange = (event) => {
        let city = event.target.value;
        if (city !== selectCity) {
            setLoading(true);
            setSelectCity(city);
        }
    };

    if (selectCities === null || selectCities.length === 0) {
        return (
            <Select
                name="select"
                value={selectCity}
                onChange={handleChange}
                color="success"
                label="Ciudades Favoritas"
                placeholder="Selecciona una ciudad"
            >
                <SelectItem key="Madrid" value="Madrid">Madrid</SelectItem>
                <SelectItem key="Zaragoza" value="Zaragoza">Zaragoza</SelectItem>
                <SelectItem key="Huelva" value="Huelva">Huelva</SelectItem>
                <SelectItem key="Toledo" value="Toledo">Toledo</SelectItem>
                <SelectItem key="Murcia" value="Murcia">Murcia</SelectItem>
            </Select>
        );
    } else {
        return (
            <Select
                name="select"
                value={selectCity}
                onChange={handleChange}
                color="success"
                label="Ciudades Favoritas"
                placeholder="Selecciona una ciudad"
            >
                {selectCities.map((option) => (
                    <SelectItem key={option.name_city} value={option.name_city}>
                        {option.name_city}
                    </SelectItem>
                ))}
            </Select>
        );
    }
}    
