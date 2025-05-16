import ReturnLink from "../../components/returnLink";

export default function reportedComments() {
    return (
        <div>
            <ReturnLink
                links={[
                    { title: 'Page d\'accueil administrateur', href: '/MJ/adminPage' },
                    { title: 'test temporaire', href: '/MJ/adminPage' },
                ]}
            />
            <p>reportedComments</p>
        </div>
    );
}