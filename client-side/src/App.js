import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch ,Route, Link} from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
      <Route component = {Home} path = "/" exact/>
      <Route component = {Register} path = "/Register"/>
      <Login path = "/Login"/> 
      </Switch>
      </Router>
    </div>
  );
}

export default App;