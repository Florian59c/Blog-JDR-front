import styles from '../styles/adminContentList.module.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { HeroStoryInterface } from "../interfaces/HeroStoryInterface";
import { Button } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import { NewsInterface } from '../interfaces/NewsInterface';
import { JdrInterface } from '../interfaces/JdrInterface';
import DeleteModale from '../modals/deleteModale';
import ModifyModale from '../modals/modifyModale';
import { modifyDataInterface } from '../interfaces/modifyDataInterface';

interface AdminContentListProps {
    api_url: string;
}

export default function AdminContentList({ api_url }: AdminContentListProps) {
    const [contents, setContents] = useState<(HeroStoryInterface | NewsInterface | JdrInterface)[]>([]);
    const [error, setError] = useState('');
    const [data, setData] = useState<modifyDataInterface | null>(null);
    const [deleteId, setDeleteId] = useState<number>(0);
    const [isOpenModify, setIsOpenModify] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const modaleType = "hero";

    function isJdrInterface(content: any): content is JdrInterface {
        return 'is_scenario' in content;
    }

    async function getHeroStories() {
        setError('');
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}${api_url}`,);
            setContents(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Une erreur est survenue lors de l\'affichage');
            } else {
                setError('Une erreur inconnue s\'est produite');
            }
        }
    }

    useEffect(() => {
        getHeroStories();
    }, [isOpenDelete]);

    return (
        <div>
            {contents.length !== 0 ? (
                <div>
                    {contents.map((content) => {
                        return (
                            <div key={content.id} className={`commentContainer ${styles.container}`}>
                                <p className={styles.date}>
                                    Ajouté le {new Date(content.date)
                                        .toLocaleDateString()} à {new Date(content.date)
                                            .toLocaleTimeString("fr-FR", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                </p>
                                <p className={styles.title}>{content.title}</p>
                                <p className={styles.jdrType}>{api_url === "jdr/findAllJdrWithNewDate" && isJdrInterface(content) && (
                                    content.is_scenario ? "(Scénario)" : "(Aide de jeu)"
                                )}
                                </p>
                                <div className={styles.buttons}>
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        sx={{ width: '100%' }}
                                        startIcon={<EditOutlinedIcon />}
                                        onClick={() => {
                                            setData({
                                                id: content.id,
                                                title: content.title,
                                                link: content.link,
                                                tag: 'tag' in content ? content.tag ?? '' : '',
                                            });
                                            setIsOpenModify(true);
                                        }}
                                    >
                                        Modifier
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        sx={{ width: '100%' }}
                                        startIcon={<DeleteIcon />}
                                        onClick={() => { setDeleteId(content.id); setIsOpenDelete(true) }}
                                    >
                                        Supprimer
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                    {isOpenModify && <ModifyModale setIsOpenModify={setIsOpenModify} modifyType={modaleType} data={data} />}
                    {isOpenDelete && <DeleteModale setIsOpen={setIsOpenDelete} deleteType={modaleType} id={deleteId} />}
                </div>
            ) : (
                <div className={styles.error}>
                    {
                        error ?
                            <p className="error-message">{error}</p>
                            :
                            <p>Il n'y a aucun contenu</p>
                    }
                </div >
            )
            }
        </div >
    );
}