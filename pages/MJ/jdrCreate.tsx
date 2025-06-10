import ReturnLink from "../../components/returnLink";

export default function jdrCreate() {
    return (
        <div>
            <ReturnLink
                links={[
                    { title: 'Page d\'accueil administrateur', href: '/MJ/adminPage' },
                    { title: 'Liste des JDR', href: '/MJ/newsAdmin' },
                ]}
            />
            <div className="blockContainer">
                formulaire ici
            </div>
        </div>
    );
}