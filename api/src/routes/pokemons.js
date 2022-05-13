const axios = require('axios');
const { Router } = require('express');
const { Op } = require('sequelize');
const { Pokemon, Type } = require('../db');
const router = Router();


//RUTA PARA TRAER TODOS LOS POKEMONS, TANTO POR API Y COMO ASI TAMBIEN SI HUBIERA UNO CREADO EN LA DB
router.get("/", async (req, res, next) => {
  const dataApi = [];
  
  try {
    const api = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
    api.data.results.forEach((data) => dataApi.push(data.url));
    const api20 = api.data.next;
    const subApi = await axios.get(api20);
    subApi.data.results.forEach((data) => dataApi.push(data.url));
    
    let dataPokemons = [];
    dataApi.forEach((data) => {
      let promesa = axios.get(data);
      dataPokemons.push(promesa);
    });
    let promiseDataPokemons = await Promise.all(dataPokemons);
    
    const pokemons = promiseDataPokemons.map((pokemon) => {
      return {
        id: pokemon.data.id,
        name: pokemon.data.name,
        weight: pokemon.data.weight,
        height: pokemon.data.height,
        image: pokemon.data.sprites.other.dream_world.front_default,
        hp: pokemon.data.stats[0].base_stat,
        attack: pokemon.data.stats[1].base_stat,
        defense: pokemon.data.stats[2].base_stat,
        speed: pokemon.data.stats[5].base_stat,
        type: pokemon.data.types.map((data) => data.type.name),
      };
    });
    
    let pokemonsDb = await getDB();
    
    let pokemonsApiDb = pokemonsDb.concat(pokemons);
    res.status(200).send(pokemonsApiDb);
  } catch (error) {
    next(error);
  }
});

//FUNCION ASINCRONA PARA TRAER LOS POKEMONS DE DB Y CONCATENARLOS A LOS TRAIDOS DESDE API
const getDB = async () => {
  let pokemonsDataBase = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      
      through: {
        attributes: [],
      },
    },
  });

  pokemonsDataBase = pokemonsDataBase.map(
    ({
      id,
      name,
      hp,
      attack,
      defense,
      speed,
      weight,
      height,
      image,
      types,
      createdInDb,
    }) => ({
      id,
      name,
      hp,
      attack,
      defense,
      speed,
      weight,
      height,
      image,
      type: types.map((t) => t.name),
      createdInDb,
    })
  );
  return pokemonsDataBase;
};

// RUTA PARA BUSQUEDA API NAME Y DB NAME       
router.get("/name", async (req, res,) => {
  let { name } = req.query;
  try {
    if (name) {
      let apiName = (
        await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
        )
      ).data;
      let dataApi = [{
        id: apiName.id,
        name: apiName.name,
        hp: apiName.stats[0].base_stat,
        attack: apiName.stats[1].base_stat,
        defense: apiName.stats[2].base_stat,
        speed: apiName.stats[5].base_stat,
        height: apiName.height,
        weight: apiName.weight,
        image: apiName.sprites.other.dream_world.front_default,
        type: apiName.types.map((data) => data.type.name)
      }];

      res.status(200).send(dataApi);
    }
  } catch {
    try {
      if (name) {
        let nameDb = await Pokemon.findOne({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
          include: {
            model: Type,
            attributes: ["name"],

            through: {
              attributes: [],
            },
          },
        });
        const dataDb = [{
          id: nameDb.id,
          name: nameDb.name,
          hp: nameDb.hp,
          attack: nameDb.attack,
          defense: nameDb.defense,
          speed: nameDb.speed,
          height: nameDb.height,
          weight: nameDb.weight,
          image: nameDb.image,
          type: nameDb.types.map((t) => t.name),
          createdInDb: nameDb.createdInDb,
        }];
        if (nameDb !== null) {
          res.status(200).send(dataDb);
        }
      }
    } catch {
      res.status(404).send("Pokemon not found");
    }
  }
});
            

//RUTA PARA BUSCAR POR ID TANTO EN DB COMO EN API
router.get("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    if (!id.includes("-")) {
      const reqId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const idApi = [{
        id: reqId.data.id,
        name: reqId.data.name,
        hp: reqId.data.stats[0].base_stat,
        attack: reqId.data.stats[1].base_stat,
        defense: reqId.data.stats[2].base_stat,
        speed: reqId.data.stats[5].base_stat,
        height: reqId.data.height,
        weight: reqId.data.weight,
        image: reqId.data.sprites.other.dream_world.front_default,
        type: reqId.data.types.map((data) => data.type.name)
      }];
      res.status(200).send(idApi);
    } else {
      const idDb = await Pokemon.findByPk(id, { include: Type });

      const dataDb = [{
        id: idDb.id,
        name: idDb.name,
        hp: idDb.hp,
        attack: idDb.attack,
        defense: idDb.defense,
        speed: idDb.speed,
        height: idDb.height,
        weight: idDb.weight,
        image: idDb.image,
        type: idDb.types.map((t) => t.name),
        createdInDb: idDb.createdInDb,
      }];
      if (!idDb) {
        return res.status(404).send({ message: "ID not found" });
      }

      res.status(200).send(dataDb);
    }
  } catch (error) {
    next(error);
  }
});


//RUTA PARA CREAR UN POKEMON EN LA BASE DE DATOS
router.post("/newpokemon", async (req, res, next) => {
  try {
    const {
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      type,
      createdInDb,
    } = req.body;
    const newPokemon = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      createdInDb,
    });
    const typeDb = await Type.findAll({
      where: {
        name: type,
      },
    });
    newPokemon.addType(typeDb);
    res.send("Created pokemon");
  } catch (error) {
    next(error);
  }
});

//DELETE para eliminar pokemon desde DB.
// router.delete('/:id', async(req, res, next) => {
//   const id = req.params.id;
//   return Pokemon.destroy({
//     where: {id}
//   }).then(() => {res.status(200).send('Pokemon eliminado con exito')})
//   .catch(error => next(error))
// })


module.exports = router;
