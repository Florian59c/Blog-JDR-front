import styles from '../styles/header.module.css';
import Logo from "../assets/img/logo.png";

export default function Header() {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={Logo.src} alt="" />
            </div>
            <div className={styles.buttons}>
                <h1>L'histoire dont vous êtes le héros </h1>
                <h1>Nouvelles</h1>
                <h1>JDR</h1>
                <div>
                    <h1>co / profil</h1>
                </div>
                <h1>Contact</h1>
            </div>
        </div>
    );
}