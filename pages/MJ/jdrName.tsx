import styles from '../../styles/MJ/jdrNames.module.css';
import { useState } from "react";
import DropDownJdr from "../../components/dropDownJdr";
import ReturnLink from "../../components/returnLink";
import { Button, TextField } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import AdminCreateJdrNameInList from '../../components/adminCreateJdrNameInList';
import DeleteModale from '../../modals/deleteModale';
import axios from 'axios';

export default function JdrName() {
    const [selectedJdr, setSelectedJdr] = useState<{ id?: number, name: string }>({ name: 'none' });
    const [name, setName] = useState("");
    const [deleteId, setDeleteId] = useState<number>(0);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [refreshDropdownTrigger, setRefreshDropdownTrigger] = useState(0);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    function handleSelectedJdrChange(jdr: { id: number; name: string }) {
        setSelectedJdr(jdr);
        setName(jdr.name);
        setDeleteId(jdr.id);
        setMessage("");
        setError("");
    }

    async function handleModify(e: React.FormEvent) {
        e.preventDefault();
        setMessage("");
        setError("");
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}jdr-list/updateJdrName`,
                {
                    id: selectedJdr.id,
                    name,
                },
                { withCredentials: true }
            );

            if (response.status === 201) {
                setMessage(response.data.message);
                setRefreshDropdownTrigger(prev => prev + 1); // permet de détecter le changement et de refresh le composant DropDown après la réussite
                setSelectedJdr(prev => ({
                    ...prev,
                    name
                })); // permet de changer la selection dans le dropdown / sans ça, le nouveau nom apparait dans la liste, mais celui affiché reste le nom avant la modification
            } else {
                setError(response.data.message || 'Une erreur est survenue lors de la modification');
            }
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Une erreur est survenue lors de la modification');
            } else {
                setError('Une erreur inconnue s\'est produite');
            }
        }
    }

    function handleDeleteSuccess() {
        setIsOpenDelete(false);
        setRefreshDropdownTrigger(prev => prev + 1);
        setSelectedJdr({ name: 'none' });
        setName("");
    }

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
                        refreshTrigger={refreshDropdownTrigger}
                    />
                    {selectedJdr.name !== 'none' &&
                        <div className={`commentContainer ${styles.updateContainer}`}>
                            <form onSubmit={(e) => handleModify(e)}>
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
                                        variant="outlined"
                                        color="error"
                                        sx={{ width: '100%' }}
                                        startIcon={<DeleteIcon />}
                                        onClick={() => setIsOpenDelete(true)}
                                    >
                                        Supprimer
                                    </Button>
                                </div>
                            </form>
                            {error && <p className="error-message">{error}</p>}
                            <p className="confirmMessage">{message}</p>
                        </div>
                    }
                </div>
            </div>
            {isOpenDelete && <DeleteModale setIsOpen={setIsOpenDelete} deleteType="jdrName" id={deleteId} onSuccess={handleDeleteSuccess} />}
        </div>
    );
}