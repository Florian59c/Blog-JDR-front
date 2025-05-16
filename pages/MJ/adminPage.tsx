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
    <div>
      <h1>Page d'accueil administrateur</h1>
      <div>
        {pages.map((page, index) => {
          return (
            <Link href={`/MJ/${page.link}`} key={index}>
              <button>
                {page.title}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}