import React, { useState, useContext } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Input, Button } from "@nextui-org/react";
import { RegisterContext } from '../../../context/Contexts';
import fetchRegister from '../../../api/auth/fetchRegister';
import validateInputs from "./validaciones";
import './Register.css';


// Componente para registrarse en el mainPanel
const Register = () => {
    const setTypePanel = useContext(RegisterContext);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [error, setError] = useState(null);
    const [captchaToken, setCaptchaToken] = useState(null);

    // Evento de cambio en el input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (error) {
            setError(null);
        }
    };

    // Evento de enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        setError(null);

        // Validación de los datos del formulario
        const validationError = validateInputs(formData);
        if (validationError) {
            setError(validationError);
            return;
        }

        // Validación del CAPTCHA
        if (!captchaToken) {
            setError('Por favor completa el CAPTCHA.');
            setLoading(false);
            return;
        }

        const result = await fetchRegister({ ...formData, recaptcha_token: captchaToken });
        if (result.success) {
            window.alert("Registro exitoso");
            setTypePanel(7); // Cambia al panel de inicio de sesión
        } else {
            setError(result.message);
        }
    };

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    return (
        <div className="register-form">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <Input
                        label="Nombre"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Contraseña"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Confirmar contraseña"
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Mensaje de error si hay algún error en el formulario */}
                {error && <p className="error-message">{error}</p>}

                <ReCAPTCHA
                    style={{ marginBottom: "10px" }}
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    onChange={handleCaptchaChange}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? "Cargando..." : "Registrar"}
                </Button>
            </form>
        </div>
    );
};

export default Register;