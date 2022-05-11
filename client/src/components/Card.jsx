import React from "react";
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import { deletePokemon } from "../actions";
import styles from './Card.module.css'

export default function Detail({ image, name, types, }) {
  

  return (
    <div className={styles.container}>
      <img src={image} alt="img not found" width="250px" height="200px" />
      <div className={styles.name}>
        <h3>{name.toUpperCase()}</h3>
      </div>
      <div className={styles.types}>
        <h3>{types}</h3>
      </div>
      <div className={styles.click}>
        <h3>Click me to see my details</h3>
      </div>
    </div>
  );
}