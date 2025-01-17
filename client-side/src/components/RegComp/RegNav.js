import React from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import {BrowserRouter as Router,Switch ,Route, Link} from 'react-router-dom'
import './Reg.css'
function RegNav() {
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
  
    <Link to="/login">
      <Nav.Link href="#link" className = "Login" id = "login">Login</Nav.Link>
      </Link>
    </Nav>
  </Navbar.Collapse>
  </div>
            </Navbar>
        </div>
    )
}

export default RegNav
