// src/components/PokemonListContent.tsx

import { useState, useEffect } from "react";
import styled from "styled-components";
import { Pokemon } from "../interfaces/Pokemons";

const PokemonPreviewDiv = styled.div`
    width: 100%;
    margin: auto;
    background-color: #111111;

    border: 5px solid transparent;
    border-image: linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);
    border-image-slice: 1;
`
// I got the three border lines above from https://codepen.io/unnegative/pen/dVwYBq to get a rainbow looking border.

const PokemonImage = styled.img`
    width: 90%;
    height: auto;
    
`

const PokemonName = styled.h1`
    font-size: 1em;
`

const RandomButton = styled.button`
    border: 3px solid lightblue;
    margin-bottom: 10px;
`

const PokemonPreview = ({pokemon}: {pokemon: Pokemon}) => {
    return (
        <PokemonPreviewDiv>
            <PokemonName>{pokemon.name}</PokemonName>
            <PokemonImage src={pokemon.image} alt={pokemon.name} />
            <p>ID: {pokemon.id}</p>
            <p>HEIGHT: {pokemon.height}</p>
            <p>WEIGHT: {pokemon.weight}</p>
        </PokemonPreviewDiv>
    )
}

export default function PokemonListContent() {
    const[randomNumber, setRandomNumber] = useState(1);
    const[pokemons, setPokemons] = useState<Pokemon[]>([]);

    // my useEffect hook for error handling and re-rendering.
    useEffect(() => {
        async function getPokemons() {
            const rawData = await fetch("https://pokeapi.co/api/v2/pokemon/" + randomNumber);
            console.log("Raw data: ", rawData);
            const data = await rawData.json();

            const pokemon: Pokemon = {
                name: data.name,
                id: data.id,
                image: data.sprites.other["official-artwork"].front_default, 
                height: data.height,
                weight: data.weight
            };

            setPokemons([pokemon]); 
        }
        getPokemons()
            .then(() => console.log("Data fetched successfully"))
            .catch((e: Error) => console.log("There was the error: " + e));;
    }, [randomNumber]);  // this randomNumber makes the useEffect re-run

    function generateRandomNumber() {
        const newRandomNumber = Math.floor(Math.random() * 1000) + 1; 
        console.log("Random number generated:", newRandomNumber);
        setRandomNumber(newRandomNumber);
    }

    return (
        <>
            <RandomButton onClick={generateRandomNumber}>Generate random</RandomButton>

            { pokemons.map(pokemon => <PokemonPreview pokemon={pokemon} />) }
        </>
        
    );
}

