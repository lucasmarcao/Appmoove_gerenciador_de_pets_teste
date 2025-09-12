import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Users from "../pages/User";
import UserDetails from "../pages/UserDetails";
import Docs from "../pages/Docs";
import ListagemDePets from "../pages/ListagemDePets/Index";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/pets/listagem/" element={<ListagemDePets />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
