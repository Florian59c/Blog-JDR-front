import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

export async function middleware(req: NextRequest) {

  const authToken = req.cookies.get('auth-token'); // Récupère le token dans les cookies

  if (!authToken) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  try {
    // Envoyer une requête POST à la route avec le JWT récupéré manuellement
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}auth/checkRole`,
      {}, // Vous n'envoyez pas le token manuellement ici (juste pour initier la requête)
      {
        withCredentials: true,
        headers: {
          Cookie: `auth-token=${authToken.value}`, // Ajoute manuellement le cookie au header
        },
      }
    );

    // Redirection en fonction du rôle
    if (response.data.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next(); // Autorise l'accès à la page demandée
  } catch (error) {
    console.log(error);
    // console.error('Error fetching user role:', error.response?.data || error.message);
  }
}

export const config = {
  matcher: ['/MJ/:path*'], // Applique ce middleware uniquement aux routes /MJ/*
};