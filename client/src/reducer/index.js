const initialState = {
  pokemons: [],
  copyPokemons: [],
  types: [],
  copyTypes: [],
  detail:[]
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        copyPokemons: action.payload,
        //copyPokemonsTwo: action.payload
      };
    case "SEARCH_NAME":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
        copyTypes: action.payload,
      };
    case "NEW_POKEMON":
      return {
        ...state,
      };
   
      case "DETAIL":
        return {
          ...state,
          detail: action.payload,
        };
    case "CLEAR_PAGE":
      return {
        ...state,
        detail: {},
      };

    case "FILTER_TYPES":
      let allPokemons = state.copyPokemons.filter((p) => {
        if (p.type?.includes(action.payload)) return p;
      });
      if (action.payload === "all") {
        allPokemons = state.copyPokemons;
      }
      return {
        ...state,
        pokemons: allPokemons,
      };
    case "FILTER_CREATED":
      const all = state.copyPokemons;
      const createdFilter =
        action.payload === "cDb"
          ? all.filter((p) => p.createdInDb)
          : all.filter((p) => !p.createdInDb);
      return {
        ...state,
        pokemons: action.payload === "all" ? all : createdFilter,
      };
    case "ORDER_AZ":
      let sortUp =
        action.payload === "asc"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortUp,
      };
    case "ORDER_ATTACK":
      let sortAttack =
        action.payload === "attAs"
          ? state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortAttack,
      };

    default:
      return state;
  }
}

export default rootReducer;
