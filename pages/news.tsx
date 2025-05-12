import styles from '../styles/news.module.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { NewsInterface } from "../interfaces/NewsInterface";
import RightArrow from "../assets/img/right-arrow.png";
import classNames from 'classnames';
import CommentForm from '../components/commentForm';
import CommentList from '../components/commentList';

export default function News() {
    const pageType = "news";
    const [news, setNews] = useState<NewsInterface[]>([]);
    const [activeIds, setActiveIds] = useState<number[]>([]);
    const [refreshComments, setRefreshComments] = useState(0);

    function handleCommentAdded() {
        setRefreshComments((prev) => prev + 1); // Incrémente l'état pour forcer le rafraîchissement
    }

    function toggleActive(id: number) {
        setActiveIds((prev) =>
            prev.includes(id) ? prev.filter((activeId) => activeId !== id) : [...prev, id]
        );
    }

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

    const formatDriveLink = (link: string) => {
        return link.replace(/\/view\?.*$/, "/preview");
    };

    return (
        <div>
            {news.length === 0 ? (
                <p className={styles.errorMessage}>Nous n'avons trouvé aucune nouvelle</p>
            ) : (
                <div>
                    <div className={classNames(styles.displayMobile, 'blockContainer')}>
                        {news.map((newsItem) => {
                            const isActive = activeIds.includes(newsItem.id);
                            return (
                                <div key={newsItem.id}>
                                    <div className={styles.newsHeader} onClick={() => toggleActive(newsItem.id)}>
                                        <h1 className={isActive ? styles.active : ''}>{newsItem.title}</h1>
                                        <img src={RightArrow.src} alt="flèche" className={classNames(styles.arrow, { [styles.arrowActive]: isActive })} />
                                    </div>
                                    {isActive && (
                                        <div className={styles.newsContent}>
                                            <p className={styles.date}>
                                                Ajouté le {new Date(newsItem.date)
                                                    .toLocaleDateString()} à {new Date(newsItem.date)
                                                        .toLocaleTimeString("fr-FR", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                            </p>
                                            <div className={styles.pdf}>
                                                <iframe
                                                    src={formatDriveLink(newsItem.link)}
                                                />
                                            </div>
                                            <div>
                                                <CommentForm id={newsItem.id} pageType={pageType} onCommentAdded={handleCommentAdded} />
                                                <div className={styles.comments}>
                                                    <CommentList id={newsItem.id} pageType={pageType} refreshComments={refreshComments} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className={classNames(styles.displayPC, styles.PCVue)}>
                        <div className={classNames('blockContainer', styles.newsHeader)}>header</div>
                        <div className={classNames('blockContainer', styles.newsContent)}>content</div>
                    </div>
                </div>
            )
            }
        </div >
    );
}