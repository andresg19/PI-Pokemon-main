// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getDetail, clearPage } from "../actions";
// import { useEffect } from "react";
// import styles from './Detail.module.css'

// export default function Detail(){
//     const {id} = useParams()
    
//     const dispatch = useDispatch()

//     const stateDetail = useSelector((state) => state.detail)
    

//     useEffect(() => {
//         dispatch(getDetail(id))
//         return() => {
//             dispatch(clearPage())
//         }
//     }, [dispatch, id])

//     function stateDetailPokemons() {
//         return stateDetail[0]
    
//     }
//     let allDetails = stateDetailPokemons()

    
//     return(
//         <div className={styles.container}>
//             <Link to= '/home'> <button className={styles.btn}>Go back home</button> </Link>
//             <div>
            
//             {
//                 allDetails?
//                 <div className={styles.cards}>
//                 <div className={styles.name}><h2>Name: {allDetails.name.toUpperCase()}</h2></div>
//                 <div className={styles.img}>{<img src={allDetails.image} alt="img not found" width="250px" height="200px"/>}</div>
//                 <div className={styles.hp}><h3>HP: {allDetails.hp}</h3></div>
//                 <div className={styles.attack}><h3>Attack: {allDetails.attack}</h3></div>
//                 <div className={styles.defense}> <h3>Defense: {allDetails.defense}</h3></div>
//                 <div className={styles.speed}> <h3>Speed: {allDetails.speed}</h3></div>
//                 <div className={styles.height}> <h3>Height: {allDetails.height}</h3></div>
//                 <div className={styles.weight}> <h3>Weight: {allDetails.weight}</h3></div>
//                 <div className={styles.types}> <h3>Types: {allDetails.type + ' '}</h3></div>
//                 <div className={styles.id}> <h3>ID: {allDetails.id}</h3></div>
//             </div> 
//             : <img src="https://c.tenor.com/Hg2Mb_mQdhYAAAAi/pokemon-pokeball.gif" alt="img not found" />
//         }
//         </div>
//         </div>
//     )
// }
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clearPage } from "../actions";
import { useEffect } from "react";
import styles from './Detail.module.css'

export default function Detail(){
    const {id} = useParams()
    
    const dispatch = useDispatch()

    const stateDetail = useSelector((state) => state.detail)
    

    useEffect(() => {
        dispatch(getDetail(id))
        return() => {
            dispatch(clearPage())
        }
    }, [dispatch, id])

    function stateDetailPokemons() {
        return stateDetail[0]
    
    }
    let allDetails = stateDetailPokemons()

    
    return(
        <div className={styles.container}>
            <Link to= '/home'> <button className={styles.btn}>Go back home</button> </Link>
            <div>
            
            {
                allDetails?
                <div className={styles.cards}>
                <div className={styles.name}><h2>Name: {allDetails.name.toUpperCase()}</h2></div>
                <div className={styles.img}>{<img src={allDetails.image} alt="img not found" width="250px" height="200px"/>}</div>
                <div className={styles.hp}><h3>HP: {allDetails.hp}</h3></div>
                <div className={styles.attack}><h3>Attack: {allDetails.attack}</h3></div>
                <div className={styles.defense}> <h3>Defense: {allDetails.defense}</h3></div>
                <div className={styles.speed}> <h3>Speed: {allDetails.speed}</h3></div>
                <div className={styles.height}> <h3>Height: {allDetails.height}</h3></div>
                <div className={styles.weight}> <h3>Weight: {allDetails.weight}</h3></div>
                <div className={styles.types}> <h3>Types: {allDetails.type + ' '}</h3></div>
                <div className={styles.id}> <h3>ID: {allDetails.id}</h3></div>
            </div> 
            : <img src="https://c.tenor.com/Hg2Mb_mQdhYAAAAi/pokemon-pokeball.gif" alt="img not found" />
        }
        </div>
        </div>
    )
}