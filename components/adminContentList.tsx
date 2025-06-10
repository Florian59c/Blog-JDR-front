import styles from '../styles/adminContentList.module.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { HeroStoryInterface } from "../interfaces/HeroStoryInterface";
import { Button } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import { NewsInterface } from '../interfaces/NewsInterface';
import { JdrInterface } from '../interfaces/JdrInterface';

interface AdminContentListProps {
    api_url: string;
}

export default function AdminContentList({ api_url }: AdminContentListProps) {
    const [contents, setContents] = useState<(HeroStoryInterface | NewsInterface | JdrInterface)[]>([]);
    const [error, setError] = useState('');

    async function getHeroStories() {
        setError('');
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}${api_url}`,);
            setContents(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Une erreur est survenue lors de l\'affichage');
            } else {
                setError('Une erreur inconnue s\'est produite');
            }
        }
    }

    useEffect(() => {
        getHeroStories();
    }, []);

    return (
        <div>
            {contents.length !== 0 ? (
                <div>
                    {contents.map((content) => {
                        return (
                            <div key={content.id} className={`commentContainer ${styles.container}`}>
                                <p className={styles.date}>
                                    Ajouté le {new Date(content.date)
                                        .toLocaleDateString()} à {new Date(content.date)
                                            .toLocaleTimeString("fr-FR", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                </p>
                                <p className={styles.title}>{content.title}</p>
                                <div className={styles.buttons}>
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        sx={{ width: '100%' }}
                                        startIcon={<EditOutlinedIcon />}
                                    >
                                        Modifier
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        sx={{ width: '100%' }}
                                        startIcon={<DeleteIcon />}
                                    >
                                        Supprimer
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className={styles.error}>
                    {
                        error ?
                            <p className="error-message">{error}</p>
                            :
                            <p>Il n'y a aucun contenu</p>
                    }
                </div >
            )}
        </div>
    );
}