import axios from "axios";
import { NextRequest } from "next/server";
import { useEffect, useState } from "react";

export default function login(req: NextRequest) {
  const [isConnected, setIsConnected] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const checkConnection = async () => {
    try {
      const response = await axios.get('/api/checkIsConnected'); // Appeler l'API route
      setIsConnected(response.data.isConnected);
    } catch (error) {
      console.error('Error checking connection:', error);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div>
      {isConnected ? (
        <div>
          {/* transformer en composant et ajouter les styles */}
          <p>déja connecté</p>
        </div>
      ) : (
        <div>
          <h1>login page</h1>
          {/* <TextField
        label="Mot de passe"
        type="Password"
        autoComplete="current-password"
      /> */}
          {/* utiliser auto complete pour aller chercher les infos stocké dans le navigateur */}
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
        </div>
      )}
    </div>
  );
}