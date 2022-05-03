import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchName } from "../actions";
import styles from './SearchBar.module.css'

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInput(e) {
    e.preventDefault();
    setName(e.target.value.toLowerCase());
  }
  async function handleButton(e) {
    e.preventDefault();
    dispatch(await searchName(name));
    setName("")
  }
  return (
    <div className={styles.positionSearch}>
      <input className={styles.searchInput}
        type="text"
        placeholder="Search pokemon..."
        onChange={(e) => handleInput(e)}
      />
      <button className={styles.btn} type="submit" onClick={(e) => handleButton(e)}>
        Search
      </button>
    </div>
  );
}
