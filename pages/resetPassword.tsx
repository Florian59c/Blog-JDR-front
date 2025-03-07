import { TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ResetPassword() {
    const router = useRouter();
    const { token } = router.query; // Récupérer le token depuis l'URL
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [confirmMessage, setconfirmMessage] = useState('');

    return (
        <div className="blockContainer">
            <h1>Réinitialisation de votre mot de passe</h1>
            <div>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault(); // Empêche le rechargement de la page
                        setconfirmMessage('');
                        setError('');
                        try {
                            if (password !== confirmPassword) {
                                setError("Les mots de passe ne correspondent pas");
                            } else {
                                const response = await axios.post(
                                    `${process.env.NEXT_PUBLIC_SERVER_URL}auth/resetPassword`,
                                    { token, password }
                                );
                                if (response.data === "ok") {
                                    router.push('/login');
                                } else {
                                    setError(response.data);
                                }
                            }
                        } catch (error) {
                            console.error(error);
                            if (axios.isAxiosError(error)) {
                                setError(error.response?.data?.message || 'Une erreur est survenue lors de la modification du mot de passe');
                            } else {
                                setError('Une erreur inconnue s\'est produite');
                            }
                        }
                    }}
                >
                    <div className="inputs">
                        <TextField
                            label="Nouveau mot de passe"
                            type="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            label="Confirmez le nouveau mot de passe"
                            type="Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="buttonContainer">
                        <button type="submit" className="button-style button-color-validate">Réinitialiser le mot de passe</button>
                    </div>
                </form>
                {error && <p className="error-message">{error}</p>}
                <p className="confirmMessage">{confirmMessage}</p>
            </div>
        </div >
    );
}