import styles from '../styles/news.module.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { NewsInterface } from "../interfaces/NewsInterface";

export default function News() {
    const [news, setNews] = useState<NewsInterface[]>([]);

    async function getHeroStories() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}news/getAllNewsWithNewDate`,);
            setNews(response.data);
        } catch (error) {
            console.error('Error checking connection:', error);
        }
    }

    useEffect(() => {
        getHeroStories();
    }, []);

    return (
        <div>
            {news.length === 0 ? (
                <p className={styles.errorMessage}>Nous n'avons trouvé aucune nouvelle</p>
            ) : (
                <div>
                    <div className={styles.displayMobile}>
                        <p>vue mobile</p>
                    </div>
                    <div className={styles.displayPC}>
                        <p>vue pc</p>
                    </div>
                </div>
            )}
        </div>
    );
}