import React from "react";
import styles from './Card.module.css'

export default function Card({ image, name, types, }) {
  

  return (

    <div className={styles.container}>
      <img className ={styles.logo} src={image} alt="img not found" width="100px" height="150px" />
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