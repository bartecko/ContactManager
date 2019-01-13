import React, { Component } from 'react';
import Contact from './Contact';
import { Consumer } from '../../Context';

class Contacts extends Component {
    render() {
        return (      
        <Consumer>
            { value => {
                    const { contacts, areContactsEmpty } = value;
                    return (
                        <React.Fragment>
                            <h1 className="display-4 mb-2">
                                <span className="text-danger">Contact</span> List
                            </h1>
                            {
                                areContactsEmpty ? null : contacts.map( contact => {
                                return <Contact key={contact.id} personInfo={contact} />;  
                                })
                            } 
                            
                        </React.Fragment>
                    )                
                }      
            } 
        </Consumer>              
        );
    }
}

export default Contacts;  