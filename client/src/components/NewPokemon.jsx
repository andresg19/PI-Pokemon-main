import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { newPokemon, getTypes } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from './NewPokemon.module.css'

export default function NewPokemon() {
    const dispatch = useDispatch()
    const history = useHistory()
    const types= useSelector((state) => state.types)
    
    const [error, setError] = useState('')
    
    const [input, setInput] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        image: '',
        type: []
    })

    function handleChange(e) {
        setInput({
           ...input,
           [e.target.name] : e.target.value
        })
        setError(validations({
            ...input,
           [e.target.name] : e.target.value
        }))
    }
    function handleTypes(e) {
        if (!e.target.value) {
            return;
        }
        if (input.type.length >= 2) {
            alert("You can only choose max 2 types per Pokemon");
            return;
          }
        setInput({
           ...input,
           type: [...input.type, e.target.value]
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        const errorsValidations = validations();
        setError(errorsValidations)
        if (!Object.keys(errorsValidations)) { 
        dispatch(newPokemon(input))
        alert('Pokemon created!')
        setInput({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        image: '',
        type: []
        })
        history.push('/home') 
    } 
    };

    useEffect(() => {
        dispatch(getTypes());
    }, [])


    function validations() {
        const error = {};

        let validateImg = /^(ftp|http|https):\/\/[^ "]+$/.test(input.image)
        let validateName = /^[A-Z][a-z]{3,20}$/.test(input.name)

        if(!input.name) {
            error.name = 'Name is required';
        } else if (!(validateName)) {
            error.name = 'The name must start with a capital letter and end with a lowercase letter. Accept between 3 and 20 characters';
        }
        
        if(!input.hp) {
            error.hp = 'HP is required';
        } else if(input.hp <= 0 || input.hp > 999) {
            error.hp = 'HP must be greater than 0 and less than 1000';
        } 
        // if(!input.hp){
        //     error.hp = 'Numero de hp es requerido'   
        // }else if(!/^[0-9]*$/.test(input.hp)){
        //     error.hp = 'Debe ser un numero mayor a 1 '
        // }else if(input.hp <= 999){
        //     error.hp='Numero inválido, debe ser menor o igual a 100'
        // }



        if(!input.attack) {
            error.attack = 'Attack is required';
        } else if(input.attack <= 0 || input.attack > 999) {
            error.attack = 'Attack must be greater than 0 and less than 1000';
        } 
        // if(!input.attack){
        //     error.attack = 'Numero de attack es requerido'   
        // }else if(!/^[0-9]*$/.test(input.attack)){
        //     error.attack = 'Debe ser un numero mayor a 1 '
        // }else if(input.attack <= 999){
        //     error.attack='Numero inválido, debe ser menor o igual a 100'
        // }

 
        if(!input.defense) {
            error.defense = 'Defense is required';
        } else if(input.defense <= 0 || input.defense > 999) {
            error.defense = 'Defense must be greater than 0 and less than 1000';
        } 

        if(!input.speed) {
            error.speed = 'Speed is required';
        } else if(input.speed  <= 0 || input.speed > 999) {
            error.speed = 'Speed must be greater than 0 and less than 1000';
        } 

        if(!input.height) {
            error.height = 'Height is required';
        } else if(input.height <= 0 || input.height > 999) {
            error.height = 'Height must be greater than 0 and less than 1000';
        } 

        if(!input.weight) {
            error.weight = 'Weight is required';
        } else if(input.weight <= 0 || input.weight > 999) {
            error.weight = 'Weight must be greater than 0 and less than 1000';
        } 

        if(!validateImg) {
            error.image = 'The reference link to your pokemon image is invalid';
        } else if(validateImg) {
            error.image = 'Reference link to your pokemon image is valid';
        }

        if(!input.type) {
            error.type = 'Insert at least one type'
        }
        return error;
    };

    return (
        <div className={styles.container}>
            <Link to= '/home'> <button className={styles.btnh}>Go back home</button> </Link>
            <div className={styles.title}>
            <h1>Create your pokemon!</h1>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input className= {error.name && styles.danger}
                    type="text"
                    value={input.name}
                    name = 'name'
                    onChange={(e) => handleChange(e)}
                     />
                    {!error.name? null: <p>{error.name}</p>}
                </div>
                <div>
                <label>Hp:</label>
                    <input className= {error.hp && styles.danger}
                    type="number"
                    value={input.hp}
                    name = 'hp'
                    onChange={(e) => handleChange(e)}
                    />
                    {!error.hp? null: <p>{error.hp}</p>}
                </div>
                <div>
                <label>Attack:</label>
                    <input className= {error.attack && styles.danger}
                    type="number"
                    value={input.attack}
                    name = 'attack'
                    onChange={(e) => handleChange(e)}
                    />
                   {!error.attack? null: <p>{error.attack}</p>}
                </div>
                <div>
                <label>Defense:</label>
                    <input className= {error.defense && styles.danger}
                    type="number"
                    value={input.defense}
                    name = 'defense'
                    onChange={(e) => handleChange(e)}
                    />
                  {!error.defense? null:  <p>{error.defense}</p>}
                </div>
                <div>
                <label>Speed:</label>
                    <input className= {error.speed && styles.danger}
                    type="number"
                    value={input.speed}
                    name = 'speed'
                    onChange={(e) => handleChange(e)}
                    />
                    {!error.speed? null: <p>{error.speed}</p>}
                </div>
                <div>
                <label>Height:</label>
                    <input className= {error.height && styles.danger}
                    type="number"
                    value={input.height}
                    name = 'height'
                    onChange={(e) => handleChange(e)}
                    />
                  {!error.height? null: <p>{error.height}</p>}
                </div>
                <div>
                <label>Weight:</label>
                    <input className= {error.weight && styles.danger}
                    type="number"
                    value={input.weight}
                    name = 'weight'
                    onChange={(e) => handleChange(e)}
                    />
                   {!error.weight? null: <p>{error.weight}</p>}
                </div>
                <div>
                <label>Image:</label>
                    <input className= {error.image && styles.danger}
                    type="text"
                    value={input.image}
                    name = 'image'
                    onChange={(e) => handleChange(e)}
                    />
                   {!error.image? null: <p>{error.image}</p>}
                </div>
                <div className={styles.types}>
                    {types.map((t) =>(
                      <label>  <input className={error.type && styles.checks}
                        type= "checkbox"
                        value={t.name}
                        name= "type"
                        onChange={(e) => handleTypes(e)}
                        />
                        {t.name}</label>
                    ))}
                {!error.type? null: <p>{error.type}</p> }
                </div>
                <button className={styles.btn} type="submit">Create pokemon</button>
            </form>
        </div>
    )
}