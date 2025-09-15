const API_URL = import.meta.env.VITE_API_URL;
const BREEDS_API_URL = import.meta.env.VITE_BREEDS_API_URL;

// vou deixar elas de proposito : vai que
// vcs pensam que to puxando direto da apidog ou apicat
//const API_URL = "http://localhost:8087/pets/";
//const BREEDS_API_URL = `http://localhost:8087`;

export interface NewPet {
    name: string;
    species: "dog" | "cat";
    breed: string;
    ageYears: number;
    shelterCity: string;
    shelterLat: number;
    shelterLng: number;
    status: "available" | "adopted";
}

export interface PetPage {
    total: number;
    size: number;
    page: number;
    content: MyPet[];
}

export interface MyPet {
    ageYears: number;
    breed: string;
    createdAt: Date;
    id: string;
    name: string;
    shelterCity: string;
    shelterLat: number;
    shelterLng: number;
    species: string;
    status: string;
}

export interface Breed {
    name: string;
    origin: string;
    life_span: string;
    temperament: string;
    image_url: string;
}

export interface BreedPage {
    total: number;
    size: number;
    page: number;
    content: Breed[];
}

export interface CidadesBrasil {
    shelterCity: string;
    shelterLat: number;
    shelterLng: number;
}

function normalizePet(
    pet: Omit<MyPet, "createdAt"> & { createdAt: string | Date }
): MyPet {
    return { ...pet, createdAt: new Date(pet.createdAt) };
}

// safadeza
export async function getListarPets(): Promise<MyPet[]> {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        // Desserializa o envelope inteiro
        const pageData: PetPage = await response.json();

        // Retorna apenas o array de pets
        return pageData.content.map((pet) => ({
            ...pet,
            // converte createdAt de string para Date, se quiser
            createdAt: new Date(pet.createdAt),
        }));
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return [];
    }
}

// intankables
export async function getPetsWithFilters(
    name?: string,
    species?: string,
    breed?: string,
    shelter_city?: string,
    status?: string,
    page: number = 0,
    size: number = 12,
    sortBy: string = "createdAt",
    order: string = "desc"
): Promise<PetPage> {
    const params = new URLSearchParams();
    if (name) params.append("name", name);
    if (species) params.append("species", species);
    if (breed) params.append("breed", breed);
    if (shelter_city) params.append("shelter_city", shelter_city);
    if (status) params.append("status", status);
    params.append("page", page.toString());
    params.append("size", size.toString());
    params.append("sortBy", sortBy);
    params.append("order", order);

    const response = await fetch(`${API_URL}?${params}`);
    if (!response.ok) throw new Error(`Erro: ${response.status}`);
    return await response.json();
}

// mais safadeza
export async function getPetsPage(): Promise<PetPage> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Erro: ${response.status}`);
    return await response.json();
}

export async function getPetById(id: string): Promise<MyPet | null> {
    try {
        const response = await fetch(`${API_URL}${id}`);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        const pet = await response.json();
        return normalizePet(pet);
    } catch (e) {
        console.error("Erro ao buscar pet por id:", e);
        return null;
    }
}

export interface AgeDistribution {
    "0-1": number;
    "2-3": number;
    "4-6": number;
    "7+": number;
}

export async function getAgeDistribution(): Promise<AgeDistribution> {
    const response = await fetch(`${API_URL}age-distribution`);
    if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
    }
    return await response.json();
}

// a brincadeira gostosa nao tem limites
export async function getAllPets(): Promise<MyPet[]> {
    try {
        // Fazer uma requisição com tamanho grande para obter todos os pets de uma vez
        const response = await fetch(`${API_URL}?page=0&size=1000`);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const pageData: PetPage = await response.json();
        return pageData.content.map((pet) => ({
            ...pet,
            createdAt: new Date(pet.createdAt),
        }));
    } catch (error) {
        console.error("Erro ao buscar todos os pets:", error);
        return [];
    }
}

// postzudo finarmente
export async function createPet(pet: NewPet): Promise<MyPet> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pet),
    });

    if (!response.ok) {
        throw new Error(`Falha ao criar pet: ${response.status}`);
    }

    const created = await response.json();
    return normalizePet(created);
}

export async function getBreeds(
    species: string,
    name?: string,
    page: number = 0,
    size: number = 10
): Promise<BreedPage> {
    const params = new URLSearchParams();
    if (name) params.append("name", name);
    params.append("page", page.toString());
    params.append("size", size.toString());

    const response = await fetch(
        `${BREEDS_API_URL}/breeds/${species}/?${params}`
    );

    if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
    }

    return await response.json();
}

export async function getAllBreeds(
    species: string,
    name?: string
): Promise<Breed[]> {
    // Busca todas as raças sem paginação
    const params = new URLSearchParams();
    if (name) params.append("name", name);

    const response = await fetch(
        `${BREEDS_API_URL}/breeds/${species}?${params}`
    );

    if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : data.content || [];
}
