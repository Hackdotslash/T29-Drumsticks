import React, { Component } from 'react'
import {Form,Button,FormGroup} from 'react-bootstrap'
import {BrowserRouter as Router,Switch ,Route, Link, Redirect} from 'react-router-dom'
import Home from '../Home'

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
const validPasswordRegex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
export class FormComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email : '',
            password : '',
            isComplete : true,
            isValid :true,
            token : '',
            errors : {
                email : '',
                password : ''
            }
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.postHandler = this.postHandler.bind(this)
        this.validateForm = this.validateForm.bind(this)
    }    


    changeHandler(event){
        event.preventDefault()
        const {name, value} = event.target
        let errors = this.state.errors

        switch(name){
            case 'email': 
            errors.email = 
              validEmailRegex.test(value)
                ? ''
                : 'Email is not valid!';
            break;
          case 'password': 
            errors.password = 
            validPasswordRegex.test(value)
            ? '' : 'password is not valid!';
                break;
            default : 
            break;
        }
        this.setState({
           errors, [name] : value,
        })
        if(errors.email==='' && errors.password ===''){
            this.setState({
              isValid: false
            })
      }  
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
        const {errors} = this.state 
        if(this.state.isComplete){
        return (
            <div>
                <Form className="form" autoComplete = "off" >
                <FormGroup>
                    <Form.Control value = {this.state.email} onChange = {this.changeHandler} name = "email" type = "email" placeholder = "email" className = "input" id ="email"/>
                    {errors.email.length > 0 && 
                <span className='error'>{errors.email}</span>}
                </FormGroup>
                <FormGroup>
                    <Form.Control value = {this.state.password} onChange = {this.changeHandler} name = "password" type = "password" placeholder = "password" className = "input" id = "password"/>
                    {errors.password.length > 0 && 
                <span className='error'>{errors.password}</span>}
                </FormGroup>
                <Button type = "submit" disabled = {!(this.validateForm)} variant = "success" className = "button" onClick = {this.postHandler} disabled = {this.state.isValid}>
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
