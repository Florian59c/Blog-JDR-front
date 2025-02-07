import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Idearium",
  description: "Bienvenue dans l'idearium, le sanctuaire de l'imagination ! Le projet de ce site est de vous proposer des histoires, sous la forme de nouvelles, de scénarios de jeux de rôles, et même d'histoires dont vous êtes le héros. Vous y trouverez également quelques aides de jeux pour vous aider à concevoir vous-même vos intrigues de jeux. Chaque mois, de nouveaux contenus seront ajoutés, comme de nouveaux chapitres ou de nouvelles aides de jeux. Bien sûr, tout ceci est gratuit et fait pour être partagé dans un esprit bon enfant. Alors n'hésitez pas à donner votre avis, poser des questions et faire des suggestions. Alors amusez-vous bien !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}