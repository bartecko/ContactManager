import React, { Component } from 'react';
import { Consumer } from '../../Context';
import FormInputGroup from '../layout/FormInputGroup';
import axios from 'axios';

class AddContact extends Component {
  state = {
      name: '',
      email: '',
      phone: '',
      errors: {}
  }  
  
  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  onSubmit = (dispatch, e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();

    const { name, email, phone } = this.state;

    //Check for errors
    if (name === '') {
        this.setState({errors: {name: 'Name is required!'} });
        return;
    }
    if (email === '') {
        this.setState({errors: {email: 'Email is required!'} });
        return;
    }
    if (phone === '') {
        this.setState({errors: {phone: 'Phone is required!'} });
        return;
    }

    const newContact = {
        name,
        email,
        phone
    }

    //Clear Fields
    this.setState({
        name: '',
        email: '',
        phone: '',
        errors: {}
    })

    this.props.history.push('/');

    axios.post('https://jsonplaceholder.typicode.com/users', newContact)
        .then(dispatch({type: 'ADD_CONTACT', payload: newContact}))
    
    return false;
  }

  render() {
    const { name, email, phone, errors } = this.state;

    return (
        <Consumer>
            {
                value => {

                const { dispatch } = value;
                return(    
                    <div className="card mb-3">
                        <div className="card-header">Add Contact</div>
                        <div className="card-body">
                            <form >
                                <FormInputGroup 
                                label="Name"
                                name="name"
                                className="form-control form-control-lg"
                                placeholder="Enter a name"
                                value={name}
                                onChange={this.onChange}
                                error={errors.name}
                                />
                                <FormInputGroup 
                                label="Email"
                                name="email"
                                className="form-control form-control-lg"
                                type="email"
                                placeholder="Enter an email"
                                value={email}
                                onChange={this.onChange}
                                error={errors.email}
                                />
                                <FormInputGroup 
                                label="Phone"
                                name="phone"
                                className="form-control form-control-lg"
                                placeholder="Enter a phone"
                                value={phone}
                                onChange={this.onChange}
                                error={errors.phone}
                                />
                                <input 
                                type="submit" 
                                value="Add Contact" 
                                className="btn btn-light btn-block"
                                onClick={this.onSubmit.bind(this, dispatch)}
                                />
                            </form>        
                        </div>
                    </div>
                )
                }
            }
        </Consumer>
    )
  }
}

export default AddContact;