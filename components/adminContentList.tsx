import styles from '../styles/adminContentList.module.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { HeroStoryInterface } from "../interfaces/HeroStoryInterface";
import { Button } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdminContentList() {
    const [contents, setContents] = useState<HeroStoryInterface[]>([]);;

    async function getHeroStories() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}hero/getAllHeroWithNewDate`,);
            setContents(response.data);
        } catch (error) {
            console.error('Error checking connection:', error);
        }
    }

    useEffect(() => {
        getHeroStories();
    }, []);

    return (
        <div>
            {contents.map((content) => {
                return (
                    <div className={`commentContainer ${styles.container}`}>
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
    );
}