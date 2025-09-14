import "../css/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import DetalheDoPet from "../pages/DetalhesPet/DetalheDoPet";
import ListagemDePets from "../pages/ListagemDePets/ListagemDePets";
import CadastroDePet from "../pages/CadastroDePet/CadastroDePet";
import CidadesComPet from "../pages/CidadesComPet/CidadesComPet";
import GraficoPets from "../pages/BarraLateralPages/GraficoPets";
import GerarPlanilha from "../pages/BarraLateralPages/GerarPlanilha";
import Docs from "../pages/BarraLateralPages/Docs";
import ExploreBreeds from "../pages/ExplorarRacas/ExploreBreeds";
// componentessssss
import NavBar from "../pages/components/geralComponentes/NavBar";
import Footer from "../pages/components/geralComponentes/Footer";
import BarraLateral from "../pages/components/geralComponentes/BarraLateral";

function AppRoutes() {
    return (
        <Router>
            <NavBar></NavBar>
            <div className="papai">
                <BarraLateral></BarraLateral>
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/listagem-de-pets"
                            element={<ListagemDePets />}
                        />
                        <Route
                            path="/cadastro-de-pet"
                            element={<CadastroDePet />}
                        />
                        <Route
                            path="/detalhe-do-pet/:id"
                            element={<DetalheDoPet />}
                        />
                        <Route
                            path="/explorar-racas"
                            element={<ExploreBreeds />}
                        />
                        <Route
                            path="/cidades-com-pet"
                            element={<CidadesComPet />}
                        />
                        {/*     Parte da barra larteral  */}
                        <Route path="/grafico-pets" element={<GraficoPets />} />

                        <Route
                            path="/gerar-planilha"
                            element={<GerarPlanilha />}
                        />
                        <Route path="/docs" element={<Docs />} />
                    </Routes>
                </main>
            </div>
            <Footer></Footer>
        </Router>
    );
}

export default AppRoutes;
