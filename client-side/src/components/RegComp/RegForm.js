import React, { Component } from 'react'
import {Button, Form, FormGroup} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'


const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
const validPasswordRegex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")

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
                pass2 : '',
                bait : '*'
            },
            loading : '',
            isValid : true
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
      fetch('http://localhost:8000/register',params)
      .then(res=>res.json()).then(data=>this.setState({loading : data['msg']}))
    }

    changeHandler(e){
        e.preventDefault()
        const {name,value} = e.target
        const con = this.state.pass2
        const pass = this.state.password
        let errors = this.state.errors
        switch (name) {
            case 'name': 
              errors.name = 
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
              validPasswordRegex.test(value)
              ? '' : 'Password must be at least 8 characters long and contain atleast 1 special character and one number'
                  break;
            case 'pass2':
              errors.pass2 = con===pass?'':'passwords must match'
          }
          // errors.pass2 = (pass2!==password.value)?"passwords must match":''
          if(errors.name === '' && errors.email==='' && errors.password ==='' && errors.pass2===''){
                this.setState({
                  isValid: false
                })
          }  

          this.setState({errors, [name]: value            
          });
        }
    
    render() {
      const {errors} = this.state 
         

        if(this.state.loading === "registered"){
          return(
          <Redirect to = "/login"/>
          )
        }

       else return (
            <div>
                    <Form className = "form" autoComplete = "off" onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Form.Control type = "text" name = "name" placeholder = "Full Name" className = "input" onChange = {this.changeHandler} value = {this.state.name} id ="name" noValidate/>
                            {errors.name.length > 0 && 
                <span className='error'>{errors.name} </span>}
                        </FormGroup>
                        <FormGroup>
                            <Form.Control type = "email" name = "email" placeholder = "Email Address" className = "input" onChange = {this.changeHandler} value = {this.state.email} noValidate/>
                            {errors.email.length > 0 && 
                <span className='error'>{errors.email}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Form.Control type = "password" name = "password" placeholder = "Choose Password" className = "input" onChange = {this.changeHandler} value = {this.state.password} noValidate/>
                            {errors.password.length > 0 && 
                <span className='error'>{errors.password}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Form.Control type = "password" name = "pass2" placeholder = "Confirm Password" className = "input" onChange = {this.changeHandler} value = {this.state.pass2} noValidate/>
                            {errors.pass2.length > 0 && 
                <span className='error'>{errors.pass2}</span>}
                        </FormGroup>
                        {this.state.error && <><small style={{ color: 'red' }}>{this.state.error}</small><br /></>}
                        <Button type = "submit"  variant = "success"  onClick = {this.postHandler} style = {{marginTop: '15px', textDecoration: 'none'}} className = "button" disabled ={this.state.isValid}> Make the Account!</Button>
                    </Form>
            </div>
        )
      }
     
    }


export default RegForm
