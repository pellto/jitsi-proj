import "@mantine/core/styles.css";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { JitsiContainer } from './JitsiContainer';
import { MaxParticipantContainer } from './MaxParticipantContainer';
import { MantineProvider } from '@mantine/core';

const App = () => {
    const [ numberOfCurrentParticipants, setNumberOfCurrentParticipants ] = useState(-1);
    const mainRoomInfo = {
        name: 'main',
    }

    const getNumberOfCurrentParticipants = () => {
        const fetchData = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/rooms/${mainRoomInfo.name}/number-of-participants`);
            return res.data;
        }
        fetchData().then(numberOfCurrentParticipants => setNumberOfCurrentParticipants(numberOfCurrentParticipants))
    }

    useEffect(() => {
        getNumberOfCurrentParticipants()
        // const fetchData = async () => {
        //     const res = await axios.get(`${process.env.REACT_APP_API_URL}/rooms/${mainRoomInfo.name}/number-of-participants`);
        //     return res.data;
        // }
        // fetchData().then(numberOfCurrentParticipants => setNumberOfCurrentParticipants(numberOfCurrentParticipants))
    }, []);
    
    return (
        <>
            <MantineProvider>
            <h1 style = {{
                fontFamily: 'sans-serif',
                textAlign: 'center'
            }}>
                JitsiMeeting Demo App
            </h1>
            {
                numberOfCurrentParticipants >= process.env.REACT_APP_MAX_PARTICIPANTS ?
                <MaxParticipantContainer/> :
                <JitsiContainer roomInfo={mainRoomInfo}/>
            }
            </MantineProvider>
        </>
    );
};

export default App;