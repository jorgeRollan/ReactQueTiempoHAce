const validateInputs = (formData) => {
    if (!formData.name || !formData.name.trim()) {
        return "El campo Nombre es obligatorio";
    }

    if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
        return "El nombre solo puede contener letras y espacios";
    }

    if (formData.name.length > 50) {
        return "El nombre no puede exceder los 50 caracteres";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        return "Por favor, ingresa un email válido";
    }

    if (formData.email.length > 100) {
        return "El email no puede exceder los 100 caracteres";
    }

    if (formData.password.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres";
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&.*])[A-Za-z\d!@#$%^&.*]{8,}$/.test(formData.password)) {
        return "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial";
    }

    if (formData.password.length > 50) {
        return "La contraseña no puede exceder los 50 caracteres";
    }

    if (formData.password !== formData.password_confirmation) {
        return "Las contraseñas no coinciden";
    }

    return null;
};

export default validateInputs;