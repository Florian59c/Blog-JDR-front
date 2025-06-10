import ReturnLink from "../../components/returnLink";

export default function yourHeroStoriesAdmin() {
    return (
        <div>
            <ReturnLink
                links={[
                    { title: 'Page d\'accueil administrateur', href: '/MJ/adminPage' },
                    { title: 'test temporaire', href: '/MJ/adminPage' },
                ]}
            />
            yourHeroStoriesAdmin
        </div>
    );
}