import { Button, TextField } from "@mui/material";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
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

                                if (response.status === 201 && response.data?.message) {
                                    setconfirmMessage(response.data.message);
                                } else {
                                    setError(response.data);
                                }
                            } catch (error) {
                                console.error(error);
                                if (axios.isAxiosError(error)) {
                                    setError(error.response?.data?.message || 'Une erreur est survenue lors de l\'envoi du mail');
                                } else {
                                    setError('Une erreur inconnue s\'est produite');
                                }
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
                        <div className="btn">
                            <Button type="submit" variant="outlined" color="success" endIcon={<EmailOutlinedIcon />}>Envoyer le mail</Button>
                        </div>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                    <p className="confirmMessage">{confirmMessage}</p>
                </div>
            )}
        </div>
    );
}