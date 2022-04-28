import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons, filteredPokemonsTypes, filterCreated} from "../actions";
import Card from './Card';
import Paginated from "./Paginated";

export default function Home(){
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)

    const [actualPage, setActualPage] = useState(1)
    const [pokemonsPpage, setPokemonsPpage] = useState(12)
    const lastPokemonPage = actualPage * pokemonsPpage
    const firstPokemonPage = lastPokemonPage - pokemonsPpage
    const actualPokemons = allPokemons.slice(firstPokemonPage, lastPokemonPage)

    const paginated = (pageNumber) => {
        setActualPage(pageNumber)
    }

    useEffect(()=> {
        dispatch(getPokemons())
    },[dispatch])

    function handleClick(e) {
        e.preventDefault()
    }

    function handleFilterTypes(e){
        dispatch(filteredPokemonsTypes(e.target.value))
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    return(
        <div>
            <input type="text" placeholder="Search pokemon..." />
            <button>Search</button>
            <Link to= '/pokemons'>
                Create pokemon
            </Link>
        <div>   
            <select onChange={e => handleFilterCreated(e)}>
                <option value="all">All pokemons</option>
                <option value="eApi">Existing pokemon</option>
                <option value="cDb">Pokemon created</option>
            </select>
            <select onChange={e => handleFilterTypes(e)}>
                <option value="all">All</option>
                <option value="flying">Flying</option>
                <option value="fighting">Fighting</option>
                <option value="ghost">Ghost</option>
                <option value="steel">Steel</option>
                <option value="ice">Ice</option>
                <option value="dragon">Dragon</option>
                <option value="poison">Poison</option>
                <option value="rock">Rock</option>
                <option value="water">Water</option>
                <option value="electric">Electric</option>
                <option value="ground">Ground</option>
                <option value="bug">Bug</option>
                <option value="grass">Grass</option>
                <option value="normal">Normal</option>
                <option value="fire">Fire</option>
                <option value="psychic">Psychic</option>
            </select>
            <select>
                <option value="asc">Upward</option>
                <option value="desc">Falling</option>
            </select>
            <h1>Pokemon Page Henry</h1>
            <Paginated 
             pokemonsPpage = {pokemonsPpage}
             allPokemons = {allPokemons.length}
             paginated = {paginated}
            />
            
            <div>
                {
                   actualPokemons.length === 0?
                    <img src="https://c.tenor.com/Hg2Mb_mQdhYAAAAi/pokemon-pokeball.gif" alt="img not found" />
                   :actualPokemons?.map(p => {
                      return (
                          <div key={p.id} >
                             <Card name={p.name}
                              image={p.image}
                              types={'type: ' + p.type}
                              key={p.id} 
                               />   
                          </div>          
                      )                                                
                })}
            </div>

        </div>
    </div>
    )
}