import React, { useContext, useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import FetchLogin from '../../api/FetchLogin';
import { LoginContext } from '../../context/Contexts';
import FetchCiudades from '../../api/FetchCiudades';
import './Register.css';

const Login = () => {
    const appUrl = import.meta.env.VITE_APP_URL;
    const [loading, setLoading] = useState(true);
    const { setTypePanel, setLogin, setSelectCities, setSelectCity } = useContext(LoginContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [remember, setRemember] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFetchCiudades = (newCities) => {
        if (newCities.length > 0) {
            setSelectCities(newCities);
            setSelectCity(null);
        }
    }

    const handleRememberChange = () => {
        setRemember(!remember);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage('');

        const result = await FetchLogin(formData);

        if (result.success) {
            setSuccessMessage(result.message);
            setLogin(result.data.user);
            FetchCiudades(`${appUrl}:8000/ciudades`, "GET", null, handleFetchCiudades);
            setLoading(false)
            setTypePanel(1);
        } else {
            setError(result.message);
            setLoading(false)
        }
    };

    return (
        <div className="login-form">
            <h2>Inicio de Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <Input
                        label="Email"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <Input
                        label="Contraseña"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={handleRememberChange}
                        />
                        Mantener sesión
                    </label>
                </div>
                <Button type="submit">Iniciar Sesión</Button>
            </form>
        </div>
    );
};

export default Login;