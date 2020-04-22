import React, { useState }  from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import Delete from '@material-ui/icons/Delete';

const liStyle = {
    display: 'table-row',
};

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
    const btnDelete = <IconButton><Delete onClick={handlerDelete}/></IconButton>;

    return ((isDeleted) ? null :
        <li style={liStyle} key={message.ID}>{btnDetail}&nbsp;From {message.Content.Headers.From.map(from => <span>{from}</span>)} | {message.Content.Headers.Subject[0]} &nbsp;|{btnDelete}
        </li>
    )

}
