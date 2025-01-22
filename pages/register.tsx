import { useEffect, useState } from "react";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from "axios";
import { useRouter } from "next/router";

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
        <div>
          <h1>register page</h1>
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
              <div>
                <label htmlFor="pseudo">
                  <p>Pseudo : </p>
                  <input type="text" id='pseudo' value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                </label>
                <label htmlFor="email">
                  <p>Adresse Email : </p>
                  <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label htmlFor="password">
                  <p>Mot de passe : </p>
                  <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label htmlFor="confirmPassword">
                  <p>Confirmer le mot de passe : </p>
                  <input type="password" id='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
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