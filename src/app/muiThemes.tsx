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
    },
});

export default muiThemes;