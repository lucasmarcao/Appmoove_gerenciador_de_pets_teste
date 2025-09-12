import { useState, useEffect } from "react";
//import "./App.css";
import { getListarPets } from "../ts/requisicoes.ts";
import Homep from "../components/Home/HomeP";
import type { MyPet } from "../ts/requisicoes.ts";

function Home() {
    // let dados: Promise<void> | null | undefined = main();

    const [dados, setDados] = useState<MyPet[]>([]);
    useEffect(() => {
        getListarPets().then(setDados);
    }, []);

    let textoJson: string | undefined = JSON.stringify(dados);
    // const valor: unknown = "texto";
    // da pra colocar valores desconhecidos kkakak

    const elemento: HTMLElement | null = document.getElementById("meuId");
    if (elemento) {
        // if (typeof textoJson === "undefined") {
        //     elemento.innerText = "problema no Servidor";
        // } else {
        //     elemento.innerText = textoJson;
        // }
        if (dados.length == 0) {
            elemento.innerText = "problema no Servidor";
        } else {
            elemento.innerText = textoJson;
        }
    }

    return (
        <div>
            <h1>Bem vindo</h1>
            <h4>AURA + EGO = DISCIPLINA E REGO REGO REGO</h4>
            <h5 className={"irritado"} id={"meuId"}>
                Carregando dados...
            </h5>
            <Homep></Homep>
        </div>
    );
}

export default Home;
