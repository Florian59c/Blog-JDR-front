import styles from '../styles/404.module.css';
import Link from "next/link";
import { Button } from '@mui/material';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';

export default function Custom404() {
    return (
        <div className={`blockContainer ${styles.notFound}`}>
            <h1>404 - Page introuvable</h1>
            <p>La page que vous cherchez n'existe pas.</p>
            <div className="btn">
                <Link href="/">
                    <Button variant="outlined" color="success" endIcon={<KeyboardReturnOutlinedIcon />}>Retourner à la page d’accueil</Button>
                </Link>
            </div>
        </div>
    );
}