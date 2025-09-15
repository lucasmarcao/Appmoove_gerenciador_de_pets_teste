import ItemCidade from "../components/DropdownCidades/ItemCidade";
import "./cidadescompet.css";

export default function CidadesComPet() {
    return (
        <div>
            <h2 className="centro margemVertical">Cidades Com Pet (talvez)</h2>

            <hr />

            <div className="centro papaiscrol">
                <div className="container margemVertical maximoScroll">
                    <ItemCidade></ItemCidade>
                </div>
            </div>
        </div>
    );
}
