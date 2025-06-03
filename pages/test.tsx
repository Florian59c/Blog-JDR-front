import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

export default function test() {
    return (
        <div style={{ margin: "1rem" }}>
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
                suppression du compte de l'utilisateur
            </Button>
            <Button variant="outlined" color="success" endIcon={<SendIcon />}>
                Send
            </Button>
            {/* <Button variant="outlined" color="success">
                Send
            </Button> */}
        </div>
    );
}