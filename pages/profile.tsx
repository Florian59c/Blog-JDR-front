import axios from "axios";

export default function Profile() {
    return (
        <div>
            <h1>Page de profil</h1>

            <div>
                <h1>logout</h1>
                <button onClick={async () => {
                    await axios.post(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}auth/logout`, {}, { withCredentials: true });
                }}>
                    Se déconnecter
                </button>
            </div>
        </div>
    );
}