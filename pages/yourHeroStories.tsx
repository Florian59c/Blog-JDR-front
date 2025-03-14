import styles from '../styles/yourHeroStories.module.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { HeroStoryInterface } from "../interfaces/HeroStoryInterface";
import Eye from "../assets/img/eye.png";
import Download from "../assets/img/download-arrow.png";
import Comment from "../assets/img/comment.png";
import CommentForm from '../components/commentForm';
import CommentList from '../components/commentList';
import { Tooltip } from '@mui/material';

export default function yourHeroStories() {
    const pageType = "hero";
    const [heroStories, setHeroStories] = useState<HeroStoryInterface[]>([]);
    const [visibleComments, setVisibleComments] = useState<Record<number, boolean>>({}); // Stocke un état pour chaque heroStory.id
    const [refreshComments, setRefreshComments] = useState(0);

    function handleCommentAdded() {
        setRefreshComments((prev) => prev + 1); // Incrémente l'état pour forcer le rafraîchissement
    }

    async function getHeroStories() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}hero/getAllHeroWithNewDate`,);
            setHeroStories(response.data);
        } catch (error) {
            console.error('Error checking connection:', error);
        }
    }

    function handleDownload(heroStory: HeroStoryInterface) {
        const fileId = heroStory.link.split("/d/")[1].split("/")[0]; // Extraire l'ID du fichier depuis l'URL
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = ""; // Le nom du fichier peut être changé ici / par défaut, c'est le nom du fichier sur google drive
        link.click();
    };

    function toggleComment(id: number) {
        setVisibleComments((prev) => ({
            ...prev,
            [id]: !prev[id], // Inverse seulement l'état de l'instance concernée
        }));
    };

    useEffect(() => {
        getHeroStories();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Histoires dont vous êtes le héros</h1>
            {heroStories.length === 0 ? (
                <p className={styles.errorMessage}>Il n'y a pas de contenu pour la page : Histoires dont vous êtes le héros</p>
            ) : (
                <div>
                    {heroStories.map((heroStory) => {
                        return (
                            <div key={heroStory.id} className={styles.heroStoryContainer}>
                                <div className={styles.documents}>
                                    <p className={styles.title}>{heroStory.title}</p>
                                    <p className={styles.date}>
                                        Ajouté le {new Date(heroStory.date).toLocaleDateString()} à {new Date(heroStory.date).toLocaleTimeString("fr-FR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                    <p className={styles.tag}>{heroStory.tag}</p>
                                    <div className={styles.icons}>
                                        <Tooltip title="Visionner" placement="top" arrow>
                                            <a href={heroStory.link} target="_blank" rel="noopener noreferrer">
                                                <img src={Eye.src} alt="Visionner le document" />
                                            </a>
                                        </Tooltip>
                                        <Tooltip title="Télécharger" placement="top" arrow>
                                            <img
                                                src={Download.src}
                                                alt="Télécharger le document"
                                                onClick={() => handleDownload(heroStory)}
                                            />
                                        </Tooltip>
                                        <Tooltip title="Afficher ou cacher les commentaires" placement="top" arrow>
                                            <img
                                                src={Comment.src}
                                                alt="Afficher ou cacher les commentaires"
                                                onClick={() => toggleComment(heroStory.id)}
                                            />
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className={styles.commentContainer}>
                                    {visibleComments[heroStory.id] &&
                                        <div>
                                            <hr />
                                            <CommentForm id={heroStory.id} pageType={pageType} onCommentAdded={handleCommentAdded} />
                                            <CommentList id={heroStory.id} pageType={pageType} refreshComments={refreshComments} />
                                        </div>
                                    }
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}