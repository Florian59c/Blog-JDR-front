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
                {
                    props: { variant: 'standard', color: 'ban' }, // Ajout d'une variante personnalisée pour le formulaire de bannissement
                    style: {
                        marginBottom: '1rem', // Applique une marge par défaut
                        width: '100%',
                        // backgroundColor: '#F8F8F8',
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
                            paddingLeft: '10px',
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
        MuiButton: {
            variants: [
                {
                    props: { variant: "outlined", color: "error" },
                    style: {
                        backgroundColor: "#AF1E22", // rouge
                        color: "#ffffff", // texte et icône en blanc
                        border: "none",
                        borderRadius: "30px",
                        whiteSpace: "normal",
                        maxWidth: "20rem",
                        textAlign: "center",
                        textTransform: "none",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", // ombre portée
                        "& .MuiButton-startIcon": {
                            color: "#ffffff", // icône en blanc
                        },
                        "&:hover": {
                            backgroundColor: "#8C181B", // rouge plus foncé
                            // backgroundColor: "#D43B3E", // rouge plus claire
                            border: "none",
                            boxShadow: "0 6px 8px rgba(0, 0, 0, 0.5)", // ombre plus marquée au hover
                        },
                    },
                },
                {
                    props: { variant: "outlined", color: "success" },
                    style: {
                        backgroundColor: "#0D3C36", // vert
                        color: "#FCF5C9", // texte en jaune
                        border: "none",
                        borderRadius: "12px",
                        whiteSpace: "normal",
                        maxWidth: "20rem",
                        textAlign: "center",
                        textTransform: "none",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", // ombre portée
                        "& .MuiButton-startIcon": {
                            // color: "#ffffff", // icône en blanc
                            color: "#FCF5C9", // icône en jaune
                        },
                        "&:hover": {
                            backgroundColor: "#0A2B27", // rouge plus foncé
                            border: "none",
                            boxShadow: "0 6px 8px rgba(0, 0, 0, 0.5)", // ombre plus marquée au hover
                        },
                    },
                },
            ],
        },
    },
});

export default muiThemes;