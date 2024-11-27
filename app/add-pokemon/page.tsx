'use client';

import Link from 'next/link';
import Form from '../components/Form';

export default function AddPokemon() {
  return (
    <main className="w-full max-w-[30rem]">
      <Link href="/" className="inline-flex items-center gap-2 mb-8 font-semibold text-slate-400 rounded hover:text-slate-100 transition-colors duration-150">
        <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M12.6663 8.00016H3.33301M3.33301 8.00016L7.99967 12.6668M3.33301 8.00016L7.99967 3.3335" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <span>Back to Pokémon List</span>
      </Link>
      
      <h1 className="mb-8 text-4xl sm:text-6xl font-bold">Add Pokémon</h1>
      <Form />
    </main>
  );
}
