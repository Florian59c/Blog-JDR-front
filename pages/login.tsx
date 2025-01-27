import { TextField } from "@mui/material";
import axios from "axios";
import Link from "next/link";
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
        <div className="formsContainer">
          <h1>Formulaire de connexion</h1>
          <div>
            <form
              onSubmit={async (e) => {
                e.preventDefault(); // Empêche le rechargement de la page
                setError('');
                try {
                  const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}auth/login`,
                    { email, password },
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
              <div className="inputs">
                <TextField
                  label="Adresse Email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Mot de passe"
                  type="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <div className="buttonContainer">
                <button type="submit" className="button-style button-color-validate">Se connecter</button>
              </div>
            </form>
          </div>
          <p>Vous n’avez pas de compte ? <Link href="/register" className="link">Inscrivez-vous</Link></p>
        </div>
      )}
    </div>
  );
}