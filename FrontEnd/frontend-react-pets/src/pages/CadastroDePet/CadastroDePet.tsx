import { useState } from "react";
import { createPet } from "../ts/requisicoes";
import type { MyPet, NewPet } from "../ts/requisicoes";
import { Link, useNavigate } from "react-router-dom";
import "./cadastropet.css";

export default function CadastroDePet() {
    const navigate = useNavigate();

    // estado do formulário
    const [form, setForm] = useState<NewPet>({
        name: "",
        species: "dog",
        breed: "",
        ageYears: 1,
        shelterCity: "",
        shelterLat: 0,
        shelterLng: 0,
        status: "available",
    });

    const [erro, setErro] = useState<string | null>(null);
    const [sucesso, setSucesso] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // valida campos mínimos
    const validate = (): string | null => {
        if (!form.name.trim()) return "O nome é obrigatório.";
        if (!["dog", "cat"].includes(form.species)) return "Espécie inválida.";
        if (!form.breed.trim()) return "A raça é obrigatória.";
        if (form.ageYears < 0) return "Idade não pode ser negativa.";
        if (!form.shelterCity.trim()) return "Cidade do abrigo é obrigatória.";
        if (form.shelterLat < -90 || form.shelterLat > 90)
            return "Latitude deve estar entre -90 e 90.";
        if (form.shelterLng < -180 || form.shelterLng > 180)
            return "Longitude deve estar entre -180 e 180.";
        return null;
    };

    // handler genérico para inputs
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((f) => ({
            ...f,
            [name]:
                e.target.type === "number"
                    ? Number(value)
                    : (value as string | number),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro(null);
        setSucesso(null);

        const msg = validate();
        if (msg) {
            setErro(msg);
            return;
        }

        try {
            setLoading(true);
            const novoPet: MyPet = await createPet(form);
            setSucesso(`Pet "${novoPet.name}" criado com sucesso!`);
            // redireciona para detalhes do pet em 2s
            setTimeout(() => navigate(`/pets/${novoPet.id}`), 2000);
        } catch (err: any) {
            setErro(err.message || "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="centro">
            <div className="container py-4">
                <nav aria-label="breadcrumb" className="my-3">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#">Home</a>
                        </li>
                        <li
                            className="breadcrumb-item active"
                            aria-current="page"
                        >
                            Cadastro de Pet
                        </li>
                    </ol>
                </nav>

                <h1 className="h3 mb-3">Cadastro de Pet</h1>

                <div className="card p-4 shadow-sm">
                    {erro && (
                        <div className="alert alert-danger" role="alert">
                            {erro}
                        </div>
                    )}
                    {sucesso && (
                        <div className="alert alert-success" role="alert">
                            {sucesso}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-12 col-md-6">
                                <label className="form-label">Nome</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={form.name}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label className="form-label">Espécie</label>
                                <select
                                    name="species"
                                    className="form-select"
                                    value={form.species}
                                    onChange={handleChange}
                                    disabled={loading}
                                >
                                    <option value="dog">Cão</option>
                                    <option value="cat">Gato</option>
                                </select>
                            </div>

                            <div className="col-12 col-md-6">
                                <label className="form-label">Raça</label>
                                <input
                                    type="text"
                                    name="breed"
                                    className="form-control"
                                    value={form.breed}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label className="form-label">
                                    Idade (anos)
                                </label>
                                <input
                                    type="number"
                                    name="ageYears"
                                    className="form-control"
                                    min={0}
                                    value={form.ageYears}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">
                                    Cidade do Abrigo
                                </label>
                                <input
                                    type="text"
                                    name="shelterCity"
                                    className="form-control"
                                    value={form.shelterCity}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label className="form-label">Latitude</label>
                                <input
                                    type="number"
                                    name="shelterLat"
                                    className="form-control"
                                    step="0.000001"
                                    value={form.shelterLat}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label className="form-label">Longitude</label>
                                <input
                                    type="number"
                                    name="shelterLng"
                                    className="form-control"
                                    step="0.000001"
                                    value={form.shelterLng}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">Status</label>
                                <select
                                    name="status"
                                    className="form-select"
                                    value={form.status}
                                    onChange={handleChange}
                                    disabled={loading}
                                >
                                    <option value="available">
                                        Disponível
                                    </option>
                                    <option value="adopted">Adotado</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-4 d-flex justify-content-end gap-2">
                            <Link
                                to="/pets"
                                className="btn btn-outline-secondary"
                            >
                                Cancelar
                            </Link>
                            <button
                                type="reset"
                                className="btn btn-secondary limparpet"
                                style={{ marginRight: 10 }}
                            >
                                Limpar
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                ) : null}
                                Cadastrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
