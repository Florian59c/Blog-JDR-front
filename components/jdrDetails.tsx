import styles from '../styles/jdrDetails.module.css';
import { useEffect, useState } from 'react';
import DropDownJdr from './dropDownJdr';
import axios from 'axios';
import { JdrInterface } from '../interfaces/JdrInterface';
import CommentForm from './commentForm';
import CommentList from './commentList';

interface JdrDetailsProps {
    is_scenario: boolean;
}

export default function JdrDetails({ is_scenario }: JdrDetailsProps) {
    const pageType = "jdr";
    const [selectedJdr, setSelectedJdr] = useState<string>("none");
    const [sortedJdr, setSortedJdr] = useState<JdrInterface[]>([]);
    const [displayedJdrIds, setDisplayedJdrIds] = useState<number[]>([]); // Utiliser un tableau d'IDs
    const [error, setError] = useState('');
    const [refreshComments, setRefreshComments] = useState(0);

    const handleSelectedJdrChange = (newSelectedJdr: string) => {
        setSelectedJdr(newSelectedJdr);
    };

    function handleCommentAdded() {
        setRefreshComments((prev) => prev + 1); // Incrémente l'état pour forcer le rafraîchissement
    }

    async function getsortedJdr(currentIsScenario = is_scenario) {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}jdr/getsortedJdr`,
                { is_scenario: currentIsScenario, jdrName: selectedJdr === 'none' ? 'default' : selectedJdr }
            );
            setSortedJdr(response.data);
        } catch (error) {
            console.error(error);
            setError("Une erreur est survenue lors de l'affichage des JDR");
        }
    }

    useEffect(() => {
        getsortedJdr(is_scenario);
    }, [selectedJdr, is_scenario]);

    const handleTitleClick = (id: number) => {
        setDisplayedJdrIds((prevIds) => {
            if (prevIds.includes(id)) {
                return prevIds.filter((prevId) => prevId !== id); // Si l'ID existe déjà, on le retire
            } else {
                return [...prevIds, id]; // Sinon, on l'ajoute
            }
        });
    };

    const formatDriveLink = (link: string) => {
        return link.replace(/\/view\?.*$/, "/preview");
    };

    return (
        <div className={styles.container}>
            <DropDownJdr onSelectedJdrChange={handleSelectedJdrChange} />
            {sortedJdr.length === 0 ? (
                <p className={styles.unexist}>Il n'y a pas de contenu {selectedJdr === 'none' ? '' : `pour "${selectedJdr}"`}</p>
            ) : (
                error === '' ? (
                    sortedJdr.map((jdr) => (
                        <div key={jdr.id} className={styles.test}>
                            <hr />
                            <h1 onClick={() => handleTitleClick(jdr.id)}>{jdr.title}</h1>
                            <p className={styles.date}>
                                Ajouté le {new Date(jdr.date).toLocaleDateString()} à {new Date(jdr.date).toLocaleTimeString("fr-FR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                            {displayedJdrIds.includes(jdr.id) && ( // Affiche les détails si l'ID est dans le tableau
                                <div>
                                    <div className={styles.pdf}>
                                        <iframe
                                            src={formatDriveLink(jdr.link)}
                                        />
                                    </div>
                                    <div>
                                        <CommentForm id={jdr.id} pageType={pageType} onCommentAdded={handleCommentAdded} />
                                        <div className={styles.comments}>
                                            <CommentList id={jdr.id} pageType={pageType} refreshComments={refreshComments} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className='error-message'>{error}</p>
                )
            )}
        </div>
    );
}