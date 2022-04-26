const  axios  = require('axios');
const { Router } = require('express');
const {Type } = require('../db');
const router = Router();

router.get('/', async (req, res, next) => {
    let typesApi = await axios.get(`https://pokeapi.co/api/v2/type`);
    let typesName = typesApi.data.results.map(t => t.name);
    for(let i = 0; i < typesName.length; i++) {
        Type.findOrCreate({
            where: {name: typesName[i]}
        })
    }
    const allTypes = await Type.findAll({
        attributes: ['name'],
    })
    res.status(200).send(allTypes)
})


module.exports = router;
