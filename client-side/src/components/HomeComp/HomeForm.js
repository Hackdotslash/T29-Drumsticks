import React, { Component } from 'react'
import {Form, FormGroup,Button} from 'react-bootstrap'

class HomeForm extends Component {
    constructor(props) {
      super(props);
      this.state = { values: [] };
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    createUI(){
       return this.state.values.map((el, i) => 
           <FormGroup key={i}>
              <Form.Control type="text" value={el||''} onChange={this.handleChange.bind(this, i)} className = "input"/>
              <Form.Control name="a1" as = "textarea" placeholder = "answer" rows = {3} value={el||''} className = "input"  placeholder = "answer" onChange = {this.handleChange.bind(this,i)}/>
              <Button onClick={this.removeClick.bind(this, i)} className = "button"> Remove</Button>
           </FormGroup>          
       )
    }
  
    handleChange(i, event) {
       let values = [...this.state.values];
       values[i] = event.target.value;
       this.setState({ values });
    }
    
    addClick(){
      this.setState(prevState => ({ values: [...prevState.values, '']}))
    }
    
    removeClick(i){
       let values = [...this.state.values];
       values.splice(i,1);
       this.setState({ values });
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.values.join(', '));
      event.preventDefault();
    }
  
    render() {
      return (
          <div>
          <Form autoComplete = "off">
          <FormGroup className = "email" >
                    <Form.Label>
                        Please Provide your Email Address
                    </Form.Label>
                    <Form.Control name = "email" type = "email" />
                </FormGroup>
                </Form>
        <Form onSubmit={this.handleSubmit} className = "form" autoComplete = "off">
            {this.createUI()}        
            <Button onClick={this.addClick.bind(this)} className = "button"> Add Question</Button> 
                        <Button type="submit" className = "button" >Submit</Button>
        </Form>
        </div>
      );
    }
  }
  
  export default HomeForm