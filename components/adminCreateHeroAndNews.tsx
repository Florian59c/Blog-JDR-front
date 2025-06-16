import { useState } from "react";
import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

type Props = {
    api_url: "hero/createHero" | "news/createHero";
};

export default function AdminCreateHeroAndNews({ api_url }: Props) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [tag, setTag] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}${api_url}`,
                { title, link, tag },
                {
                    withCredentials: true,
                }
            );

            if (response.status === 201) {
                setMessage(response.data.message);
            } else {
                setError(response.data.message ||
                    `Une erreur est survenue lors de la création de ${api_url === "hero/createHero" ? "l\'histoire dont vous êtes le héros" : "la nouvelle"}`
                );
            }
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message ||
                    `Une erreur est survenue lors de la création de ${api_url === "hero/createHero" ? "l\'histoire dont vous êtes le héros" : "la nouvelle"}`
                );
            } else {
                setError('Une erreur inconnue s\'est produite');
            }
        }
    }

    return (
        <div className="blockContainer">
            <form onSubmit={handleCreate}>
                <div className="inputs">
                    <TextField
                        label="Titre*"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        label="Lien*"
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                    <TextField
                        label="Genres"
                        type="text"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />
                </div>
                <div className="button-container">
                    <Button type='submit' variant="outlined" color="success" endIcon={<SendIcon />}>
                        Créer une {api_url === "hero/createHero" ? "histoire dont vous êtes le héros" : "nouvelle"}
                    </Button>
                </div>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p className="confirmMessage">{message}</p>
        </div>
    );
}