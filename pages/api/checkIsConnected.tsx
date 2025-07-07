import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function checkIsConnected(req: NextApiRequest, res: NextApiResponse) {
    const authToken = req.cookies['auth-token']; // Récupérer le cookie HttpOnly

    if (!authToken) {
        return res.status(200).json({ isConnected: false });
    }

    try {
        // Appeler ton backend pour vérifier le rôle utilisateur
        const userRole = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}auth/checkRole`,
            {},
            {
                headers: {
                    Cookie: `auth-token=${authToken}`, // Envoyer le cookie au backend
                },
            }
        );

        if (userRole.data.role === 'none') {
            return res.status(200).json({ isConnected: false });
        } else {
            return res.status(200).json({ isConnected: true });
        }
    } catch (error: any) {
        console.error('Error fetching user role:', error.message);
        return res.status(500).json({ isConnected: false, message: error.message });
    }
}