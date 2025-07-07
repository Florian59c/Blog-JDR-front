import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ResetPassword() {
    const router = useRouter();
    const { token } = router.query; // Récupérer le token depuis l'URL
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [confirmMessage, setConfirmMessage] = useState('');

    async function handleResetPassword(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Empêche le rechargement de la page
        setConfirmMessage('');
        setError('');

        try {
            if (password !== confirmPassword) {
                setError("Les mots de passe ne correspondent pas");
            } else {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}auth/resetPassword`,
                    { token, password }
                )

                if (response.status === 201 && response.data.message === 'Mot de passe réinitialisé avec succès') {
                    setConfirmMessage(response.data.message);
                    router.push('/login');
                } else {
                    throw new Error(response.data.message || 'Une erreur est survenue');
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
    }

    return (
        <div className="blockContainer">
            <h1>Réinitialisation de votre mot de passe</h1>
            <div>
                <form onSubmit={handleResetPassword}>
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
                    <div className="button-container">
                        <Button type="submit" variant="outlined" color="success" endIcon={<SendIcon />}>Réinitialiser le mot de passe</Button>
                    </div>
                </form>
                {error && <p className="error-message">{error}</p>}
                <p className="confirmMessage">{confirmMessage}</p>
            </div>
        </div >
    );
}