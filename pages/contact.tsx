import { TextField } from "@mui/material";
import { useState } from "react";

export default function Contact() {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [confirmMessage, setconfirmMessage] = useState('');

    return (
        <div className="blockContainer">
            <h1>Me contacter</h1>
            <div>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setconfirmMessage('');
                        setError('');
                        // la fonction pour envoyer le mail depuis le back ICI
                    }}
                >
                    <div className="inputs">
                        <TextField
                            label="Adresse Email"
                            type="email"
                            autoComplete="email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Ajouter un objet"
                            type="text"
                            variant="outlined"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Contenu du message"
                            multiline
                            rows={6}
                            type="text"
                            variant="outlined"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="buttonContainer">
                        <button type="submit" className="button-style button-color-validate">Envoyer l'email</button>
                    </div>
                </form>
                <p className="confirmMessage">{confirmMessage}</p>
            </div>
        </div>
    );
}