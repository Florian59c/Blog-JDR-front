import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import TextField from '@mui/material/TextField';
import Link from "next/link";
import IsConnectedError from "../components/isConnectedError";
import { Checkbox } from "@mui/material";

export default function Register() {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
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
          <h1>Formulaire de création de compte</h1>
          <div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setError('');
                try {
                  const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}user/createUser`,
                    { pseudo, email, password, confirmPassword, checkCGU: isChecked }
                  );
                  if (response.data === 'ok') {
                    try {
                      await axios.post(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}auth/login`,
                        { email, password },
                        { withCredentials: true }
                      );
                      router.push('/profile');
                    } catch (loginError) {
                      console.error('Erreur lors de la connexion automatique', loginError);
                      router.push('/login');
                    }
                  } else {
                    setError(response.data);
                  }
                } catch (error) {
                  console.error(error);
                  if (axios.isAxiosError(error)) {
                    setError(error.response?.data?.message || 'Une erreur est survenue lors de la création du compte');
                  } else {
                    setError('Une erreur inconnue s\'est produite');
                  }
                }
              }}
            >
              <div className="inputs">
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
                <div className="checkbox">
                  <Checkbox checked={isChecked} onChange={(event) => { setIsChecked(event.target.checked) }} />
                  <p>J'accepte les <a
                    href="https://drive.google.com/file/d/1kW-Ztlw_R6uufBCiz8m51YLgXBRc6w-R/view?usp=drive_link"
                    className="link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >Conditions Générales d'Utilisation</a>*</p>
                </div>
              </div>
              <div className="buttonContainer">
                <button type="submit" className="button-style button-color-validate">Se créer un compte</button>
              </div>
            </form>
          </div>
          {error && <p className="error-message">{error}</p>}
          <p className="redirect-message">Vous avez déjà un compte ? <Link href="/login" className="link">Connectez-vous</Link></p>
        </div>
      )}
    </div>
  );
}