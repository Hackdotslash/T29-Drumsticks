import React, { Component } from 'react'
import {Form,Button,FormGroup} from 'react-bootstrap'

export class FormComponent extends Component {

    constructor(props) {
        super()
        this.state = {
            email : '',
            password : ''
        }
        this.changeHandler = this.changeHandler.bind(this)
    }    

    changeHandler(event){
        event.preventDefault()
        const {name, value} = event.target
        this.setState({
            [name] : value
        })
    }

    render() {
        return (
            <div>
                <Form className="form" autoComplete = "off">
                <FormGroup>
                    <Form.Control controlId = "email" value = {this.state.email} onChange = {this.changeHandler} name = "email" type = "email" placeholder = "email" className = "input" id ="email"/>
                </FormGroup>
                <FormGroup>
                    <Form.Control controlId = "password" value = {this.state.password} onChange = {this.changeHandler} name = "password" type = "password" placeholder = "password" className = "input" id = "password"/>
                </FormGroup>
                <Button type = "submit" variant = "success" className = "button">
                        LOGIN
                </Button>
                </Form>
            </div>
        )
    }
}

export default FormComponent
