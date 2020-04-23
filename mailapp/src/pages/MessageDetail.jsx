import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const myStyle = {
    headers: {
        marginTop: "5px",
        textAlign: "center"
    },
    body: {
        marginTop: "2em",
        textAlign: "center"
    },
    tabpanel: {
        textAlign:"left",
        maxWidth : "15em",
        marginLeft: "25%"
    }

};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default function MessageDetail(props) {

    const [message, setMessage] = useState(null)
    const [value, setValue] = React.useState(0);
    const mail_id = props.match.params.id;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                <Tabs value={value} onChange={handleChange} aria-label="mail" centered>
                    <Tab label="HTML" {...a11yProps(0)} />
                    <Tab label="Plain text" {...a11yProps(1)} />
                    <Tab label="Source" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    {message.Content.Body}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <pre>{message.Content.Body}</pre>
                </TabPanel>
                <TabPanel value={value} index={2}  >
                    <pre style={myStyle.tabpanel}>{Object.entries(message.Content.Headers).map(([k,v]) => k + ' : ' + v + '\n')}</pre>
                </TabPanel>
            </div>
        </div>
    )
        : (<div></div>)
}
