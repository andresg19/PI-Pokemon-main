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
        if (input.type.length === 2) {
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
        if(Object.keys(errorsValidations).length === 0) {
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
        const errors = {};

        let validateImg = /^(ftp|http|https):\/\/[^ "]+$/.test(input.image)

        if(!input.name) {
            errors.name = 'Name is required';
        } else if (!isNaN(input.name)) {
            errors.name = 'The name cannot be a number';
        }
        

        if(!input.hp) {
            errors.hp = 'HP is required';
        } else if(input.hp <= 0) {
            errors.hp = 'HP must be greater than 0';
        } else if(isNaN(input.hp) === true) {
            errors.hp = 'HP cannot contain letters';
        } 

        if(!input.attack) {
            errors.attack = 'Attack is required';
        } else if(input.attack <= 0) {
            errors.attack = 'Attack must be greater than 0';
        } else if(isNaN(input.attack) === true) {
            errors.attack = 'Attack cannot contain letters';
        }

        if(!input.defense) {
            errors.defense = 'Defense is required';
        } else if(input.defense <= 0) {
            errors.defense = 'Defense must be greater than 0';
        } else if(isNaN(input.defense) === true) {
            errors.defense = 'Defense cannot contain letters'
        }

        if(!input.speed) {
            errors.speed = 'Speed is required';
        } else if(input.speed <= 0) {
            errors.speed = 'Speed must be greater than 0';
        } else if(isNaN(input.speed) === true) {
            errors.speed = 'Speed cannot contain letters'
        }

        if(!input.height) {
            errors.height = 'Height is required';
        } else if(input.height <= 0) {
            errors.height = 'Height must be greater than 0';
        } else if(isNaN(input.height) === true) {
            errors.height = 'Height cannot contain letters'
        }

        if(!input.weight) {
            errors.weight = 'Weight is required';
        } else if(input.weight <= 0) {
            errors.weight = 'Weight must be greater than 0';
        } else if(isNaN(input.weight) === true) {
            errors.weight = 'Weight cannot contain letters'
        }

        if(!input.image) {
            errors.image = 'Place the reference link of your Pokemon image';
        } else if(!validateImg) {
            errors.image = 'The reference link to your pokemon image is invalid';
        }

        if(!input.type) {
            errors.type = 'Insert at least one type'
        }
        return errors;
    };

    return (
        <div className={styles.container}>
            <Link to= '/home'> <button className={styles.btn}>Go back home</button> </Link>
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
                    type="text"
                    value={input.hp}
                    name = 'hp'
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                    {!error.hp? null: <p>{error.hp}</p>}
                <div>
                <label>Attack:</label>
                    <input className= {error.attack && styles.danger}
                    type="text"
                    value={input.attack}
                    name = 'attack'
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                   {!error.attack? null: <p>{error.attack}</p>}
                <div>
                <label>Defense:</label>
                    <input className= {error.defense && styles.danger}
                    type="text"
                    value={input.defense}
                    name = 'defense'
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                  {!error.defense? null:  <p>{error.defense}</p>}
                <div>
                <label>Speed:</label>
                    <input className= {error.speed && styles.danger}
                    type="text"
                    value={input.speed}
                    name = 'speed'
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                    {!error.speed? null: <p>{error.speed}</p>}
                <div>
                <label>Height:</label>
                    <input className= {error.height && styles.danger}
                    type="text"
                    value={input.height}
                    name = 'height'
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                  {!error.height? null: <p>{error.height}</p>}
                <div>
                <label>Weight:</label>
                    <input className= {error.weight && styles.danger}
                    type="text"
                    value={input.weight}
                    name = 'weight'
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                   {!error.weight? null: <p>{error.weight}</p>}
                <div>
                <label>Image:</label>
                    <input className= {error.image && styles.danger}
                    type="text"
                    value={input.image}
                    name = 'image'
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                   {!error.image? null: <p>{error.image}</p>}
                <select  onChange={(e) => handleTypes(e)}>
                    {types.map((t) =>(
                        <option value={t.name}>{t.name}</option>
                    ))}
                </select>
                    {!error.type? null: <p>{error.type}</p>}
                {/* <ul><li>{types.map(el=>el + ' ,')}</li></ul> */}
                <button className={styles.btn} type="submit">Create pokemon</button>
            </form>
        </div>
    )
}