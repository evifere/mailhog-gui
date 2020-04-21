import React from 'react';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';

const liStyle = {
    display: 'table-row',
};

export default function MessageRow({ message = {} }) {
    const btnDetail = <IconButton> <Link to={"/message/" + message.ID}><Visibility /></Link></IconButton>;

    return (
        <li style={liStyle} key={message.ID}>{btnDetail}&nbsp;From {message.Content.Headers.From.map(from => <span>{from}</span>)} | {message.Content.Headers.Subject[0]} &nbsp;|
        </li>
    )

}
