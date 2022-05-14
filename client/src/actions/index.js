import axios from 'axios'

export function getPokemons() {
    return async function(dispatch) {
        let json = await axios.get('/api/pokemons');
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}

export function getDetail(id) {
    return async function (dispatch) {
      try {
        let jsonId = await axios.get(`/api/pokemons/${id}`);
        return dispatch({
          type: "DETAIL",
          payload: jsonId.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }
  

export function clearPage(){
    return {
      type: 'CLEAR_PAGE'
    }
  }

export function getTypes() {
    return async function(dispatch){
        let data = await axios.get('/api/types');
        return dispatch({
            type: 'GET_TYPES',
            payload: data.data
        })
    }
}

export function newPokemon(payload){
    return async function(){
        let data = await axios.post('/api/pokemons/newpokemon', payload);
        return {
            data
        }
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

export function orderUpFall(payload) {
    return {
        type: 'ORDER_AZ',
        payload
    }
}

export function orderUpFallAttack(payload) {
    return {
        type: 'ORDER_ATTACK',
        payload
    }
}

export function searchName(name){
    return async function(dispatch) {
        try{
           let json = await axios.get(`/api/pokemons/name?name=${name}`);
           return dispatch({
               type: 'SEARCH_NAME',
               payload: json.data
            })  
     }catch{
        alert('Pokemon not found')
     }
} 
}

