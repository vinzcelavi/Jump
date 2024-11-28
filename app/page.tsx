'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import Loader from './components/Loader';
import PokemonCard from './components/PokemonCard';

interface Pokemon {
  name: string;
  url: string;
  image: string;
  types: string[];
}

interface PokemonType {
  name: string;
}

const fetchPokemon = async (): Promise<Pokemon[]> => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=15');
  if (!res.ok) {
    throw new Error('Failed to fetch Pokémon data');
  }
  const data = await res.json();

  // Fetch details for each Pokemon to get images
  const detailedPokemon = await Promise.all(
    data.results.map(async (pokemon: { name: string; url: string }) => {
      const detailRes = await fetch(pokemon.url);
      const detailData = await detailRes.json();
      return {
        name: pokemon.name,
        url: pokemon.url,
        image: detailData.sprites.other.dream_world.front_default,
        types: detailData.types.map((type: { type: { name: string } }) => type.type.name),
      };
    })
  );

  return detailedPokemon;
};

// Fetch Pokémon types
const fetchTypes = async (): Promise<PokemonType[]> => {
  const res = await fetch('https://pokeapi.co/api/v2/type');
  if (!res.ok) {
    throw new Error('Failed to fetch Pokémon types');
  }
  const data = await res.json();
  return data.results;
};

export default function Home() {
  const { data: pokemonData, isLoading, error } = useQuery({
    queryKey: ['pokemon'],
    queryFn: fetchPokemon,
  });
  const { data: typesData } = useQuery<PokemonType[]>({
    queryKey: ['types'],
    queryFn: fetchTypes
  });

  const [filter, setFilter] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>(''); // State for selected type

  // Filter Pokémon by name and type
  const filteredPokemon = useCallback(() => {
    if (!pokemonData) return [];
    return pokemonData.filter((pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(filter.toLowerCase());
      const matchesType = selectedType
        ? pokemon.types.includes(selectedType.toLowerCase())
        : true;
      return matchesName && matchesType;
    });
  }, [filter, selectedType, pokemonData]);


  if (isLoading) return <div className="flex justify-center items-center h-screen"><Loader /></div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <main className="w-full max-w-[70rem]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <h1 className="text-4xl md:text-6xl font-bold">Pokémon list</h1>
        <Link href="/add-pokemon" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-800 rounded hover:bg-blue-700 transition-colors duration-150">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Add New Pokémon"><title>Add New Pokémon</title><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          <span>Add a new Pokémon</span>
        </Link>
      </div>

      <div className="flex gap-4 mb-5"> 
        <div className="flex-1">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter Pokémon by name..."
            className="p-4 h-14 border-2 border-slate-800 hover:border-slate-700 focus:border-slate-300 bg-slate-900 w-full rounded transition-colors duration-150"
          />
        </div>

        <div className="flex-0">
          <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-4 h-14 leading-none border-2 border-slate-800 hover:border-slate-700 focus:border-slate-300 bg-slate-900 w-full rounded appearance-none transition-colors duration-150"
        >
          <option value="">Filter by Type</option>
          {typesData?.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </option>
          ))}
          </select>
        </div>
      </div>

      <ul className="flex flex-col gap-2">
        {filteredPokemon()?.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </ul>

      {filteredPokemon().length === 0 && <div className="p-10 text-2xl text-center text-slate-500"><span className="text-8xl">😞</span> <span className="block mt-4">No Pokémon found</span></div>}
    </main>
  );
}
