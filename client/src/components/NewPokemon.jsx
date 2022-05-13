import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { newPokemon, getTypes } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./NewPokemon.module.css";

export function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Name is required";
  } else if (!/^[A-Z][a-z]{3,20}$/.test(input.name)) {
    errors.name =
      "The name must start with an uppercase letter and end with a lowercase letter.Accepts between 3 and 21 characters, does not accept numbers";
  }

  if (!input.hp) {
    errors.hp = "HP is required";
  } else if (input.hp < 1) {
    errors.hp = "HP must be greater than 0";
  } else if (input.hp > 999) {
    errors.hp = "HP must be less than 1000";
  }

  if (!input.attack) {
    errors.attack = "Attack is required";
  } else if (input.attack < 1) {
    errors.attack = "Attack must be greater than 0";
  } else if (input.attack > 999) {
    errors.attack = "Attack must be less than 1000";
  }

  if (!input.defense) {
    errors.defense = "Defense is required";
  } else if (input.defense < 1) {
    errors.defense = "Defense must be greater than 0";
  } else if (input.defense > 999) {
    errors.defense = "Defense must be less than 1000";
  }

  if (!input.speed) {
    errors.speed = "Speed is required";
  } else if (input.speed < 1) {
    errors.speed = "Speed must be greater than 0 ";
  } else if (input.speed > 999) {
    errors.speed = "Speed must be less than 1000";
  }

  if (!input.height) {
    errors.height = "Height is required";
  } else if (input.height < 1) {
    errors.height = "Height must be greater than 0";
  } else if (input.height > 999) {
    errors.height = "Height must be greater than 1000";
  }

  if (!input.weight) {
    errors.weight = "Weight is required";
  } else if (input.weight < 1) {
    errors.weight = "Weight must be greater than 0";
  } else if (input.weight > 999) {
    errors.weight = "Weight must be less than 1000";
  }

  if (!input.image) {
    errors.image = "Image is required";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
    errors.image = "Reference link to your pokemon image is invalid";
  }
  
  if(input.type.length < 1)  {
      errors.type = 'Insert at least one type'
  } else if(input.type.length >= 3) {
    errors.type = 'You can only choose up to 2 types'
  }
  
 
  return errors;
}

export default function NewPokemon() {
  const dispatch = useDispatch();
  const history = useHistory();

  const types = useSelector((state) => state.types);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    type: [],
  });

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleTypes(e) {
      if (e.target.checked) {
        setInput({
          ...input,
          type: [...input.type, e.target.name],
        });
      } else {
        setInput({
          ...input,
          type: input.type.filter((t) => t !== e.target.name),
        });
      }
      if(e.target.checked) {
        setErrors(validate({
          ...input,
          type: [...input.type,e.target.name]
        }))
      } else {
        setErrors(validate({
          ...input,
          type: input.type.filter((t) => t !== e.target.name)
        }))
      }
    }
    
  

  function handleSubmit(e) {
    e.preventDefault();
    const errorsValidations = validate(input);
    if (Object.keys(errorsValidations).length === 0) {
      dispatch(newPokemon(input));
      alert("Pokemon created");
      setInput({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        image: "",
        type: [],
      });
      history.push("/home");
    } else {
      alert("The pokemon was not created, please check the data entered...");
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Link to="/home">
          <button className={styles.btnh}>Go back Home</button>
        </Link>
      </div>
      <div>
        <h1>Create your pokemon!</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={input.name}
              placeholder="Name..."
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
             <p>{errors.name}</p>
          </div>

          <div>
            <label>HP: </label>
            <input
              type="number"
              name="hp"
              value={input.hp}
              placeholder="0"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            <p>{errors.hp}</p>
          </div>

          <div>
            <label>Attack: </label>
            <input
              type="number"
              name="attack"
              value={input.attack}
              placeholder="0"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            <p>{errors.attack}</p>
          </div>

          <div>
            <label>Defense: </label>
            <input
              type="number"
              name="defense"
              value={input.defense}
              placeholder="0"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            <p>{errors.defense}</p>
          </div>

          <div>
            <label>Speed: </label>
            <input
              type="number"
              name="speed"
              value={input.speed}
              placeholder="0"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            <p>{errors.speed}</p>
          </div>

          <div>
            <label>Height: </label>
            <input
              type="number"
              name="height"
              value={input.height}
              placeholder="0"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            <p>{errors.height}</p>
          </div>

          <div>
            <label>Weight: </label>
            <input
              type="number"
              name="weight"
              value={input.weight}
              placeholder="0"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            <p>{errors.weight}</p>
          </div>

          <div>
            <label>Image: </label>
            <input
              type="text"
              name="image"
              value={input.image}
              placeholder="Image..."
            //   autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            <p>{errors.image}</p>
          </div>

          <div className={styles.checkbox}>
            {types.map((t, k) => (
              <div className={styles.types} key={k}>
                <input
                  type="checkbox"
                  name={t.name}
                  key={k}
                  value={t.name}
                  onChange={(e) => handleTypes(e)}
                />
                <label>{t.name}</label>
              </div>
            ))}
          </div>
          <p>{errors.type}</p>

          <button className={styles.btn} type="submit">
            Create Pokemon
          </button>
        </form>
      </div>
    </div>
  );
}
