import AdminCreateHeroAndNews from "../../components/adminCreateHeroAndNews";
import ReturnLink from "../../components/returnLink";

export default function newsCreate() {
    return (
        <div>
            <ReturnLink
                links={[
                    { title: 'Page d\'accueil administrateur', href: '/MJ/adminPage' },
                    { title: 'Liste des nouvelles', href: '/MJ/newsAdmin' },
                ]}
            />
            <AdminCreateHeroAndNews api_url="news/createNews" />
        </div>
    );
}