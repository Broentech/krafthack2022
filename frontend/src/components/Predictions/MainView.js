import PredTitle from "./PredTitle";
import ModelInput from "./ModelInput";
import ModelOutput from "./ModelOutput";
import classes from './MainView.module.css';
import {connectSocketIo} from "../../context/socket";
import store from "../../store";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {predictionsActions} from "../../store/predictions-slice";
import CurrentPredictions from "./CurrentPredictions";

const MainView = () => {
    const [buttonName , setButtonName] = useState('Disconnect')
    const dispatch = useDispatch();
    let socket;
    useEffect(() => {
        socket = connectSocketIo(store.getState().auth.token.toString());
        socket.emit('getTimeseries');
        socket.on('getTimeseries', (data) => {

            //console.log(data);
            if ('mode' in data && 'timestamp' in data) {
                const modeObj = {
                    timestamp : data['timestamp'] ,
                    mode : data['mode']
                }
                //console.log('MODE' , modeObj);
                dispatch(predictionsActions.appendMode(modeObj));
            }
            if ('modelInput' in data) {
                dispatch(predictionsActions.appendModelInput({
                    timestamp : data['timestamp'] ,
                    modelInput : data['modelInput']
                }));
            }
            if ('modelOutput' in data) {
                dispatch(predictionsActions.appendModelOutput({
                    timestamp : data['timestamp'] ,
                    modelOutput : data['modelOutput']
                }));
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
    }, []);

    const tryReconnect = () => {
        if(!socket) {
            socket = connectSocketIo(store.getState().auth.token.toString());
        }
        if(!socket.connected) {
            console.log('CONNECTING');
            socket.connect();
            socket.emit('getTimeseries');
        } else {
            console.log('DISCONNECTING');
            socket.disconnect();
        }
    }

    return (
        <div className={classes.mainview}>
            <button onClick={tryReconnect}>{buttonName}</button>
            <PredTitle className={classes.mainview_header} />
            <div className={classes.mainview_row}>
                <CurrentPredictions />
            </div>
            <div className={classes.mainview_row}>
                <ModelInput />
                <ModelOutput />
            </div>
        </div>
    );
};

export default MainView;
