import React from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import {BrowserRouter as Router,Switch ,Route, Link} from 'react-router-dom'
import './Login.css';

function NavBar() {
    return (
        <div>
            <Navbar  className = "Nav" expand = "sm" >
                    <div>
                    <Link to = "/">
                    <Navbar.Brand href = "/" className = 'Logo'>DRUMSTICKS </Navbar.Brand> 
                    </Link>
                    </div>
                    <div className = "toggleDiv">
                   <Navbar.Toggle className = "toggle" aria-controls="basic-navbar-nav" ></Navbar.Toggle>
  <Navbar.Collapse>
    <Nav className="mr-auto">
    <Link to="/">
      <Nav.Link href="#link" className = "Home" id = "home">Home</Nav.Link>
      </Link>
 
    <Link to="/Register">
      <Nav.Link href="#link" className = "register" id = "register">Register</Nav.Link>
      </Link>
    </Nav>
  </Navbar.Collapse>
  </div>
            </Navbar>
        </div>
    )
}

export default NavBar
