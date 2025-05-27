import styles from '../styles/404.module.css';
import Link from "next/link";

export default function Custom404() {
    return (
        <div className={`blockContainer ${styles.notFound}`}>
            <h1>404 - Page introuvable</h1>
            <p>La page que vous cherchez n'existe pas.</p>
            <Link href="/" className="buttonContainer">
                <button className="button-style button-color-validate">Retourner à la page d’accueil</button>
            </Link>
        </div>
    );
}