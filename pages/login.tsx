import axios from "axios";
import { NextRequest } from "next/server";
import { useState } from "react";

export default function login(req: NextRequest) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function fetchRole() {
    try {
      // Envoyer une requête POST à la route avec le JWT récupéré manuellement
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}auth/checkRole`,
        {}, // Vous n'envoyez pas le token manuellement ici (juste pour initier la requête)
        {
          withCredentials: true, // Permet d'envoyer les cookies dans la requête
        }
      );

      // Afficher le rôle récupéré
      console.log('User role:', response.data.role);
      console.log(typeof (response.data.role));

    } catch (error) {
      console.log(error);
      // console.error('Error fetching user role:', error.response?.data || error.message);
    }
  }

  return (
    <div>
      <h1>login page</h1>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault(); // Empêche le rechargement de la page
            setError('');

            try {
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}auth/login`,
                { email, password }, // Corps de la requête
                { withCredentials: true } // Nécessaire pour inclure les cookies
              );
              setError(response.data);
            } catch (err) {
              if (axios.isAxiosError(err)) {
                // Si l'erreur provient d'Axios
                setError(err.response?.data?.message || 'Erreur lors de la connexion');
              } else {
                setError('Une erreur inconnue s\'est produite');
              }
            }
          }}
        >
          <div>
            <label htmlFor="email">
              <p>Adresse Email : </p>
              <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label htmlFor="password">
              <p>Mot de passe : </p>
              <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
          </div>
          <div>
            <button type="submit" >Se connecter</button>
          </div>
          {error && <p className='error'>{error}</p>}
        </form>
      </div>

      <div>
        <h1>logout</h1>
        <button onClick={async () => {
          await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}auth/logout`, {}, { withCredentials: true });
        }}>
          Se déconnecter
        </button>
      </div>

      <div>
        <button onClick={fetchRole}>Check Role</button>
      </div>
    </div>
  );
}