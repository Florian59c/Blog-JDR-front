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
    selectedJdr: string;
    onSelectedJdrChange: (selectedJdr: string) => void;
    showNoneOption?: boolean;
}

export default function DropDownJdr({ selectedJdr, onSelectedJdrChange, showNoneOption = false }: DropDownJdrProps) {
    const [jdrNames, setJdrNames] = useState<JdrNamesInterface[]>([]);
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
        onSelectedJdrChange(newSelectedJdr); // Met à jour le parent
    };

    return (
        <div className={styles.container}>
            <FormControl>
                <Select
                    id="jdr-select"
                    value={selectedJdr}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(value) => value === "none" ? "Sélectionnez un JDR" : value}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 300,
                                overflow: 'auto',
                            },
                        },
                    }}
                >
                    {showNoneOption && (
                        <MenuItem value="none">Tous les JDR</MenuItem>
                    )}
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