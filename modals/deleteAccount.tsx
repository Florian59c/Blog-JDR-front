import styles from '../styles/deleteAccount.module.css';
import Cancel from '../assets/img/cancel.png';

export default function deleteAccount({ setIsOpen }: { setIsOpen: (value: boolean) => void }) {
    return (
        <div className={styles.container} onClick={() => setIsOpen(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.imgContainer}>
                    <img src={Cancel.src} alt="Croix permettant de fermer la fenêtre" onClick={() => setIsOpen(false)} />
                </div>
                <div className={styles.text}>
                    <p>Etes vous sûr de vouloir supprimer votre compte ?</p>
                    <p className={styles.alert}>Attention ! La suppression est définitive !!</p>
                </div>
                <button className="button-style button-color-error">Supprimer mon compte</button>
            </div>
        </div>
    );
}