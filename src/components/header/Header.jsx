import { useContext } from "react"
import { HeaderContext } from "../../context/Contexts"
import { Button, Chip, Avatar } from "@nextui-org/react"
import './Header.css'
import axios from 'axios'
export default function Header() {
    const { setTypePanel, login, setLogin, setSelectCities, setSelectCity } = useContext(HeaderContext);

    const handleLogout = async () => {
        const appUrl = import.meta.env.VITE_APP_URL;
        try {
            await axios.post(`${appUrl}:8000/logout`, {}, {
                withCredentials: true,
            });
            setLogin(null);
            setSelectCities([]);
            setSelectCity(null);
            setTypePanel(1);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <header className="header">
            <div style={{ display: "flex", alignItems: "center" }} className="logo-title-container">
                <img src="../favicon.ico" alt="Logo" className="logo" style={{ width: "60px", height: "60px" }} />
                <h1>QueTiempoHace</h1>
            </div>
            {login ? (
                <div>
                    <Chip
                        style={{ cursor: "pointer", color: "white" }}
                        onClick={() => setTypePanel(10)}
                        radius="sm"
                        variant="flat"
                        avatar={
                            <Avatar
                                name={login.name}
                                size="sm"
                                color="warning"
                                getInitials={(name) => name.charAt(0)}
                            />
                        }
                    >
                        {login.name}
                    </Chip>

                    <Button onClick={handleLogout}>Cerrar Sesión</Button>
                </div>
            ) :
                (
                    <div style={{ display: 'flex', alignItems: "end" }}>
                        <Button onClick={() => setTypePanel(6)}>Registro</Button>
                        <Button onClick={() => setTypePanel(7)}>Login</Button>
                    </div>)
            }
        </header >)
}