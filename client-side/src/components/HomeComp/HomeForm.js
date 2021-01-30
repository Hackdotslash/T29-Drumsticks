import React, { Component } from 'react'
import {Form, FormGroup,Button} from 'react-bootstrap'

export class HomeForm extends Component {
    render() {
        return (
            <div>
                <Form className = "form" autoComplete = "off">

                <FormGroup className = "email">
                    <Form.Label>
                        Please Provide your Email Address
                    </Form.Label>
                    <Form.Control name = "email" type = "email" />
                </FormGroup>
                    <FormGroup>
                        <Form.Control name="Question" type = "text" placeholder = "question" className = "input"/>
                    </FormGroup>
                    <FormGroup>
                        <Form.Control name="answer" type = "text" className = "input"  placeholder = "answer"/>
                    </FormGroup>
                    <FormGroup>
                        <Form.Control name="Question" type = "text"  className = "input" placeholder = "question"/>
                    </FormGroup>
                    <FormGroup>
                        <Form.Control name="answer" type = "text" className = "input"  placeholder = "answer"/>
                    </FormGroup>
                    <FormGroup>
                        <Form.Control name="Question" type = "text" className = "input"  placeholder = "question"/>
                    </FormGroup>
                    <FormGroup>
                        <Form.Control name="answer" className = "input" type = "text" placeholder = "answer"/>
                    </FormGroup>
                    <FormGroup>
                        <Form.Control name="Question" className = "input" type = "text" placeholder = "question"/>
                    </FormGroup>
                    <FormGroup>
                        <Form.Control name="answer"  className = "input" type = "text" placeholder = "answer"/>
                    </FormGroup>
                    <FormGroup>
                        <Form.Control name="Question" className = "input" type = "text" placeholder = "question"/>
                    </FormGroup>
                    <FormGroup>
                        <Form.Control name="answer" className = "input" type = "text" placeholder = "answer"/>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default HomeForm
