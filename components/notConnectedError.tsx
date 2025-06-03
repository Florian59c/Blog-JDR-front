import Link from "next/link";
import { Button } from "@mui/material";
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';

export default function NotConnectedError() {
    return (
        <div className="blockContainer">
            <h1>Vous ne pouvez pas accéder à cette page si vous n'êtes pas connecté</h1>
            <div className="button-container">
                <Link href="/login">
                    <Button
                        variant="outlined"
                        color="success"
                        endIcon={<KeyboardReturnOutlinedIcon />}
                    >
                        Retourner à la page de connexion
                    </Button>
                </Link>
            </div>
        </div>
    );
}