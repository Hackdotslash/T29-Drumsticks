import React, { Component } from 'react'
import {Form,Button,FormGroup} from 'react-bootstrap'
import {BrowserRouter as Router,Switch ,Route, Link, Redirect} from 'react-router-dom'
import Home from '../Home'

export class FormComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email : '',
            password : '',
            isComplete : true,
            token : ''
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.postHandler = this.postHandler.bind(this)
        this.validateForm = this.validateForm.bind(this)
    }    


    changeHandler(event){
        event.preventDefault()
        const {name, value} = event.target
        this.setState({
            [name] : value
        })
    }

    postHandler(event){
        let ahem = this.state
        event.preventDefault()
        let url = 'http://localhost:8000/login'
        let params = {
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email : ahem.email,
                password : ahem.password
            })
        }
        fetch(url,params).then(res=>res.json()).then(data=>{
            if(data){
            this.setState({
                token : data.token,
                isComplete : false
            })
        }
            console.log(this.state)
        })
    
    }
    validateForm() {
        const ahem = this.state
        const isValid = (ahem.email.length>0 && ahem.password.length>0)
        return isValid
    }

    render() {
        if(this.state.isComplete){
        return (
            <div>
                <Form className="form" autoComplete = "off" >
                <FormGroup>
                    <Form.Control value = {this.state.email} onChange = {this.changeHandler} name = "email" type = "email" placeholder = "email" className = "input" id ="email"/>
                </FormGroup>
                <FormGroup>
                    <Form.Control value = {this.state.password} onChange = {this.changeHandler} name = "password" type = "password" placeholder = "password" className = "input" id = "password"/>
                </FormGroup>
                <Button type = "submit" disabled = {!(this.validateForm)} variant = "success" className = "button" onClick = {this.postHandler}>
                        LOGIN
                </Button>
                </Form>
            </div>
        )}
        else{
            return(
            <Redirect to="/Dashboard" /> 
     )
        }
    }
}

export default FormComponent
