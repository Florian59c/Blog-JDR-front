import styles from '../styles/dropDownJdr.module.css';
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { JdrNamesInterface } from '../interfaces/JdrNamesInterface';

interface DropDownJdrProps {
    onSelectedJdrChange: (selectedJdr: string) => void;
}

export default function DropDownJdr({ onSelectedJdrChange }: DropDownJdrProps) {
    const [jdrNames, setJdrNames] = useState<JdrNamesInterface[]>([]);
    const [selectedJdr, setSelectedJdr] = useState<string>("none");
    const [error, setError] = useState('');

    async function getAllJdrNames() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}jdr-list/getAllJdrNames`);
            setJdrNames(response.data);
        } catch (error) {
            console.error(error);
            setError("Une erreur est survenue lors de l'affichage des noms de JDR");
        }
    }

    useEffect(() => {
        getAllJdrNames();
    }, []);

    const handleChange = (event: SelectChangeEvent<string>) => {
        const newSelectedJdr = event.target.value;
        setSelectedJdr(newSelectedJdr);
        onSelectedJdrChange(newSelectedJdr);  // Appeler la fonction du parent pour mettre à jour l'état
    };

    return (
        <div className={styles.container}>
            <FormControl>
                <Select
                    labelId="jdr-select-label"
                    id="jdr-select"
                    value={selectedJdr}
                    onChange={handleChange}
                    input={<OutlinedInput label="" />}
                    renderValue={(value) => value === "none" ? "Sélectionnez un JDR" : value}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 300,  // Limite la hauteur du menu à 300px
                                overflow: 'auto',  // Active la barre de défilement
                            },
                        },
                    }}
                >
                    <MenuItem value="none">tous les JDR</MenuItem>
                    {jdrNames.map((jdr) => (
                        <MenuItem key={jdr.id} value={jdr.name}>
                            {jdr.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}