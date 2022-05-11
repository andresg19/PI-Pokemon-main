import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getPokemons,
  orderUpFall,
  orderUpFallAttack,
  filteredPokemonsTypes,
  filterCreated,
  getTypes,
} from "../actions";
import styles from './Home.module.css'
import Card from "./Card";

import Paginated from "./Paginated";
import SearchBar from "./SearchBar";


export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);

  const [order, setOrder] = useState("");

  const [actualPage, setActualPage] = useState(1);
  const [pokemonsPpage, setPokemonsPpage] = useState(12);
  const lastPokemonPage = actualPage * pokemonsPpage;
  const firstPokemonPage = lastPokemonPage - pokemonsPpage;
  const actualPokemons = allPokemons.slice(firstPokemonPage, lastPokemonPage);

  const types = useSelector((state) => state.types);

  const paginated = (pageNumber) => {
    setActualPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getTypes());
}, [dispatch])

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  function handleReload(e) {
    e.preventDefault();
    dispatch(getPokemons());

  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderUpFall(e.target.value));
    setActualPage(1);
    setOrder(`Organized ${e.target.value}`);
  }
  function handleSortAttack(e) {
    e.preventDefault();
    dispatch(orderUpFallAttack(e.target.value));
    setActualPage(1);
    setOrder(`Organized ${e.target.value}`);
  } 
  function handleFilterTypes(e) {
    e.preventDefault();
    dispatch(filteredPokemonsTypes(e.target.value));
    setActualPage(1);
    setOrder(`Organized ${e.target.value}`);
  }
  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setActualPage(1);
    setOrder(`Organized ${e.target.value}`);
  }

  return (
    <div className={styles.container}>
      <SearchBar />
     <div>
      <div className={styles.positionNew}>
      <Link to= '/newpokemon'><button className={styles.btn}>Create pokemon</button></Link>
        </div>
        <div className={styles.positionReload}>
          <button className={styles.btn} onClick={(e) => handleReload(e)}>Reload pokemon</button>
        </div>
          <div className={styles.box}>
            <select  onChange={(e) => handleSort(e)}>
              <option value="asc">Upward A-Z</option>
              <option value="desc">Falling A-Z</option>
            </select>
            <select onChange={(e) => handleSortAttack(e)}>
              <option value="attAs">Upward-Attack</option>
              <option value="attDes">Falling-Attack</option>
            </select>
            <select onChange={(e) => handleFilterCreated(e)}>
              <option value="all">All pokemons</option>
              <option value="eApi">Existing pokemon</option>
              <option value="cDb">Pokemon created</option>
            </select>
            <select onChange={(e) => handleFilterTypes(e)}>
              <option value="all">All Types</option>
                {types?.map((t) => (
                <option key={t.id} value={t.name}>{t.name}</option>
                 ))}
            </select>
          </div>


          
      
          <div className={styles.title}>
            <h1>Pokemon Page Henry</h1>
          </div>

          

          <Paginated
            pokemonsPpage={pokemonsPpage}
            allPokemons={allPokemons.length}
            paginated={paginated}
          />

          <div>
            {actualPokemons.length === 0 ? (
              <img
                src="https://c.tenor.com/Hg2Mb_mQdhYAAAAi/pokemon-pokeball.gif"
                alt="img not found"
              />
            ) : (
              actualPokemons?.map((p) => {
                return (
                  <div className={styles.cards} key={p.id}>
                    <Link to= {`/detail/${p.id}`}> 
                    <Card 
                      name={p.name}
                      image={p.image}
                      types={"Types: " + p.type}
                      key={p.id}
                    />
                    </Link> 
                  </div> 
                );
              })
            )}
          </div>
      </div>
    </div>
  );
}
