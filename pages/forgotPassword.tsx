import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import IsConnectedError from "../components/isConnectedError";

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState('');
    const [confirmMessage, setconfirmMessage] = useState('');

    const checkConnection = async () => {
        try {
            const response = await axios.get('/api/checkIsConnected'); // Appeler l'API route
            setIsConnected(response.data.isConnected);
        } catch (error) {
            console.error('Error checking connection:', error);
            setIsConnected(false);
        }
    };

    useEffect(() => {
        checkConnection();
    }, []);

    return (
        <div>
            {isConnected ? (
                <IsConnectedError />
            ) : (
                <div className="blockContainer">
                    <h1>Vous avez oublié votre mot de passe, procédez à l'envoi d'un mail de réinitialisation</h1>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault(); // Empêche le rechargement de la page
                            setconfirmMessage('');
                            setError('');
                            try {
                                const response = await axios.post(
                                    `${process.env.NEXT_PUBLIC_SERVER_URL}mailer/forgotPassword`,
                                    { email }
                                );
                                if (response.data === "ok") {
                                    setconfirmMessage("Un mail vous a été envoyé. S'il n'apparaît pas, vérifiez vos spams");
                                } else {
                                    setError(response.data);
                                }
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
                            <button type="submit" className="button-style button-color-validate">Envoyer le mail</button>
                        </div>
                    </form>
                    <p className="confirmMessage">{confirmMessage}</p>
                </div>
            )}
        </div>
    );
}