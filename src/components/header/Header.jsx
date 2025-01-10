import { useContext } from "react";
import { HeaderContext } from "../../context/Contexts";
import { Button, Chip, Avatar } from "@nextui-org/react";
import './Header.css';
import logout from "../../api/auth/logout";

// Cabecera de la página con los botones de inicio, registro y cierre de sesión(y su lógica) asi como el boton de perfil
export default function Header() {
    const { loading, setTypePanel, login, setLogin, setSelectCities, setSelectCity } = useContext(HeaderContext);

    const handleLogout = async () => {
        try {
            const result = await logout();
            if (result.success) {
                window.alert("Cierre de sesión exitoso.");
                setLogin(null);
                setSelectCities([]);
                setSelectCity(null);
                setTypePanel(1);
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <header className="header">
            <div className="logo-title-container">
                <img src="/assets/favicon-DvHCNFdO.ico" alt="Logo" className="logo" style={{ width: "60px", height: "60px" }} />
                <h1>QueTiempoHace</h1>
            </div>
            {!loading && (
                <div>
                    {login ? (
                        <div>
                            <Chip
                                style={{ cursor: "pointer", color: "white", marginRight: "10px" }}
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
                            <Button onPress={handleLogout}>Cerrar Sesión</Button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: "end", gap: "10px" }}>
                            <Button onPress={() => setTypePanel(6)}>Registro</Button>
                            <Button onPress={() => setTypePanel(7)}>Login</Button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
