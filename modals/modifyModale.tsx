import styles from '../styles/modifyModale.module.css';
import Cancel from '../assets/img/cancel.png';
import { ModifyModaleInterface } from '../interfaces/ModifyModaleInterface';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Button, TextField } from '@mui/material';
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from 'react';
import { modifyDataInterface } from '../interfaces/modifyDataInterface';

export default function ModifyModale({ data, modifyType, setIsOpenModify, onSuccess }: ModifyModaleInterface) {
    const router = useRouter();
    const [formData, setFormData] = useState(data);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setFormData(data);
    }, [data]);

    if (!data || !modifyType) {
        return (
            <div className="modalContainer" onClick={() => setIsOpenModify(false)}>
                <div className={`modal ${styles.modalModify}`} onClick={(e) => e.stopPropagation()}>
                    <div className="modalImgContainer">
                        <img src={Cancel.src} alt="Croix permettant de fermer la fenêtre" onClick={() => setIsOpenModify(false)} />
                    </div>
                    <p className="modalText modalAlert">
                        {!data ?
                            "Une erreur est survenue ! Aucune donnée n'a été trouver pour effectuer la modification !!"
                            :
                            "Le type de modification est invalide."
                        }
                    </p>
                </div>
            </div>
        );
    }

    function handleChange(field: keyof modifyDataInterface, value: string) {
        if (formData) {
            setFormData(prev => ({
                ...prev!,
                [field]: value,
            }));
        }
    }

    const handleModify = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");
        try {
            const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}${modifyType}/update${capitalizeFirst(modifyType)}`,
                {
                    id: formData?.id,
                    title: formData?.title,
                    link: formData?.link,
                    tag: formData?.tag
                },
                { withCredentials: true }
            );
            console.log(response);

            if (response.status === 201) {
                setMessage(response.data.message);
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
    };

    return (
        <div className="modalContainer" onClick={() => setIsOpenModify(false)}>
            <div className={`modal ${styles.modalModify}`} onClick={(e) => e.stopPropagation()}>
                <div className="modalImgContainer">
                    <img src={Cancel.src} alt="Croix permettant de fermer la fenêtre" onClick={() => setIsOpenModify(false)} />
                </div>
                <div>
                    {modifyType !== "jdr" ? (
                        <div>
                            <form onSubmit={handleModify}>
                                <div className="inputs">
                                    <TextField
                                        label="Titre"
                                        type="text"
                                        value={formData?.title || ''}
                                        onChange={(e) => handleChange('title', e.target.value)}
                                    />
                                    <TextField
                                        label="Lien"
                                        type="text"
                                        value={formData?.link || ''}
                                        onChange={(e) => handleChange('link', e.target.value)}
                                    />
                                    <TextField
                                        label="tag"
                                        type="text"
                                        value={formData?.tag || ''}
                                        onChange={(e) => handleChange('tag', e.target.value)}
                                    />
                                </div>
                                <div className="button-container">
                                    <Button type='submit' variant="outlined" color="success" endIcon={<SendIcon />}>
                                        {modifyType === "hero" ? "Modifier l'histoire dont vous êtes le héros" : "Modifier la nouvelle"}
                                    </Button>
                                </div>
                            </form>
                            {error && <p className="error-message">{error}</p>}
                            <p className="confirmMessage">{message}</p>
                        </div>
                    ) : (
                        <div>
                            {modifyType}
                            jdr form
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}