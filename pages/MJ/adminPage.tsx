import classNames from 'classnames';
import styles from '../../styles/MJ/adminPage.module.css';
import Link from "next/link";

export default function AdminPage() {
  const pages = [
    {
      title: 'Commentaires signalés',
      link: 'reportedComments'
    },
    {
      title: 'Histoires dont vous êtes le héros',
      link: 'yourHeroStoriesAdmin'
    },
    {
      title: 'Nouvelles',
      link: 'newsAdmin'
    },
    {
      title: 'JDR',
      link: 'jdrAdmin'
    }
  ];

  return (
    <div className={styles.container}>
      <h1>Page d'accueil administrateur</h1>
      <div className={styles.redirectButtons}>
        {pages.map((page, index) => {
          return (
            <div key={index} className={classNames(styles.buttons, 'buttonContainer')}>
              <Link href={`/MJ/${page.link}`}>
                <button className="button-style button-color-validate">
                  {page.title}
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}