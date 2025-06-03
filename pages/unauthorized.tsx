import styles from '../styles/unauthorized.module.css';
import Link from "next/link";
import { Button } from '@mui/material';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';

export default function Unauthorized() {
  return (
    <div className="blockContainer">
      <div className={styles.text}>
        <h1>Accès non autorisé</h1>
        <p>Vous n'avez pas les permissions nécessaires pour accéder à cette page !</p>
      </div>
      <div className="button-container">
        <Link href="/">
          <Button variant="outlined" color="success" endIcon={<KeyboardReturnOutlinedIcon />}>Retourner à la page d’accueil</Button>
        </Link>
      </div>
    </div>
  );
}