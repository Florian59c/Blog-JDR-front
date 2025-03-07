import { TextField } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextRequest } from "next/server";
import { useEffect, useState } from "react";
import IsConnectedError from "../components/isConnectedError";

export default function login(req: NextRequest) {
  const [isConnected, setIsConnected] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

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
        <IsConnectedError />
      ) : (
        <div className="blockContainer">
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
                  if (response.data === 'ok') {
                    router.push('/');
                  } else {
                    setError(response.data);
                  }
                } catch (error) {
                  if (axios.isAxiosError(error)) {
                    // Si l'erreur provient d'Axios ou des dto
                    setError(error.response?.data?.message || 'Une erreur est survenue lors de la connexion');
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
              <div className="buttonContainer">
                <button type="submit" className="button-style button-color-validate">Se connecter</button>
              </div>
            </form>
            {error && <p className="error-message">{error}</p>}
          </div>
          <div className="redirect-message">
            <p >Vous n’avez pas de compte ? <Link href="/register" className="link">Inscrivez-vous</Link></p>
            <p >Vous avez oublié votre mot de passe ? <Link href="/forgotPassword" className="link">Réinitialisez-le</Link></p>
          </div>
        </div>
      )}
    </div>
  );
}