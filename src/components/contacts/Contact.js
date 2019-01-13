import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Consumer } from '../../Context';
import axios from 'axios';

class Contact extends Component {
  state = {
    showContactInfo: false
  };
  
  onClickShow = _ => {
    this.setState({
      showContactInfo: !this.state.showContactInfo
    })
  }

  onClickDelete = (id, dispatch) => {   
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => dispatch({type: 'DELETE_CONTACT', payload: id}))
  } 

  render() {
    const { id, name, email, phone} = this.props.personInfo;
    const { showContactInfo } = this.state;
    return ( 
    <Consumer>
      {value => {
        const { dispatch } = value;
        return (
          <div className="card card-body mb-3">
            <h1 /* style = {mainHeading} */>{name} 
              <i onClick={this.onClickShow} className="fas fa-sort-down" style={{cursor: 'pointer'}}></i>
              
              <i onClick={this.onClickDelete.bind(this, id, dispatch)} className="fa fa-times" style={{cursor: 'pointer', float: 'right', color: 'red'}}></i>
              <Link to={`/contact/edit/${id}`} >
                <i className="fas fa-pencil-alt" style={{cursor: 'pointer', float: 'right', color: 'black', fontSize: '2rem', marginRight: '1rem'}}></i>
              </Link>
            </h1>
            { showContactInfo ? (<ul className="list-group">
              <li className="list-group-item mb-2">email: {email}</li>
              <li className="list-group-item mb-2">tel: {phone}</li>
            </ul>) : null}
          </div>
        )
      }}
    </Consumer>
    )
  }
}

/* const mainHeading = {
  color: 'blue',
  fontSize: '25px'
} */

Contact.propTypes = {
  personInfo: PropTypes.object.isRequired
};

export default Contact;