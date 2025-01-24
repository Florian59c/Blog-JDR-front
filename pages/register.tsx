import { useEffect, useState } from "react";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/register.module.css"
import TextField from '@mui/material/TextField';

export default function Register() {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConnected, setIsConnected] = useState(false);
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
        <div>
          {/* transformer en composant et ajouter les styles */}
          <p>déja connecté</p>
        </div>
      ) : (
        <div className={styles.formsContainer}>
          <h1>Formulaire de création de compte</h1>
          <div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setError('');
                try {
                  const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}user/createUser`,
                    { pseudo, email, password, confirmPassword }
                  );
                  if (response.data === 'ok') {
                    try {
                      await axios.post(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}auth/login`,
                        { email, password }, // Corps de la requête
                        { withCredentials: true } // Nécessaire pour inclure les cookies
                      );
                    } catch (error) {
                      console.error(error);
                    } finally {
                      router.push('/');
                    }
                  } else {
                    setError(response.data);
                  }
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              <div className={styles.inputs}>
                <TextField
                  label="Pseudo"
                  type="text"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                />
                <TextField
                  label="Adresse Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Mot de passe"
                  type="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  label="Confirmer le mot de passe"
                  type="Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div>
                <button type="submit" >Se créer un compte</button>
              </div>
            </form>
            {error && <p>{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}