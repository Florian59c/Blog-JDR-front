import { useState } from "react";
import DropDownJdr from "./dropDownJdr";

export default function GameAid() {
    const [selectedJdr, setSelectedJdr] = useState<string>("none");

    const handleSelectedJdrChange = (newSelectedJdr: string) => {
        setSelectedJdr(newSelectedJdr);
    };

    return (
        <div>
            <DropDownJdr onSelectedJdrChange={handleSelectedJdrChange} />
            <p>JDR sélectionné : {selectedJdr}</p>
        </div>
    );
}