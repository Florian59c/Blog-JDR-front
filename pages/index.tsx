import styles from '../styles/home.module.css';
import LogoGreen from '../assets/img/logoGreen.jpg';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LatestContent from '../components/latestContent';
import SendIcon from "@mui/icons-material/Send";
import { Button } from '@mui/material';

export default function Home() {
    const [isAdmin, setIsAdmin] = useState(false);

    async function checkAdmin() {
        try {
            const response = await axios.get("/api/checkIsAdmin", { withCredentials: true });
            if (response.data) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        } catch (error) {
            console.error("Error checking connection:", error);
            setIsAdmin(false);
        }
    }

    useEffect(() => {
        checkAdmin();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.home}>
                <LatestContent />
                <div className={styles.desc}>
                    <img src={LogoGreen.src} alt="logo du site" className={styles.logo} />
                    <p>Bienvenue dans l'idearium, le sanctuaire de l'imagination !</p>
                    <br />
                    <p>Le projet de ce site est de vous proposer des histoires, sous la forme de nouvelles, de scénarios de jeux de rôles, et même d'histoires dont vous êtes le héros. Vous y trouverez également quelques aides de jeux pour vous aider à concevoir vous-même vos intrigues de jeux. Chaque mois, de nouveaux contenus seront ajoutés, comme de nouveaux chapitres ou de nouvelles aides de jeux.</p>
                    <br />
                    <p>Bien sûr, tout ceci est gratuit et fait pour être partagé dans un esprit bon enfant. Alors n'hésitez pas à donner votre avis, poser des questions et faire des suggestions. Alors amusez-vous bien !</p>
                    <br />
                    <p>P.S. Il se peut que vous rencontriez des coquilles et autres fautes de Français. N'hésitez pas à les faire remonter afin que les erreurs soient corrigées. En récompense, vous recevrez une tape dans le dos en distanciel ainsi que notre reconnaissance la plus sincère.</p>
                </div>
            </div>
            {isAdmin &&
                <div className="button-container">
                    <Link href="/MJ/adminPage">
                        <Button variant="outlined" color="success" endIcon={<SendIcon />}>Accès Administrateur</Button>
                    </Link>
                </div>
            }
        </div>
    );
}