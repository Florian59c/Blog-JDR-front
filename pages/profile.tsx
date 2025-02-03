import { TextField } from "@mui/material";
import axios from "axios";
import { NextApiRequest } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Profile() {
    const [isConnected, setIsConnected] = useState(false);
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [confirmMessage, setconfirmMessage] = useState('');
    const router = useRouter();

    return (
        <div>
            <div className="blockContainer">
                <h1>Page de profil</h1>
                <div>
                    <h1>logout</h1>
                    <button onClick={async () => {
                        await axios.post(
                            `${process.env.NEXT_PUBLIC_SERVER_URL}auth/logout`, {}, { withCredentials: true });
                        router.push('/login');
                    }}>
                        Se déconnecter
                    </button>
                </div>



                <div>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault(); // Empêche le rechargement de la page
                            setconfirmMessage('');
                            setError('');
                            try {
                                const response = await axios.post(
                                    `${process.env.NEXT_PUBLIC_SERVER_URL}user/updateUser`,
                                    { pseudo, email },
                                    {
                                        withCredentials: true,
                                    }
                                )
                                if (response.data === "ok") {
                                    setconfirmMessage("Votre profil a été modifié");
                                } else {
                                    setError(response.data);
                                }
                            } catch (error) {
                                console.error(error);
                                setError("Une erreur inconnue s'est produite");
                            }
                        }}
                    >
                        <div className="inputs">
                            <TextField
                                label="Pseudo"
                                type="text"
                                autoComplete="text"
                                value={pseudo}
                                onChange={(e) => setPseudo(e.target.value)}
                            />
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
                            <button type="submit" className="button-style button-color-validate">Modifier mon profil</button>
                        </div>
                    </form>
                    <p className="confirmMessage">{confirmMessage}</p>
                </div>
            </div>




        </div>
    );
}