const initialState = {
    pokemons : [],
    copyPokemons: [],
}


function rootReducer(state= initialState, action){
    switch(action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons : action.payload,
                copyPokemons : action.payload,
            }
            case 'FILTER_TYPES':
                let allPokemons= state.copyPokemons.filter((p) => {
                    if(p.type?.includes(action.payload)) return p
                })
                    if(action.payload === 'all') {
                        allPokemons = state.copyPokemons
                    }
                return{
                    ...state,
                    pokemons: allPokemons
                }
                // const allPokemons = state.copyPokemons
                // const typesFiltered = action.payload === 'all'? allPokemons : 
                // allPokemons.filter(p => p.type === action.payload) 
                // return {
                //     ...state,
                //     pokemons: typesFiltered
                // }
            case 'FILTER_CREATED':
                const all = state.copyPokemons
                const createdFilter = action.payload === 'cDb' ? all.filter(p => p.createdInDb) :
                all.filter(p => !p.createdInDb)
                return {
                    ...state,
                    pokemons: action.payload === 'all' ? all : createdFilter
                }
                
            default: return state;
    }
}


export default rootReducer;