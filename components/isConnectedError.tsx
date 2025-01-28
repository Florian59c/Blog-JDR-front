export default function IsConnectedError() {
    return (
        <div className="blockContainer">
            <h1>Vous ne pouvez pas accéder à cette page lorsque vous êtes connecté</h1>
            <div className="buttonContainer">
                <button className="button-style button-color-validate">Retourner à la page d'accueil</button>
            </div>
        </div>
    );
}