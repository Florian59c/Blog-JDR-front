import styles from '../styles/scenario.module.css';
import { useEffect, useState } from 'react';
import DropDownJdr from './dropDownJdr';
import axios from 'axios';
import { JdrInterface } from '../interfaces/JdrInterface';

export default function Scenario() {
    const [selectedJdr, setSelectedJdr] = useState<string>("none");
    const [sortedJdr, setSortedJdr] = useState<JdrInterface[]>([]);
    const [error, setError] = useState('');
    const is_scenario = true

    const handleSelectedJdrChange = (newSelectedJdr: string) => {
        setSelectedJdr(newSelectedJdr);
    };

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

    return (
        <div className={styles.container}>
            <DropDownJdr onSelectedJdrChange={handleSelectedJdrChange} />
            {sortedJdr.length === 0 ? (
                <p>Il n'y a pas de contenu {selectedJdr === 'none' ? '' : `pour ${selectedJdr}`}</p>
            ) : (
                error === '' ? (
                    sortedJdr.map((jdr) => (
                        <div key={jdr.title}>
                            {jdr.title}
                        </div>
                    ))
                ) : (
                    <p>{error}</p>
                )
            )}
        </div>
    );
}