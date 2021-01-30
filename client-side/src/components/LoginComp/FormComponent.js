import React, { Component } from 'react'
import {Form,Button,FormGroup} from 'react-bootstrap'

export class FormComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email : '',
            password : '',
            isValid : false,
            token : ''
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.postHandler = this.postHandler.bind(this)
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
        let url = 'https://reqres.in/api/login'
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
        fetch(url,params).then(res=>res.json()).then(data=> 
            
            this.setState({token : data.token}))
    
    }

    render() {
        return (
            <div>
                <Form className="form" autoComplete = "off" >
                <FormGroup>
                    <Form.Control value = {this.state.email} onChange = {this.changeHandler} name = "email" type = "email" placeholder = "email" className = "input" id ="email"/>
                </FormGroup>
                <FormGroup>
                    <Form.Control value = {this.state.password} onChange = {this.changeHandler} name = "password" type = "password" placeholder = "password" className = "input" id = "password"/>
                </FormGroup>
                <Button type = "submit" variant = "success" className = "button" onClick = {this.postHandler}>
                        LOGIN
                </Button>
                </Form>
            </div>
        )
    }
}

export default FormComponent
