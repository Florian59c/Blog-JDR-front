import { useState } from "react";
import ReturnLink from "../../components/returnLink";
import { Button, Switch, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import DropDownJdr from "../../components/dropDownJdr";
import AdminDisplayList from "../../components/adminDisplayList";
import AdminCreateJdrNameInList from "../../components/adminCreateJdrNameInList";

export default function jdrCreate() {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [is_scenario, setIs_scenario] = useState(true);
    const [jdr_list_id, setJdr_list_id] = useState(0);
    const [selectedJdr, setSelectedJdr] = useState<{ id?: number, name: string }>({ name: 'none' });
    const [isListVisible, setIsListVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [refreshDropdownTrigger, setRefreshDropdownTrigger] = useState(0);

    function handleSelectedJdrChange(jdr: { id: number; name: string }) {
        setSelectedJdr(jdr);
        setJdr_list_id(jdr.id);
    };

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}jdr/createJdr`,
                { title, link, is_scenario, jdr_list_id },
                {
                    withCredentials: true,
                }
            );

            if (response.status === 201) {
                setMessage(response.data.message);
            } else {
                setError(response.data.message || 'Une erreur est survenue lors de la création du JDR');
            }
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Une erreur est survenue lors de la création du JDR');
            } else {
                setError('Une erreur inconnue s\'est produite');
            }
        }
    }

    return (
        <div>
            <ReturnLink
                links={[
                    { title: 'Page d\'accueil administrateur', href: '/MJ/adminPage' },
                    { title: 'Liste des JDR', href: '/MJ/jdrAdmin' },
                ]}
            />
            <div className="blockContainer">
                <form onSubmit={handleCreate}>
                    <div className="inputs">
                        <TextField
                            label="Titre*"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            label="Lien*"
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                        <div className="switch-container" >
                            <p>Aide de jeu</p>
                            <Switch
                                checked={is_scenario}
                                onChange={(e) => setIs_scenario(e.target.checked)}
                            />
                            <p>Scénario</p>
                        </div>
                        <div>
                            <DropDownJdr
                                selectedJdr={selectedJdr}
                                onSelectedJdrChange={handleSelectedJdrChange}
                                showNoneOption={true}
                                refreshTrigger={refreshDropdownTrigger}
                            />
                        </div>
                        <div>
                            <AdminDisplayList
                                postStyles={false}
                                message="Ajouter un nouveau nom de JDR à la liste"
                                isOpen={isListVisible}
                                onToggle={() => setIsListVisible(!isListVisible)}
                            />
                            {isListVisible &&
                                <div>
                                    <AdminCreateJdrNameInList
                                        onSuccess={() => {
                                            setSelectedJdr({ name: 'none' });
                                            setRefreshDropdownTrigger(prev => prev + 1);
                                        }}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                    <div className="button-container">
                        <Button type='submit' variant="outlined" color="success" endIcon={<SendIcon />}>
                            Créer un JDR
                        </Button>
                    </div>
                </form>
                {error && <p className="error-message">{error}</p>}
                <p className="confirmMessage">{message}</p>
            </div>
        </div>
    );
}