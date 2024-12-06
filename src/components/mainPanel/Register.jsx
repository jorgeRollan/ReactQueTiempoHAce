import React, { useState, useContext } from 'react';
import { Input, Button } from "@nextui-org/react";
import { RegisterContext } from '../../context/Contexts';
import FetchRegister from '../../api/FetchRegister';
import validateInputs from "./Validaciones";
import './Register.css';

const Register = () => {
    const setTypePanel = useContext(RegisterContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [error, setError] = useState(null);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const validationError = validateInputs(formData);
        if (validationError) {
            setError(validationError);
            return;
        }

        const result = await FetchRegister(formData);
        if (result.success) {
            window.alert("Registro exitoso");
            setTypePanel(7);
        } else {
            setError(result.message);
        }
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

                {error && <p className="error-message">{error}</p>}

                <Button type="submit">Registrar</Button>
            </form>
        </div>
    );
};

export default Register;
