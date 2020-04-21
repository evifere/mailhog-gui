import React from 'react';

export default class MessageRow extends React.Component {
  state = {
    message: {}
  }

  render() {
    const {message} = this.props; 
    return (
      <li>{message.ID}</li>
    )
  }
}
