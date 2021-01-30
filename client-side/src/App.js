import react, {Component} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch ,Route, Link} from 'react-router-dom'


import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
class App extends Component {
  render(){
  return (
    <div className="App">
    <Router>
      <Switch>
      <Route component = {Register} path = "/" exact/>
      <Route component = {Home} path = "/Dashboard"/>
      <Route component = {Login} path = "/Login"/> 
      </Switch>
      </Router>
    </div>
  );
  }
}

export default App;
