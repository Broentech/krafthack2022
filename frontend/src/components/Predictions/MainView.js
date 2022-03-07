import PredTitle from "./PredTitle";
import ModelInput from "./ModelInput";
import ModelOutput from "./ModelOutput";
import classes from './MainView.module.css';
import {connectSocketIo} from "../../context/socket";
import store from "../../store";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {predictionsActions} from "../../store/predictions-slice";
import CurrentPredictions from "./CurrentPredictions";
import EventList from "./EventList";

const MainView = () => {
    const [buttonName , setButtonName] = useState('Disconnect')
    const dispatch = useDispatch();
    let socket;
    const startDate = useSelector((state) => state.pred.startDate);
    useEffect(() => {

        if(socket) {
            socket.disconnect();
        }

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
    }, [startDate]);


    return (
        <div className={classes.mainview}>
            <PredTitle className={classes.mainview_header} />
            <div className={classes.mainview_row}>
                <CurrentPredictions />
                <EventList />
            </div>
            <div className={classes.mainview_row}>
                <ModelInput />
                <ModelOutput />
            </div>
        </div>
    );
};

export default MainView;
