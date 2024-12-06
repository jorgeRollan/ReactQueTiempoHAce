import React, { useContext, useEffect, useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import FetchLogin from '../../api/FetchLogin';
import { LoginContext } from '../../context/Contexts';
import FetchCiudades from '../../api/FetchCiudades';
import './Register.css';

// Function to dynamically load the reCAPTCHA script
const LoadReCaptcha = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }, []);
};

const Login = () => {
    const appUrl = import.meta.env.VITE_APP_URL;
    const [loading, setLoading] = useState(false);
    const { setTypePanel, setLogin, setSelectCities, setSelectCity } = useContext(LoginContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [remember, setRemember] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Token state for reCAPTCHA
    const [captchaToken, setCaptchaToken] = useState('');

    // Load reCAPTCHA script when the component mounts
    LoadReCaptcha();

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
    };

    const handleRememberChange = () => {
        setRemember(!remember);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage('');
    
        // Verify reCAPTCHA
        const token = window.grecaptcha?.getResponse();
        if (!token) {
            setError('Por favor completa el CAPTCHA.');
            setLoading(false);
            return;
        }
    
        setCaptchaToken(token); // Store token if needed later
    
        const loginData = {
            ...formData,
            recaptcha_token: token, // Send the CAPTCHA token here
        };
    
        const result = await FetchLogin(loginData);
    
        if (result.success) {
            setSuccessMessage(result.message);
            setLogin(result.data.user);
            FetchCiudades(`${appUrl}:8000/ciudades`, "GET", null, handleFetchCiudades);
            setTypePanel(1);
        } else {
            setError(result.message);
        }
        setLoading(false);
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
                        <Input
                            type="checkbox"
                            checked={remember}
                            onChange={handleRememberChange}
                        />
                        Mantener sesión
                    </label>
                </div>

                <Button type="submit" disabled={loading}>
                    {loading ? "Cargando..." : "Iniciar Sesión"}
                </Button>
            </form>

            <div className="form-control">
                <div className="g-recaptcha" data-sitekey="6LfS3oYqAAAAADZF_cH86SxbGlShbNnJKLdxx6eS"></div>
                <div className="text-danger" id="recaptchaError"></div>
            </div>
        </div>
    );
};

export default Login;