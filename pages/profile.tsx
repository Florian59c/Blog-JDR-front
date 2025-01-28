import axios from "axios";
import { useRouter } from "next/router";

export default function Profile() {
    const router = useRouter();

    return (
        <div>
            <h1>Page de profil</h1>

            <div>
                <h1>logout</h1>
                <button onClick={async () => {
                    await axios.post(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}auth/logout`, {}, { withCredentials: true });
                    router.push('/login');
                }}>
                    Se déconnecter
                </button>
            </div>
        </div>
    );
}