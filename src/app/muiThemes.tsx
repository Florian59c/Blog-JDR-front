import { createTheme } from '@mui/material/styles';

const muiThemes = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                variant: 'standard', // Définit la variante par défaut
            },
            variants: [
                {
                    props: { variant: 'standard' }, // Style spécifique pour `outlined`
                    style: {
                        marginBottom: '1rem', // Applique une marge par défaut
                        width: '100%',
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
                {
                    props: { variant: 'outlined' }, // Ajout d'une variante personnalisée
                    style: {
                        marginBottom: '1rem', // Applique une marge par défaut
                        width: '100%',
                        // backgroundColor: '#FBFBFB',
                        // boxShadow: '-1px 1px 5px #EEE',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#000',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#000',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: '#9F9F9F',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#000',
                        },
                    },
                },
            ]
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: '#000', // Couleur des contours de la case à cocher
                    '&.Mui-checked': {
                        color: '#0D3C36', // Couleur quand la case est cochée
                    },
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: ({ theme }) => ({
                    margin: '8px 0',
                    borderRadius: '8px',
                    width: '90%',
                    padding: '4px',

                    [theme.breakpoints.up(480)]: { // Écrans ≥ 480px (petites tablettes)
                        width: '350px',
                    },
                    [theme.breakpoints.up(768)]: { // Écrans ≥ 768px (tablettes classiques)
                        width: '500px',
                    },
                    [theme.breakpoints.up(1024)]: { // Écrans ≥ 1024px (PC portable)
                        width: '600px',
                    },
                }),
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#0D3C36", // Bordure rouge au focus (clic)
                    },
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        backgroundColor: "#0D3C36 !important", // Fond pour l'élément sélectionné
                        color: "#FFF", // Texte blanc pour plus de lisibilité
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor: "#0D3C36 !important", // Fond au survol
                    },
                },
            },
        },
    },
});

export default muiThemes;