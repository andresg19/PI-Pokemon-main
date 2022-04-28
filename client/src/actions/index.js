import axios from 'axios'

export function getPokemons() {
    return async function(dispatch) {
        let json = await axios.get('http://localhost:3001/api/pokemons')
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}

export function getTypes() {
    return async function(dispatch){
        let data = await axios.get('http://localhost:3001/api/types')
        return dispatch({
            type: 'GET_TYPES',
            payload: data.data
        })
    }
}

export function filteredPokemonsTypes(payload){
    return{
        type: 'FILTER_TYPES',
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}