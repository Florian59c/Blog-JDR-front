import styles from '../../styles/MJ/jdrNames.module.css';
import { useState } from "react";
import DropDownJdr from "../../components/dropDownJdr";
import ReturnLink from "../../components/returnLink";
import { Button, TextField } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import AdminCreateJdrNameInList from '../../components/adminCreateJdrNameInList';

export default function JdrName() {
    const [selectedJdr, setSelectedJdr] = useState<{ id?: number, name: string }>({ name: 'none' });
    const [name, setName] = useState("");

    function handleSelectedJdrChange(jdr: { id: number; name: string }) {
        setSelectedJdr(jdr);
        setName(jdr.name);
    };

    return (
        <div>
            <ReturnLink
                links={[{ title: 'Page d\'accueil administrateur', href: '/MJ/adminPage' },]}
            />
            <div className={`blockContainer ${styles.container}`}>
                <AdminCreateJdrNameInList />
                <hr />
                <div>
                    <DropDownJdr
                        selectedJdr={selectedJdr}
                        onSelectedJdrChange={handleSelectedJdrChange}
                        showNoneOption={true}
                    />
                    {selectedJdr.name !== 'none' &&
                        <div className={`commentContainer ${styles.updateContainer}`}>
                            <form>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    sx={{
                                        '& input': {
                                            textAlign: 'center',
                                        },
                                    }}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <div className={styles.buttons}>
                                    <Button
                                        type='submit'
                                        variant="outlined"
                                        color="success"
                                        sx={{ width: '100%' }}
                                        startIcon={<EditOutlinedIcon />}
                                    >
                                        Modifier
                                    </Button>
                                    <Button
                                        type='submit'
                                        variant="outlined"
                                        color="error"
                                        sx={{ width: '100%' }}
                                        startIcon={<DeleteIcon />}
                                    >
                                        Supprimer
                                    </Button>
                                </div>
                            </form>
                        </div>
                    }
                    {name}
                    {selectedJdr.id}
                </div>
            </div>
        </div>
    );
}