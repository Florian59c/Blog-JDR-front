import { createTheme } from '@mui/material/styles';

const muiThemes = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'standard', // Définit la variante par défaut
            },
            styleOverrides: {
                root: {
                    marginBottom: '1rem', // Applique une marge par défaut
                    width: '30vw',
                    // boxShadow: '-1px 1px 5px #EEE',
                    '& .MuiInput-underline:before': {
                        borderBottomColor: '#000', // Couleur avant focus
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: '#000', // Couleur après focus
                    },
                    '& .MuiFormLabel-root': {
                        color: '#000', // Couleur du label
                        paddingLeft: '0.2rem'
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#000', // Couleur du label
                    },
                    '& .MuiInputBase-input': {
                        paddingLeft: '0.2rem', // Ajoute un padding gauche sur le texte
                    },
                },
            },
        },
    },
});

export default muiThemes;