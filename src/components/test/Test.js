import React, { Component } from 'react'

class Test extends Component {

  state = {
    title: '',
    body: ''
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(json => this.setState({
        title: json.title,
        body: json.body
      }))
  }

  /* componentWillMount() {
    console.log('componentWillMount...');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  } */

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p className="lead">{this.state.body}</p>
      </div>
    )
  }
}

export default Test;