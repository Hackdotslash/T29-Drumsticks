import React, { Component } from 'react'
import RegNav from './RegComp/RegNav'
import RegForm from './RegComp/RegForm'

export class Register extends Component {
    render() {
        return (
            <div>
                <RegNav/>
                <RegForm/>
            </div>
        )
    }
}

export default Register
