import Image from "next/image";
import { Drawer } from "vaul";
import type { Pokemon } from "../types";

function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Drawer.Root>
      <Drawer.Trigger className="flex items-center gap-4 p-6 rounded-md bg-slate-900 text-left hover:bg-slate-800 transition-colors duration-300">
        <Image src={pokemon.image} alt={pokemon.name} width={60} height={60} loading="lazy" />
        <span className="font-bold capitalize">{pokemon.name} <br /><span className="font-normal text-sm text-slate-500">{pokemon.types.join(', ')}</span></span>
      </Drawer.Trigger>
      <Drawer.Portal>
      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-slate-900 h-fit fixed bottom-0 left-0 right-0 outline-none">
          <div className="p-10 m-auto max-w-[20rem]">
            <div className="flex flex-col sm:flex-row justify-center gap-10">
              <Image src={pokemon.image} alt={pokemon.name} width={240} height={240} loading="lazy" />
              <div>
                <span className="text-4xl sm:text-5xl font-bold capitalize">{pokemon.name}</span>
                <div>
                  <span className="font-normal text-xl text-slate-500">{pokemon.types.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default PokemonCard;