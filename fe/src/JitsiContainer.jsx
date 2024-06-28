import { JitsiMeeting } from '@jitsi/react-sdk';
import axios from 'axios';
import React, { useRef } from 'react';


export const JitsiContainer = (props) => {
    const domain = process.env.REACT_APP_JVB_URL

    const apiRef = useRef();
    const participantJid = useRef("");

    const handleChatUpdates = payload => {
        if (payload.isOpen || !payload.unreadCount) {
            return;
        }
        apiRef.current.executeCommand('toggleChat');
    };

    const handleJitsiIFrameRef1 = iframeRef => {
        iframeRef.style.border = '10px solid #3d3d3d';
        iframeRef.style.background = '#3d3d3d';
        iframeRef.style.height = '400px';
        iframeRef.style.marginBottom = '20px';
    };

    const handleJoined = (payload) => {
        const fetchData = async () => {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/rooms/${props.roomInfo.name}/participations`, {
                participant: {
                    jid: payload.id,
                    displayName: payload.displayName
                }
            });
            return res
        }
        fetchData().catch((reason) => {
            window.location.reload();
        });
        participantJid.current = payload.id;
        window.addEventListener('beforeunload', handleLeft)
    }

    const handleApiReady = apiObj => {
        apiRef.current = apiObj;
        apiRef.current.on('videoConferenceJoined', payload => handleJoined(payload))
        apiRef.current.on('chatUpdated', handleChatUpdates);
    };

    const handleLeft = async () => {
        if (participantJid.current === "") {
            return;
        }
        const fetchData = async () => {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/rooms/${props.roomInfo.name}/leave`, {
                data: { participant: { jid: participantJid.current }}
            })
            return res;
        }
        await fetchData();
        participantJid.current = ""
    }

    const handleReadyToClose = async () => {
        await handleLeft();
        window.location.reload();
    };

    const renderSpinner = () => (
        <div style = {{
            fontFamily: 'sans-serif',
            textAlign: 'center'
        }}>
            Loading..
        </div>
    );

    return (
        <>
            <JitsiMeeting
            domain={domain}
            roomName = {props.roomInfo.name}
            spinner = { renderSpinner }
            lang = 'ko'
            onApiReady = { externalApi => handleApiReady(externalApi) }
            onReadyToClose = { handleReadyToClose }
            getIFrameRef = { handleJitsiIFrameRef1 } />
        </>
    )
}