import React from 'react'

export default function PokemonList({pokemon}) {
  return (
    <>
        {pokemon.map(item => (
            <div key={item}>{item}</div>
        ))}
    </>
  )
}

