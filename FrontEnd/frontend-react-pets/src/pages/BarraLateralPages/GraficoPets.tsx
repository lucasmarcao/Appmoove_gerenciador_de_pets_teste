import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { getListarPets } from "../ts/requisicoes";
import type { MyPet } from "../ts/requisicoes";
import "./graficopets.css";

// Registrar os componentes do Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const GraficoPets: React.FC = () => {
    const [chartData, setChartData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pets: MyPet[] = await getListarPets();

                // Calcular a distribuição por faixa etária
                const distribution = calcularDistribuicaoIdade(pets);

                // Configurar dados para o gráfico
                const data = {
                    labels: ["0-1 anos", "2-3 anos", "4-6 anos", "7+ anos"],
                    datasets: [
                        {
                            label: "Quantidade de Pets",
                            data: [
                                distribution.faixa0a1,
                                distribution.faixa2a3,
                                distribution.faixa4a6,
                                distribution.faixa7Mais,
                            ],
                            backgroundColor: [
                                "rgba(54, 162, 235, 0.5)",
                                "rgba(75, 192, 192, 0.5)",
                                "rgba(255, 206, 86, 0.5)",
                                "rgba(255, 99, 132, 0.5)",
                            ],
                            borderColor: [
                                "rgba(54, 162, 235, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(255, 99, 132, 1)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                };

                setChartData(data);
                setIsLoading(false);
            } catch (err) {
                setError("Erro ao carregar dados para o gráfico.");
                setIsLoading(false);
                console.error("Erro ao buscar pets:", err);
            }
        };

        fetchData();
    }, []);

    // Função para calcular a distribuição por faixa etária
    const calcularDistribuicaoIdade = (pets: MyPet[]) => {
        const distribution = {
            faixa0a1: 0,
            faixa2a3: 0,
            faixa4a6: 0,
            faixa7Mais: 0,
        };

        pets.forEach((pet) => {
            const idade = pet.ageYears;
            if (idade >= 0 && idade <= 1) {
                distribution.faixa0a1++;
            } else if (idade >= 2 && idade <= 3) {
                distribution.faixa2a3++;
            } else if (idade >= 4 && idade <= 6) {
                distribution.faixa4a6++;
            } else if (idade >= 7) {
                distribution.faixa7Mais++;
            }
        });

        return distribution;
    };

    // Opções de configuração do gráfico
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Distribuição de Idade dos Pets",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Quantidade de Pets",
                },
            },
            x: {
                title: {
                    display: true,
                    text: "Faixa Etária (anos)",
                },
            },
        },
    };

    if (isLoading) {
        return (
            <div className="grafico-container">
                <div className="loading">Carregando dados...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="grafico-container">
                <div className="error">{error}</div>
            </div>
        );
    }

    return (
        <div className="grafico-container">
            <h2>Distribuição de Idade dos Pets</h2>
            <div className="chart-wrapper">
                {chartData && <Bar data={chartData} options={options} />}
            </div>
        </div>
    );
};

export default GraficoPets;
