import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthForm, {AuthFormFields} from "../components/AuthForm";
import {useAuth} from "../context/AuthContext";

const LoginPage: React.FC = () => {
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();
    const {login} = useAuth();

    const onSubmit = async (data: AuthFormFields) => {
        setServerError("");

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const message = await response.text();
                throw new Error(message);
            }

            const body = await response.json() as { token: string };
            localStorage.setItem("token", body.token);

            login();
            navigate("/profile");
        } catch (error: any) {
            setServerError(error.message || "Något gick fel");
        }
    };

    return (
        <>
            <h1 className="text-center">Logga in här</h1>
            <AuthForm onSubmit={onSubmit}
                serverError={serverError}
                buttonText="Logga in"
            />
        </>
    );
};

export default LoginPage;
