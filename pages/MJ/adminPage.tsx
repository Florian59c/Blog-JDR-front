import styles from '../../styles/MJ/adminPage.module.css';
import Link from "next/link";
import { Button } from '@mui/material';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import SpeakerNotesOutlinedIcon from '@mui/icons-material/SpeakerNotesOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';

export default function AdminPage() {
  const pages = [
    {
      title: 'Bannissement',
      link: 'banishment',
      icon: <PersonOffOutlinedIcon />
    },
    {
      title: 'Commentaires signalés',
      link: 'reportedComments',
      icon: <SpeakerNotesOutlinedIcon />
    },
    {
      title: 'Histoires dont vous êtes le héros',
      link: 'yourHeroStoriesAdmin',
      icon: <NoteAddOutlinedIcon />
    },
    {
      title: 'Nouvelles',
      link: 'newsAdmin',
      icon: <NoteAddOutlinedIcon />
    },
    {
      title: 'JDR',
      link: 'jdrAdmin',
      icon: <NoteAddOutlinedIcon />
    },
    {
      title: 'Liste de nom de JDR',
      link: 'jdrName',
      icon: <NoteAddOutlinedIcon />
    }
  ];

  return (
    <div className={styles.container}>
      <h1>Page d'accueil administrateur</h1>
      <div className={styles.redirectButtons}>
        {pages.map((page, index) => {
          return (
            <div key={index} className={`button-container ${styles.buttons}`}>
              <Link href={`/MJ/${page.link}`}>
                <Button variant="outlined" color="success" sx={{ width: "100%" }} endIcon={page.icon}>
                  {page.title}
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}