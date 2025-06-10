import { useState } from "react";
import Link from "next/link";
import ReturnLink from "../../components/returnLink";
import { Button } from "@mui/material";
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import AdminDisplayList from "../../components/adminDisplayList";
import AdminContentList from "../../components/adminContentList";

export default function newsAdmin() {
    const [isListVisible, setIsListVisible] = useState(false);

    return (
        <div>
            <ReturnLink links={[{ title: 'Page d\'accueil administrateur', href: '/MJ/adminPage' }]} />
            <div className="blockContainer">
                <Link href="/MJ/newsCreate" className="adminCreateLink">
                    <Button variant="outlined" color="success" sx={{ width: "100%" }} endIcon={<NoteAddOutlinedIcon />}>
                        Créer une nouvelle
                    </Button>
                </Link>
                <AdminDisplayList
                    message="nouvelles"
                    isOpen={isListVisible}
                    onToggle={() => setIsListVisible(!isListVisible)}
                />
                {isListVisible && (
                    <div>
                        <AdminContentList api_url="news/getAllNewsWithNewDate" />
                    </div>
                )}
            </div>
        </div>
    );
}