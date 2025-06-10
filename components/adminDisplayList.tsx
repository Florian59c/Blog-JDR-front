import styles from '../styles/adminDisplayList.module.css';
import RightArrow from "../assets/img/right-arrow.png";

type AdminDisplayListProps = {
    message: string;
    isOpen: boolean;
    onToggle: () => void;
}

export default function AdminDisplayList({ message, isOpen, onToggle }: AdminDisplayListProps) {
    return (
        <div className={styles.container} onClick={onToggle}>
            <p>Afficher/masquer La liste des {message}</p>
            <img
                src={RightArrow.src}
                alt="flèche"
                className={isOpen ? styles.rotated : ''}
            />
        </div>
    );
}