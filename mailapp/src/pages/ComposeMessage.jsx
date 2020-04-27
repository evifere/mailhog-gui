import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyle = {
  div: {
    marginTop: "12px",
    maxWidth: '400px',
    marginLeft: '25%'
  },
  input: {
    float: 'right',
    width: '24em'
  },
  textarea: {
    float: 'right',
    resize: 'none'
  },
  send: {
    float: 'right',
    marginTop: '3%'
  }

}
class ComposeMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      to: '',
      subject: '',
      body: ''
    };

    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.handleChangeSubject = this.handleChangeSubject.bind(this);
    this.handleChangeBody = this.handleChangeBody.bind(this);
    this.handleSend = this.handleSend.bind(this);

  }

  handleChangeTo(e) {
    this.setState({ 'to': e.target.value })
  }
  handleChangeSubject(e) {
    this.setState({ 'subject': e.target.value })
  }

  handleChangeBody(e) {
    this.setState({ 'body': e.target.value })
  }

  handleSend(e) {
    console.log('send', this.state)
    axios.post(`http://mailhog.api.local:1234/send`, this.state
    )
      .then(res => {
        console.log(res.data);

      }).catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        ComposeMessage
        <form action="POST">
          <div style={useStyle.div}>
            To : &nbsp;
                <input style={useStyle.input} type="text" name="to" value={this.state.to} placeholder="someone@demo.com" onChange={this.handleChangeTo} />
          </div>
          <div style={useStyle.div}>
            Subject : &nbsp;
                <input style={useStyle.input} type="text" name="subject" value={this.state.subject} placeholder="something" onChange={this.handleChangeSubject} />
          </div>
          <div style={useStyle.div}>
            Body : &nbsp;
                <textarea style={useStyle.textarea} cols="40" rows='20' name="body" value={this.state.body}
              onChange={this.handleChangeBody} > </textarea>
          </div>
          <div style={useStyle.div}>
            <Button onClick={this.handleSend} style={useStyle.send} variant="contained" color="primary">
              Send
              </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default ComposeMessage;
