import { useState, useEffect, useContext } from "react";
import { isMobile as deviceIsMobile } from "react-device-detect";
import { NavBarContext } from "../../context/Contexts";
import FormSearchCity from "./FormSearchCity";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Select,
  SelectItem,
} from "@nextui-org/react";

// Navegador de la página con los links de los diferentes paneles y el selector de unidades(incluye el componente FormSearchCity)
export default function Navigator() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(deviceIsMobile || window.innerWidth <= 1200); // solucción para que actue como pantalla de movil cuando sea tablet y movil

  const { setCurrentView, historyCities, setHistoryCities, login, setTypePanel, theme, setTheme, units, setUnits, searchCity, setSearchCity } = useContext(NavBarContext);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleUnitsChange = (value) => {
    setUnits(value);
    window.alert("Unidades cambiadas: " + value);
  };

  // useEffect para cambiar si hace mas pequeña la pantalla o si es movil
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(deviceIsMobile || window.innerWidth <= 1200);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Navbar
      id="menu-container"
      position="sticky"
      maxWidth="full"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      style={{
        padding: "0px"
      }}
    >
      {/* Si es movil se muestra el menú de navegación */}
      {isMobile ? (
        <>
          <NavbarContent >
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
            />
          </NavbarContent>
          {isMenuOpen && (
            <NavbarMenu portalContainer={document.getElementById("menu-container")}
              style={{
                backdropFilter: "blur(20px) saturate(200%)",
                backgroundColor: "rgba(230, 230, 230, 0.95)",
                left: "0",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                zIndex: 100
              }}
            >
              <NavbarMenuItem>
                <Link
                  underline="hover"
                  className="w-full"
                  size="lg"
                  style={{ cursor: "pointer" }}
                  onPress={() => {
                    setIsMenuOpen((prev) => !prev);
                    setCurrentView("cityLocation");
                    setTypePanel(1);
                  }}
                >
                  Clima por Ubicación
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  underline="hover"
                  className="w-full"
                  size="lg"
                  style={{ cursor: "pointer" }}
                  onPress={() => {
                    setIsMenuOpen((prev) => !prev);
                    setCurrentView("favCities");
                    setTypePanel(5);
                  }}
                >
                  Ciudades Favoritas
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  underline="hover"
                  className="w-full"
                  size="lg"
                  style={{ cursor: "pointer" }}
                  onPress={() => {
                    setIsMenuOpen((prev) => !prev);
                    setCurrentView("weatherByComunity");
                    setTypePanel(3);
                  }}
                >
                  Tiempo por Comunidades
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  underline="hover"
                  className="w-full"
                  size="lg"
                  style={{ cursor: "pointer" }}
                  onPress={() => {
                    setIsMenuOpen((prev) => !prev);
                    setCurrentView("map");
                    setTypePanel(4);
                  }}
                >
                  Mapas de Pronóstico
                </Link>
              </NavbarMenuItem>
            </NavbarMenu>
          )}
        </>
      ) :
        (<NavbarContent className="px-1" style={{ display: "flex", flexWrap: "wrap", flexGrow: "2", justifyContent: "flex-start", alignItems: "center", gap: "10px" }}>
          <NavbarItem>
            <Link
              variant="solid"
              underline="hover"
              style={{ cursor: "pointer" }}
              onPress={() => {
                setCurrentView("cityLocation");
                setTypePanel(1);
              }}
            >
              Clima por Ubicación
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              variant="solid"
              underline="hover"
              style={{ cursor: "pointer" }}
              onPress={() => {
                setCurrentView("favCities");
                setTypePanel(5)
              }}
            >
              Ciudades Favoritas
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              variant="solid"
              underline="hover"
              style={{ cursor: "pointer" }}
              onPress={() => {
                setCurrentView("weatherByComunity");
                setTypePanel(3)
              }}
            >
              Tiempo por Comunidades
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              underline="hover"
              style={{ cursor: "pointer" }}
              onPress={() => {
                setCurrentView("map");
                setTypePanel(4)
              }}
            >
              Mapas de Pronóstico
            </Link>
          </NavbarItem>
        </NavbarContent>
        )}
      <NavbarContent
        style={{ display: "flex", justifyContent: "end" }}
      >
        <NavbarItem>
          <NavBarContext.Provider value={{ historyCities, setHistoryCities, login, searchCity, setSearchCity, setTypePanel, setCurrentView }}>
            <FormSearchCity />
          </NavBarContext.Provider>
        </NavbarItem>
        <NavbarItem>
          <Select
            color="warning"
            style={{ width: isMobile ? "75px" : "200px", marginTop: "15px", marginBottom: "15px" }}
            label={"Unidades"}
            placeholder={isMobile ? "_" : "Selecciona un sistema"}
            value={units}
            onChange={(event) => handleUnitsChange(event.target.value)}
          >
            <SelectItem key="metric" value="metric">
              Métricas
            </SelectItem>
            <SelectItem key="imperial" value="imperial">
              Americanas
            </SelectItem>
          </Select>
        </NavbarItem>
        <NavbarItem>
          <button
            onClick={toggleTheme}
            style={{
              borderRadius: "8px",
              padding: "6px 6px",
              backgroundColor: theme === "light" ? "#333" : "#fff",
              color: theme === "light" ? "#fff" : "#333",
              border: "none",
              cursor: "pointer",
              width: isMobile ? "45px" : "fit-content"
            }}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
