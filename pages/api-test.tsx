import { useEffect, useState } from 'react';

export default function ApiTest() {
  const [data, setData] = useState<{ message: string } | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/testApi/message') // URL de l'API du backend
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error('Erreur de fetch:', error));
  }, []); // Le tableau vide garantit que l'effet s'exécute une seule fois, lors du premier rendu

  return (
    <div>
      <h1>Appel API Backend</h1>
      {data ? (
        <p>Message du backend : {data.message}</p>
      ) : (
        <p>Chargedsment...</p>
      )}
    </div>
  );
}
