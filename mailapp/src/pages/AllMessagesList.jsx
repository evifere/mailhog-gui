import React from 'react';
import MessageRow from '../components/MessageRow'
export default class AllMessagesList extends React.Component {

  render() {
    return (
      <ul>
        { this.props.messages.map(message => <MessageRow key={message.ID} message={message} />)}
      </ul>
    )
  }
}
