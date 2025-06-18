import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import axios from "axios";

export default function AdminCreateJdrNameInList({ onSuccess }: { onSuccess?: () => void }) {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    return (
        <div>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    setMessage("");
                    setError("");

                    try {
                        const response = await axios.post(
                            `${process.env.NEXT_PUBLIC_SERVER_URL}jdr-list/createJdrNameInList`,
                            { name },
                            { withCredentials: true }
                        );
                        if (response.status === 201) {
                            setMessage(response.data.message);
                            setName("");
                            setTimeout(() => {
                                if (onSuccess) onSuccess();
                            }, 500);
                        } else {
                            setError(response.data.message || 'Une erreur est survenue lors de la création');
                        }
                    } catch (error) {
                        console.error(error);
                        if (axios.isAxiosError(error)) {
                            setError(error.response?.data?.message || 'Une erreur est survenue lors de la création');
                        } else {
                            setError('Une erreur inconnue s\'est produite');
                        }
                    }
                }}
            >
                <TextField
                    type="text"
                    label="Nom du JDR"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="outlined"
                    color="success"
                    sx={{ width: '100%' }}
                    endIcon={<SendIcon />}
                >
                    Ajouté un JDR à la liste
                </Button>
            </form >
            {error && <p className="error-message">{error}</p>}
            <p className="confirmMessage">{message}</p>
        </div >
    );
}