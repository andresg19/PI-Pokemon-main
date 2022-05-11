import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import  Landing  from './components/Landing'
import Home from './components/Home';
import NewPokemon from './components/NewPokemon'
import Detail from './components/Detail';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/home' component={Home} />
        <Route path='/detail/:id' component={Detail} />
        <Route path= '/newpokemon' component={NewPokemon} />
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
