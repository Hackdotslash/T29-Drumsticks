import React, { Component } from 'react'
import {Button, Form, FormGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export class RegForm extends Component {

    constructor() {
        super()
        this.state = {
            name : '',
            email : '',
            password : '',
            pass2 : '',
            error : null,
            loading : false
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.postHandler = this.postHandler.bind(this)
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
        this.setState({
            [name]: value
        })
    }

    render() {

        return (
            <div>
                    <Form className = "form" autoComplete = "off">
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
                        <Link to = "/" className = "butt">
                        <Button type = "submit" disabled = {this.state.loading} variant = "success"  onClick = {this.postHandler} style = {{marginTop: '15px', textDecoration: 'none'}}>Make the Account!</Button>
                        </Link>
                    </Form>
            </div>
        )
    }
}

export default RegForm
