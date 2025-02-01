import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    return (
        <div className="blockContainer">
            <h1>test</h1>
            <form
                onSubmit={async (e) => {
                    e.preventDefault(); // Empêche le rechargement de la page
                    setError('');
                    try {
                        const response = await axios.post(
                            `${process.env.NEXT_PUBLIC_SERVER_URL}mailer/forgotPassword`,
                            { email }
                        );
                        setError(response.data);
                    } catch (error) {
                        console.error(error);
                        setError('Une erreur inconnue s\'est produite');
                    }
                }}
            >
                <div className="inputs">
                    <TextField
                        label="Adresse Email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="buttonContainer">
                    <button type="submit" className="button-style button-color-validate">réinitialisé</button>
                </div>
            </form>
        </div>
    );
}