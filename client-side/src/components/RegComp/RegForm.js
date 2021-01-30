import React, { Component } from 'react'
import {Button, Form, FormGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom'


const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
const validateForm = errors => {
    let valid = false;
    Object.values(errors).forEach(val => val.length > 0 && (valid = true));
    return valid;
  };

export class RegForm extends Component {

    constructor() {
        super()
        this.state = {
            name : '',
            email : '',
            password : '',
            pass2 : '',
            errors : {
                name : '',
                email : '',
                password : '',
                pass2 : ''
            },
            loading : false
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.postHandler = this.postHandler.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(validateForm(this.state.errors)) {
          console.info('Valid Form')
        }else{
          console.error('Invalid Form')
        }
      }

    postHandler(){
        let ahem = this.state
      let params = {
        method : 'POST',
        headers : {
          'Accept': 'application/json',
          'content-type': 'application/JSON'
        },
        body : JSON.stringify({
           name : ahem.name,
           email : ahem.email,
          password : ahem.password 
        })
      }
      fetch('https://reqres.in/api/users',params)
      .then(res=>res.json()).then(data=>console.log(data)).catch(()=>console.log('error'))
    }

    changeHandler(e){
        e.preventDefault()
        const {name,value} = e.target
        let errors = this.state.errors
        switch (name) {
            case 'name': 
              errors.fullName = 
                value.length < 5
                  ? 'Full Name must be at least 5 characters long!'
                  : '';
              break;
            case 'email': 
              errors.email = 
                validEmailRegex.test(value)
                  ? ''
                  : 'Email is not valid!';
              break;
            case 'password': 
              errors.password = 
                value.length < 8
                  ? 'Password must be at least 8 characters long!'
                  : '';
              break;
            default:
              break;
          }
      
          this.setState({errors, [name]: value});
        }
    
    render() {

        return (
            <div>
                    <Form className = "form" autoComplete = "off" onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Form.Control type = "text" name = "name" placeholder = "Full Name" className = "input" onChange = {this.changeHandler} value = {this.state.name} id ="name"/>
                        </FormGroup>
                        <FormGroup>
                            <Form.Control type = "email" name = "email" placeholder = "Email Address" className = "input" onChange = {this.changeHandler} value = {this.state.email}/>
                        </FormGroup>
                        <FormGroup>
                            <Form.Control type = "password" name = "password" placeholder = "Choose Password" className = "input" onChange = {this.changeHandler} value = {this.state.password}/>
                        </FormGroup>
                        <FormGroup>
                            <Form.Control type = "password" name = "pass2" placeholder = "Confirm Password" className = "input" onChange = {this.changeHandler} value = {this.state.pass2}/>
                        </FormGroup>
                        {this.state.error && <><small style={{ color: 'red' }}>{this.state.error}</small><br /></>}
                        <Button type = "submit" disabled = {this.state.loading} variant = "success"  onClick = {this.postHandler} style = {{marginTop: '15px', textDecoration: 'none'}} className = "button">Make the Account!</Button>
                    </Form>
            </div>
        )
    }
}

export default RegForm
