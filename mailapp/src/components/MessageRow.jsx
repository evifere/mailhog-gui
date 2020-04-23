import React, { useState }  from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import Delete from '@material-ui/icons/Delete';

const liStyle = {
    listStyle:'none',
    textAlign : 'left',
    borderBottom:'1px',
    borderBottomColor: 'black',
    borderBottomStyle: 'solid'
};

const spanStyle = {
    textAlign:'center'
}

const btnDeleteCss = {
    textAlign:'right',
    float:'right'
}



export default function MessageRow({ message = {},onDelete }) {
    const btnDetail = <IconButton> <Link to={"/message/" + message.ID}><Visibility /></Link></IconButton>;
    const [isDeleted,setIsDeleted] = useState(false);

    const handlerDelete = (e) => {
        axios.delete(`http://mailhog.api.local:8025/api/v1/messages/` + message.ID)
        .then(res => {
            const message = res.data;

           setIsDeleted(true)
           onDelete(e)
        })
    }
    const btnDelete = <IconButton style={btnDeleteCss} onClick={handlerDelete}><Delete /></IconButton>;

    return ((isDeleted) ? null :
        <li style={liStyle} key={message.ID}>{btnDetail}<span style={spanStyle}>&nbsp;From {message.Content.Headers.From.map(from => <span>{from}</span>)} | {message.Content.Headers.Subject[0]} &nbsp;</span>|{btnDelete}
        </li>
    )

}
