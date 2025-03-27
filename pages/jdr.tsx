import JdrDetails from '../components/jdrDetails';
import styles from '../styles/jdr.module.css';
import { useState } from 'react';

export default function JDR() {
    const [isScenario, setIsScenario] = useState(false);

    return (
        <div>
            <div className={styles.header}>
                <h1 onClick={() => setIsScenario(false)} className={isScenario ? styles.notSelected : ''}>
                    Aides de jeu
                </h1>
                <h1 onClick={() => setIsScenario(true)} className={isScenario ? '' : styles.notSelected}>
                    Scénarios
                </h1>
            </div>
            <div className={styles.container}>
                <JdrDetails is_scenario={isScenario} />
            </div>
        </div >
    );
}