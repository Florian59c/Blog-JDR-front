import Link from 'next/link';
import styles from '../styles/returnLink.module.css';
import Arrow from '../assets/img/return-arrow.png';

interface LinkItem {
    title: string;
    href: string;
}

interface ReturnLinkProps {
    links: LinkItem[];
}

export default function ReturnLink({ links }: ReturnLinkProps) {
    return (
        <div className={styles.returnGroup}>
            <img src={Arrow.src} alt="flèche" />
            {links.map((link, index) => (
                <span key={index} className={styles.linkWrapper}>
                    <Link href={link.href} className={styles.return}>
                        <p>{link.title}</p>
                    </Link>
                    {index < links.length - 1 && <span className={styles.separator}> / </span>}
                </span>
            ))}
        </div >
    );
}