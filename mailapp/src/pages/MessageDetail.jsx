import React, { useEffect, useState } from 'react';
import axios from 'axios';

const myStyle = {
    headers:{
        marginTop:"5px",
        textAlign: "center"
    },
    body:{
        marginTop:"2em",
        textAlign: "center"
    },

};

export default function MessageDetail(props) {

    const [message, setMessage] = useState(null)
    const mail_id = props.match.params.id;

    useEffect(() => {
        if (message === null) {
            axios.get(`http://mailhog.api.local:8025/api/v1/messages/` + mail_id)
                .then(res => {
                    const message = res.data;

                    setMessage(message);
                })
        }
    });

    return (message) ? (
        <div>
            <div style={myStyle.headers}>
                From &nbsp;{message.Content.Headers.From.map(from => <span>{from}</span>)}
            </div>
            <div style={myStyle.headers}>
                Subject&nbsp; {message.Content.Headers.Subject[0]}
            </div>
            <div style={myStyle.body}>
                {message.Content.Body}
            </div>
        </div>
    )
        : (<div></div>)
}
