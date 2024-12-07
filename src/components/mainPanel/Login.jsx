import React, { useState, useContext } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Input, Button, Checkbox } from '@nextui-org/react';
import { LoginContext } from '../../context/Contexts';
import fetchCities from '../../api/cities/fetchCities';
import fetchLogin from '../../api/auth/fetchLogin';

const Login = () => {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setTypePanel, setLogin, setSelectCities, setSelectCity } = useContext(LoginContext);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [captchaToken, setCaptchaToken] = useState(null);

    const handleFetchCiudades = (newCities) => {
        if (newCities.length > 0) {
            setSelectCities(newCities);
            setSelectCity(null);
        }
    };
    const handleFetchCiudadesHistory = (newCities) => {
        if (newCities.length > 0) {
            setHistoryCities(newCities);
        }
    }

    const handleRememberChange = () => {
        setRemember(!remember);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage('');

        if (!captchaToken) {
            setError('Por favor completa el CAPTCHA.');
            setLoading(false);
            return;
        }
        const result = await fetchLogin({
            ...formData,
            recaptcha_token: captchaToken
        });
        console.log(result)
        if (result.success) {
            fetchCities("favorites", handleFetchCiudades);
            fetchCities("history", handleFetchCiudadesHistory);
            setLogin(result.user);
            setTypePanel(1);
            setSuccessMessage(result.message);
        } else {
            // Error en el inicio de sesión
            setError(result.message || 'Error al iniciar sesión.');
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

                
                    <Checkbox
                        size="sm"
                        style={{ marginBottom: "10px", width: "100%" }}
                        type="checkbox"
                        label="Mantener sesión"
                        checked={remember}
                        onChange={handleRememberChange}
                    >
                        Mantener sesión
                    </Checkbox>

                <ReCAPTCHA
                    style={{ marginBottom: "10px" }}
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    onChange={handleCaptchaChange}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? "Cargando..." : "Iniciar Sesión"}
                </Button>
            </form>
        </div>
    );
};

export default Login;
