import React from "react";
import { Link } from "react-router-dom";
import styles from './Landing.module.css'

export default function Landing() {
  
  return (
    <div className={styles.container}>
      <div className={styles.font}>
        <h1>Welcome to Pokemon Page Henry</h1>
      </div>
      <Link to="/home">
        <button className={styles.btn}>Go Home</button>
      </Link>
    </div> 
  );
}
