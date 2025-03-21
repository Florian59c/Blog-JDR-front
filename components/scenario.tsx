import styles from '../styles/scenario.module.css';
import { useEffect, useState } from 'react';
import DropDownJdr from './dropDownJdr';
import axios from 'axios';
import { JdrInterface } from '../interfaces/JdrInterface';
import CommentForm from './commentForm';
import CommentList from './commentList';

export default function Scenario() {
    const pageType = "jdr";
    const [selectedJdr, setSelectedJdr] = useState<string>("none");
    const [sortedJdr, setSortedJdr] = useState<JdrInterface[]>([]);
    const [displayedJdrIds, setDisplayedJdrIds] = useState<number[]>([]); // Utiliser un tableau d'IDs
    const [error, setError] = useState('');
    const [refreshComments, setRefreshComments] = useState(0);
    const is_scenario = true;

    const handleSelectedJdrChange = (newSelectedJdr: string) => {
        setSelectedJdr(newSelectedJdr);
    };

    function handleCommentAdded() {
        setRefreshComments((prev) => prev + 1); // Incrémente l'état pour forcer le rafraîchissement
    }

    async function getsortedJdr() {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}jdr/getsortedJdr`,
                { is_scenario, jdrName: selectedJdr === 'none' ? 'default' : selectedJdr }
            )
            setSortedJdr(response.data);
        } catch (error) {
            console.error(error);
            setError("Une erreur est survenue lors de l'affichage de vos informations personnelles")
        }
    }

    useEffect(() => {
        getsortedJdr();
    }, [selectedJdr]);

    const handleTitleClick = (id: number) => {
        setDisplayedJdrIds((prevIds) => {
            if (prevIds.includes(id)) {
                return prevIds.filter((prevId) => prevId !== id); // Si l'ID existe déjà, on le retire
            } else {
                return [...prevIds, id]; // Sinon, on l'ajoute
            }
        });
    };

    return (
        <div className={styles.container}>
            <DropDownJdr onSelectedJdrChange={handleSelectedJdrChange} />
            {sortedJdr.length === 0 ? (
                <p>Il n'y a pas de contenu {selectedJdr === 'none' ? '' : `pour ${selectedJdr}`}</p>
            ) : (
                error === '' ? (
                    sortedJdr.map((jdr) => (
                        <div key={jdr.id}>
                            <hr />
                            <h1 onClick={() => handleTitleClick(jdr.id)}>{jdr.title}</h1>
                            {displayedJdrIds.includes(jdr.id) && ( // Affiche les détails si l'ID est dans le tableau
                                <div>
                                    {jdr.link}
                                    <div>
                                        <CommentForm id={jdr.id} pageType={pageType} onCommentAdded={handleCommentAdded} />
                                        <CommentList id={jdr.id} pageType={pageType} refreshComments={refreshComments} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>{error}</p>
                )
            )}
        </div>
    );
}
