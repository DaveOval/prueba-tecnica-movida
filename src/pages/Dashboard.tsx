import { useEffect, useState } from "react";
import { FormLayout } from "../components/layout";

interface Pokemon {
    name: string;
    abilities: Array<{
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
        slot: number;
    }>;
    base_experience: number;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };
}

export const Dashboard = () => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
                const data = await response.json();
                setPokemon(data);
            } catch {
                setError('Error al cargar el Pokémon');
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!pokemon) return <div>No se encontró el Pokémon</div>;

    return (
        <FormLayout title="Dashboard">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-center mb-6">
                    <img 
                        src={pokemon.sprites.front_default} 
                        alt={pokemon.name}
                        className="w-32 h-32 object-contain"
                    />
                </div>
                <h2 className="text-2xl font-bold mb-4 capitalize text-center">{pokemon.name}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold">Habilidades:</h3>
                        <ul className="list-disc list-inside">
                            {pokemon.abilities.map((ability, index) => (
                                <li key={index} className="capitalize">
                                    {ability.ability.name}
                                    {ability.is_hidden && ' (Oculta)'}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold">Estadísticas:</h3>
                        <ul className="list-disc list-inside">
                            <li>Experiencia base: {pokemon.base_experience}</li>
                            <li>Altura: {pokemon.height / 10}m</li>
                            <li>Peso: {pokemon.weight / 10}kg</li>
                        </ul>
                    </div>
                </div>
            </div>
        </FormLayout>
    );
};
