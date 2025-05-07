import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm, { AuthFormFields } from "../components/AuthForm";

const RegisterPage = () => {
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data: AuthFormFields) => {
        setServerError("");

        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const message = await response.text();
                throw new Error(message);
            }

            const token = await response.text();
            localStorage.setItem("token", token);
            navigate("/");
        } catch (error: any) {
            setServerError(error.message || "Något gick fel");
        }
    };

    return (
        <><h1>Registrera dig här</h1>
            <AuthForm onSubmit={onSubmit} serverError={serverError}
                                               buttonText="Registrera dig"/></>
    );
};

export default RegisterPage;
