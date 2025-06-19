import { Button, Checkbox, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import axios from "axios";

export default function CreateAdmin() {
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [secretCode, setsetSecretCode] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}user/createAdmin`,
                { pseudo, email, password, confirmPassword, checkCGU: isChecked, secretCode }
            );
            if (response.status === 201) {
                setMessage(response.data.message);
            } else {
                setError(response.data?.message || 'Une réponse inattendue a été reçue');
            }
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Une erreur est survenue lors de la création du compte administrateur');
            } else {
                setError('Une erreur inconnue s\'est produite');
            }
        }
    }

    return (
        <div className="blockContainer">
            <h1>Formulaire de création de compte administrateur</h1>
            <div>
                <form onSubmit={handleCreate}>
                    <div className="inputs">
                        <TextField
                            label="Pseudo"
                            type="text"
                            value={pseudo}
                            onChange={(e) => setPseudo(e.target.value)}
                        />
                        <TextField
                            label="Adresse Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Mot de passe"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            label="Confirmer le mot de passe"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div className="checkbox">
                            <Checkbox checked={isChecked} onChange={(event) => { setIsChecked(event.target.checked) }} />
                            <p>En acceptant les <a
                                href="https://drive.google.com/file/d/1kW-Ztlw_R6uufBCiz8m51YLgXBRc6w-R/view?usp=drive_link"
                                className="link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Conditions Générales d'Utilisation
                            </a>, l’administrateur s’engage à respecter la réglementation du site et à faire un usage responsable de ses privilèges</p>
                        </div>
                        <TextField
                            label="Code secret"
                            type="password"
                            value={secretCode}
                            onChange={(e) => setsetSecretCode(e.target.value)}
                        />
                    </div>
                    <div className="button-container">
                        <Button type="submit" variant="outlined" color="success" endIcon={<SendIcon />}>Créer le compte administrateur</Button>
                    </div>
                </form>
            </div>
            {error && <p className="error-message">{error}</p>}
            <p className="confirmMessage">{message}</p>
        </div>
    );
}