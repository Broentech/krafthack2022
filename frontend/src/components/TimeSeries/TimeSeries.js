
import {connectSocketIo} from "../../context/socket";
import {useEffect, useState} from "react";
import store from "../../store";

const TimeSeries = () => {

    const [currVal, setCurrVal] = useState(0);
    const [currTime, setCurrTime] = useState(0);
    const [buttonName , setButtonName] = useState('Disconnect')

    let socket;
    useEffect(() => {
        socket = connectSocketIo(store.getState().auth.token.toString());
        socket.emit('getTimeseries');
        socket.on('timeSeries', (data) => {
            if ('values' in data && data['values'].length > 0) {
                data['values'].map(ts => {
                    setCurrTime(ts[0]);
                    setCurrVal(ts[1])
                });
            }
        });

        socket.on('connect' , () => {
            console.log('Connected to socket.io');
            setButtonName('Disconnect');
        });

        socket.on('disconnect' , () => {
            console.log('Disconnected from socket.io');
            setButtonName('Connect')
        });

        return () => socket.disconnect();
    }, [])

    const tryReconnect = () => {
        if(!socket.connected) {
            socket.connect();
            socket.emit('getTimeseries');
        } else {
            socket.disconnect();
        }
    }

    return (
        <div>
            <button onClick={tryReconnect}>{buttonName}</button>
            <h1>Time : {currTime}</h1>
            <h1>Value : {currVal}</h1>
        </div>
    );
}

export default TimeSeries;
