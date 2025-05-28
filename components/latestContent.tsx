import { useEffect, useState } from 'react';
import styles from '../styles/latestContent.module.css';
import axios from 'axios';
import { LatestContentInterface } from '../interfaces/LatestContentInterface';
import Link from 'next/link';

export default function LatestContent() {
    const [contents, setContents] = useState<LatestContentInterface[]>([]);
    const [error, setError] = useState('');

    async function latestContent() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}latest-content/get10LatestContent`);
            setContents(response.data);
        } catch (error) {
            console.error('Error checking connection:', error);
            setContents([]);
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Une erreur est survenue lors de l\'affichage des commentaires signalés');
            } else {
                setError('Une erreur inconnue s\'est produite');
            }
        }
    };

    useEffect(() => {
        latestContent();
    }, []);

    return (
        <div className={styles.container}>
            <p className={styles.title}>Derniers ajouts :</p>
            {contents.length !== 0 ? (
                <div>
                    {contents.map((content, index) => {
                        return (
                            <div key={index}>
                                {index !== 0 && <hr />}
                                <Link href={`/${content.page_link}`} className={styles.singleContent}>
                                    <p className={styles.contentTitle}>{content.title}</p>
                                    <p>({content.page_name})</p>
                                    <p className={styles.date}>
                                        Ajouté le {new Date(content.date).toLocaleDateString()} à {new Date(content.date).toLocaleTimeString("fr-FR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className={styles.error}>
                    {
                        error ?
                            <p>{error}</p>
                            :
                            <p>Il n'y a aucun contenu sur le site actuellement</p>
                    }
                </div >
            )}
        </div>
    );
}