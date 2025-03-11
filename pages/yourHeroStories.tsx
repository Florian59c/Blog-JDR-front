import styles from '../styles/yourHeroStories.module.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { HeroStoryInterface } from "../interfaces/HeroStoryInterface";
import Eye from "../assets/img/eye.png";
import Download from "../assets/img/download-arrow.png";
import Comment from "../assets/img/comment.png";
import CommentForm from '../components/commentForm';

export default function yourHeroStories() {
    const pageType = "hero";
    const [heroStories, setHeroStories] = useState<HeroStoryInterface[]>([]);
    const [visibleComments, setVisibleComments] = useState<Record<number, boolean>>({}); // Stocke un état pour chaque heroStory.id

    async function getHeroStories() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}hero/getAllHeroWithNewDate`,);
            setHeroStories(response.data);
            console.log(response.data);
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
                            <div className={styles.heroStoryContainer}>
                                <div key={heroStory.id} className={styles.documents}>
                                    <p className={styles.title}>{heroStory.title}</p>
                                    <p className={styles.date}>
                                        Ajouté le {new Date(heroStory.date).toLocaleDateString()} à {new Date(heroStory.date).toLocaleTimeString("fr-FR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                    <p className={styles.tag}>{heroStory.tag}</p>
                                    <div className={styles.icons}>
                                        <a href={heroStory.link} target="_blank" rel="noopener noreferrer">
                                            <img src={Eye.src} alt="Visionner le document" />
                                        </a>
                                        <img
                                            src={Download.src}
                                            alt="Télécharger le document"
                                            onClick={() => handleDownload(heroStory)}
                                        />
                                        <img
                                            src={Comment.src}
                                            alt="Afficher ou cacher les commentaires"
                                            onClick={() => toggleComment(heroStory.id)}
                                        />
                                    </div>
                                </div>
                                <div className={styles.commentContainer}>
                                    {visibleComments[heroStory.id] &&
                                        <div>
                                            <hr />
                                            <CommentForm postId={heroStory.id} pageType={pageType} />
                                            <p>Listes des commentaires pour {heroStory.title}</p>
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