import styles from '../../styles/MJ/jdrNames.module.css';
import { useState } from "react";
import DropDownJdr from "../../components/dropDownJdr";
import ReturnLink from "../../components/returnLink";
import { Button, TextField } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import AdminCreateJdrNameInList from '../../components/adminCreateJdrNameInList';
import DeleteModale from '../../modals/deleteModale';

export default function JdrName() {
    const [selectedJdr, setSelectedJdr] = useState<{ id?: number, name: string }>({ name: 'none' });
    const [name, setName] = useState("");
    const [deleteId, setDeleteId] = useState<number>(0);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [refreshDropdownTrigger, setRefreshDropdownTrigger] = useState(0);

    function handleSelectedJdrChange(jdr: { id: number; name: string }) {
        setSelectedJdr(jdr);
        setName(jdr.name);
        setDeleteId(jdr.id);
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
                            {isOpenDelete && <DeleteModale setIsOpen={setIsOpenDelete} deleteType="jdrName" id={deleteId} onSuccess={handleDeleteSuccess} />}
                        </div>
                    }
                    {/* {name}
                    {selectedJdr.id} */}
                    {/* {deleteId} */}
                </div>
            </div>
        </div>
    );
}