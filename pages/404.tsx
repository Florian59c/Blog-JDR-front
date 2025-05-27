export default function Custom404() {
    return (
        <div style={{ textAlign: 'center', padding: '5rem' }}>
            <h1>404 - Page introuvable</h1>
            <p>La page que vous cherchez n'existe pas ou a été déplacée.</p>
            <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
                Retour à l’accueil
            </a>
        </div>
    );
}