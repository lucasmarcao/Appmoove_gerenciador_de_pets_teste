import "./barralateral.css";

function BarraLateral() {
    return (
        <aside className="barraLateral">
            <div className="centro">
                <h4>Funcionalidades </h4>
            </div>
            <hr />
            <div className="alert alert-info margemVertical">
                <a className="linkBarraLateral" href="/grafico-pets">
                    Grafico de Pets
                </a>
            </div>
            {/* <div className="alert alert-info margemVertical">
                <a className="linkBarraLateral" href="/gerar-planilha">
                    Gerar Planilha
                </a>
            </div> */}
            <div className="alert alert-info margemVertical">
                <a className="linkBarraLateral" href="/docs">
                    Documentacão
                </a>
            </div>
        </aside>
    );
}

export default BarraLateral;
