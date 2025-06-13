import styles from '../styles/adminDisplayList.module.css';
import RightArrow from "../assets/img/right-arrow.png";

type AdminDisplayListProps = {
    postStyles: boolean;
    message: string;
    isOpen: boolean;
    onToggle: () => void;
}

export default function AdminDisplayList({ postStyles, message, isOpen, onToggle }: AdminDisplayListProps) {
    return (
        <div className={`${styles.container} ${postStyles ? styles.postContainer : styles.jdrListContainer}`} onClick={onToggle}>
            <p className={isOpen ? styles.green : ""}>{message}</p>
            <img
                src={RightArrow.src}
                alt="flèche"
                className={isOpen ? styles.rotated : ''}
            />
        </div>
    );
}