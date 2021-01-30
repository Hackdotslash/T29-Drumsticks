import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './LoginComp/NavBar'
import FormComponent from './LoginComp/FormComponent'

export class Login extends Component {

    render() {
        return (
            <div>
               <NavBar/>
               <FormComponent/>
            </div>
        )
    }
}

export default Login
