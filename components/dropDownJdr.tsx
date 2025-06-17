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
    selectedJdr: { id?: number; name: string };
    onSelectedJdrChange: (selectedJdr: { id: number; name: string }) => void;
    showNoneOption?: boolean;
    refreshTrigger?: any;
}

export default function DropDownJdr({ selectedJdr, onSelectedJdrChange, showNoneOption = false, refreshTrigger }: DropDownJdrProps) {
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
    }, [refreshTrigger]);

    const handleChange = (event: SelectChangeEvent<string>) => {
        const selectedName = event.target.value;
        const found = jdrNames.find(jdr => jdr.name === selectedName);

        if (found) {
            onSelectedJdrChange({
                id: found.id,
                name: selectedName,
            });
        } else if (selectedName === "none") {
            onSelectedJdrChange({
                id: 0,
                name: "none",
            });
        } else {
            console.warn("JDR sélectionné introuvable");
        }
    };

    return (
        <div className={styles.container}>
            <FormControl>
                <Select
                    id="jdr-select"
                    value={selectedJdr.name}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(value) => value === "none" ? "Sélectionnez un JDR" : value}
                    MenuProps={{
                        disableScrollLock: true,
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