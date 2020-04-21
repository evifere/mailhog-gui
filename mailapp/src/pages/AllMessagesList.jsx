import React from 'react';
import axios from 'axios';
import MessageRow from '../components/MessageRow'
export default class AllMessagesList extends React.Component {
  state = {
    messages: []
  }

  componentDidMount() {
    axios.get(`http://mailhog.api.local:8025/api/v2/messages`)
      .then(res => {
        const messages = res.data.items;
        this.setState({ messages });
      })
  }

  render() {
    return (
      <ul>
        { this.state.messages.map(message => <MessageRow key={message.ID} message={message} />)}
      </ul>
    )
  }
}
