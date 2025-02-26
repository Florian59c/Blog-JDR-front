import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Pour un reset global
import muiThemes from '../src/app/muiThemes'; // Ajuste le chemin selon l'emplacement de ton fichier theme.ts
import '../src/app/globals.css'; // Import du fichier global.css
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: any) {
    return (
        <ThemeProvider theme={muiThemes}>
            <CssBaseline /> {/* Reset les styles par défaut du navigateur */}
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    );
}

export default MyApp;