import React from "react";
import styles from './Card.module.css'

export default function Detail({image, name, types, id}) {

    
    return(
            <div className={styles.container}>
            <img src={image} alt="img not found" width="250px" height="200px"/>
            <div className={styles.name}>
            <h3>
                {name.toUpperCase()}
           </h3> 
            </div>
            <div className={styles.types}>
            <h3>{types}</h3>
            </div>
            </div>
    )
}