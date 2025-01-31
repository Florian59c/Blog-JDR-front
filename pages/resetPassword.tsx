import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ResetPassword() {
    const router = useRouter();
    const { token } = router.query; // Récupérer le token depuis l'URL
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    async function reset() {
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}auth/reset-password`,
            { token, password }
        );

        setError(response.data);
    };

    return (
        <div>
            <h2>Réinitialisation du mot de passe</h2>
            <input
                type="password"
                placeholder="Nouveau mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirmez le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={reset}>Réinitialiser</button>
            {error}
        </div>
    );
}