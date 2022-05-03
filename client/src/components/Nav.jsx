import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCreated,
  getPokemons,
  filteredPokemonsTypes,
  getTypes,
} from "../actions";
import SearchBar from "./SearchBar";
import styles from './Nav.module.css'

export default function Nav() {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");
  const types = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getTypes());
}, [dispatch])

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
    setOrder(`Organized ${e.target.value}`);
  }
  function handleReload(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }
  function handleFilterTypes(e) {
    dispatch(filteredPokemonsTypes(e.target.value));
  }

  return (
    <nav className={styles.nav}>
        <SearchBar />
      <div className={styles.positionSelect}>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="all">All pokemons</option>
          <option value="eApi">Existing pokemon</option>
          <option value="cDb">Pokemon created</option>
        </select>
        <select onChange={(e) => handleFilterTypes(e)}>
          <option value="all">All Types</option>
          {types?.map((t) => (
            <option value={t.name}>{t.name}</option>
          ))}
        </select>
      </div>
        <div className={styles.positionBtn}>
          <button className={styles.btn} onClick={(e) => handleReload(e)}>Reload pokemon</button>
        </div>
    </nav>
  );
}
