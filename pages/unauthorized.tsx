import styles from '../styles/unauthorized.module.css';
import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="blockContainer">
      <div className={styles.text}>
        <h1>Accès non autorisé</h1>
        <p>Vous n'avez pas les permissions nécessaires pour accéder à cette page !</p>
      </div>
      <div className="buttonContainer">
        <Link href="/">
          <button className="button-style button-color-validate">Retourner à la page d'accueil</button>
        </Link>
      </div>
    </div>
  );
}