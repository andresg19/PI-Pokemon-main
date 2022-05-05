import React from "react";
import styles from './Paginated.module.css'

export default function Paginated({ pokemonsPpage, allPokemons, paginated }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPpage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav  className={styles.position}>
      <ul className={styles.paginated}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            // <li className="number" key={number}>
            <a className={styles.a} onClick={() => paginated(number)}>{number}</a>
            // </li>
          ))}
      </ul>
    </nav>
  );
}
