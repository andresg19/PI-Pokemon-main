import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import  Landing  from './components/Landing'
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/home' component={Home} />
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
