import React, { Component } from 'react';
import { Consumer } from '../../Context';
import FormInputGroup from '../layout/FormInputGroup';
import axios from 'axios';

class EditContact extends Component {
  state = {
      name: '',
      email: '',
      phone: '',
      errors: {}
  }  
  
  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => this.setState({
            name: response.data.name,
            email: response.data.email,
            phone: response.data.phone  
        }))
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

    const updatedContact = {
        name,
        email,
        phone
    }

    const { id } = this.props.match.params;
    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedContact)
    .then(dispatch({payload: updatedContact, type: 'UPDATE_CONTACT'}));

    //Clear Fields
    this.setState({
        name: '',
        email: '',
        phone: '',
        errors: {}
    })

    this.props.history.push('/');
    
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
                        <div className="card-header">Edit Contact</div>
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
                                type: 
                                placeholder="Enter a phone"
                                value={phone}
                                onChange={this.onChange}
                                error={errors.phone}
                                />
                                <input 
                                type="submit" 
                                value="Update Contact" 
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

export default EditContact;