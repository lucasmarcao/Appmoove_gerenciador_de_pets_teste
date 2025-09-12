import { useParams } from "react-router-dom";

export default function UserDetails() {
    const { id } = useParams();

    return <h1>Detalhes do Usuário: {id}</h1>;
}
