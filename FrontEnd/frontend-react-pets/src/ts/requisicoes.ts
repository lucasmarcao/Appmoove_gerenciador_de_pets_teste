// apiClient.ts
const API_URL = "http://localhost:8087/pets/";

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

// GET request
export async function getListarPets(): Promise<MyPet[]> {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        const data: MyPet[] = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return []; // retorna array vazio em caso de erro
    }
}
// POST request
// export async function enviarDados(payload: object) {
//     try {
//         const response = await fetch(API_URL, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(payload),
//         });

//         if (!response.ok) {
//             throw new Error(`Erro: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Resposta do servidor:", data);
//         return data;
//     } catch (error) {
//         console.error("Erro na requisição POST:", error);
//     }
// }
