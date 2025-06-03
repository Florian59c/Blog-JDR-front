import Link from "next/link";
import { Button } from "@mui/material";
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';

export default function IsConnectedError() {
    return (
        <div className="blockContainer">
            <h1>Vous ne pouvez pas accéder à cette page lorsque vous êtes connecté</h1>
            <div className="btn">
                <Link href="/">
                    <Button
                        variant="outlined"
                        color="success"
                        endIcon={<KeyboardReturnOutlinedIcon />}
                    >
                        Retourner à la page d'accueil
                    </Button>
                </Link>
            </div>
        </div>
    );
}