import { useState } from "react";
import Link from "next/link";
import ReturnLink from "../../components/returnLink";
import { Button } from "@mui/material";
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import AdminDisplayList from "../../components/adminDisplayList";
import AdminContentList from "../../components/adminContentList";

export default function yourHeroStoriesAdmin() {
    const [isListVisible, setIsListVisible] = useState(false);

    return (
        <div>
            <ReturnLink links={[{ title: 'Page d\'accueil administrateur', href: '/MJ/adminPage' }]} />
            <div className="blockContainer">
                <Link href="/MJ/yourHeroStoriesCreate" className="adminCreateLink">
                    <Button variant="outlined" color="success" sx={{ width: "100%" }} endIcon={<NoteAddOutlinedIcon />}>
                        Créer une hitstoire dont vous êtes le héros
                    </Button>
                </Link>
                <AdminDisplayList
                    message="hitstoires dont vous êtes le héros"
                    isOpen={isListVisible}
                    onToggle={() => setIsListVisible(!isListVisible)}
                />
                {isListVisible && (
                    <div>
                        <AdminContentList api_url="hero/getAllHeroWithNewDate" />
                    </div>
                )}
            </div>
        </div>
    );
}