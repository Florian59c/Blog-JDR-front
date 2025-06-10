import ReturnLink from "../../components/returnLink";

export default function yourHeroStoriesCreate() {
    return (
        <div>
            <ReturnLink
                links={[
                    { title: 'Page d\'accueil administrateur', href: '/MJ/adminPage' },
                    { title: 'Liste des histoires dont vous êtes le héros', href: '/MJ/yourHeroStoriesAdmin' },
                ]}
            />
            <div className="blockContainer">
                formulaire ici
            </div>
        </div>
    );
}