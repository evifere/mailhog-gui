import React from 'react';
import MessageRow from '../components/MessageRow'
export default class AllMessagesList extends React.Component {

  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(e){
    this.props.onDelete(e)
  }

  render() {
    return (
      <ul>
        { this.props.messages.map(message => <MessageRow key={message.ID} message={message} onDelete={this.onDelete}/>)}
      </ul>
    )
  }
}
