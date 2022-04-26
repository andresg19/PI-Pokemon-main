const axios = require('axios');
const { Router } = require('express');
const { Op } = require('sequelize');
const { Pokemon, Type } = require('../db');
const router = Router();



// RUTA PARA BUSQUEDA API NAME Y DB NAME       
router.get('/name', async(req, res, next) => {
    let { name } = req.query

    if(name) {
        try {
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
                        attributes: []
                    }
                }
            });
            if(nameDb !== null) {
                res.status(200).send(nameDb);

            } else {
                let apiName = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)).data;
            let dataApi = {
               id: apiName.id,
               name: apiName.name,
               hp: apiName.stats[0].base_stat,
               attack: apiName.stats[1].base_stat,
               defense: apiName.stats[2].base_stat,
               speed: apiName.stats[5].base_stat,
               height: apiName.height,
               weight: apiName.weight,
               image: apiName.sprites.other.dream_world.front_default,
               type: apiName.types[0].type.name
           }
           
           res.status(200).send(dataApi)
        }
        }
        catch {
           res.status(404).send('Pokemon not found') ;
          }
    }
})


//FUNCION ASINCRONA PARA TRAER LOS POKEMONS DE DB Y CONCATENARLOS A LOS TRAIDOS DESDE API
const getDB = async ()=>{
    return await Pokemon.findAll({ 
        include:{
            model: Type,
            attributes: ['name'],

            through:{
                attributes: [],
            }
        }
})       

}
//RUTA PARA TRAER TODOS LOS POKEMONS, TANTO POR API Y COMO ASI TAMBIEN SI HUBIERA UNO CREADO EN LA DB
router.get('/', async (req, res, next) => {       
    try {
        let dataPokemon = []
        let api = (await axios.get(`https://pokeapi.co/api/v2/pokemon`)).data  
        let api20= (await axios.get(api.next)).data
        let api40= [...api.results,...api20.results]
        const getDataPokemon = async (i) => {
            let pokemonData = await axios.get(api40[i].url);
            let pokemon = {
                id: pokemonData.data.id,
                name: pokemonData.data.name,
                hp: pokemonData.data.stats[0].base_stat,
                attack: pokemonData.data.stats[1].base_stat,
                defense: pokemonData.data.stats[2].base_stat,
                speed: pokemonData.data.stats[5].base_stat,
                height: pokemonData.data.height,
                weight: pokemonData.data.weight,
                image: pokemonData.data.sprites.other.dream_world.front_default,
                type: pokemonData.data.types[0].type.name
                
            }
            dataPokemon.push(pokemon)
        }
         for(let i = 0; i < api40.length; i++) {
            await getDataPokemon(i);
        }
        let pokemonsDb = await getDB();
        let pokemonsApiDb = pokemonsDb.concat(dataPokemon)
        res.status(200).send(pokemonsApiDb)

        
    } 
    catch(error) {
        next(error);
      }
})

//RUTA PARA BUSCAR POR ID TANTO EN DB COMO EN API
router.get('/:id' , async(req, res, next) => {
    try {
        let id = req.params.id;
        if(!id.includes('-')) {
            const reqId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const idApi = {
                id: reqId.data.id,
                name: reqId.data.name,
                hp: reqId.data.stats[0].base_stat,
                attack: reqId.data.stats[1].base_stat,
                defense: reqId.data.stats[2].base_stat,
                speed: reqId.data.stats[5].base_stat,
                height: reqId.data.height,
                weight: reqId.data.weight,
                image: reqId.data.sprites.other.dream_world.front_default,
                type: reqId.data.types[0].type.name
            };
            res.status(200).send(idApi)
        } else {
            const idDb = await Pokemon.findByPk(id,{include: Type})
                  
            const dataDb = {
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
                createdInDatabase: idDb.createdInDatabase
            };
            if(!idDb) {
                return res.status(404).send({message: 'ID not found'})
            }
            
             res.status(200).send(dataDb)
        }
    } 
    catch(error) {
        next(error)
    }
})


//RUTA PARA CREAR UN POKEMON EN LA BASE DE DATOS
router.post('/newpokemon', async(req, res, next) => {
    try{
        const {  name, hp, attack, defense, speed, height, weight, image,  type } = req.body;
        const newPokemon = await Pokemon.create({        
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            image
        })
        const typeDb = await Type.findAll({
            where: {
            name: type
        }    
    })      
    await newPokemon.addType(typeDb);
    res.send(newPokemon);
        
    } 
    catch(error) {
        next(error)
    }
})

module.exports = router;
