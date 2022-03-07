import {createSlice} from "@reduxjs/toolkit";

const MAX_ARRAY_LENGTH = 100;

const predictionsSlice = createSlice({
    name: 'predictions' ,
    initialState: {
        mode : '' ,
        modelInput : {} ,
        modelOutput : {} ,
        currentModelOutput : {} ,
        thresholdFindings : [] ,
        tensionThreshold : 1700 ,
        startDate : '1971-01-25 11:28:48' ,
        anomEvents : []
    } ,
    reducers: {
        setTensionThreshold(state, action) {
            if(action && action.payload && action.payload.tensionThreshold) {
                console.log('New Threshold Value : ' , action.payload.tensionThreshold);
                state.tensionThreshold = action.payload.tensionThreshold;
            }
        },
        setStartDate(state, action) {
            if(action && action.payload && action.payload.startDate) {
                console.log('New startDate : ' , action.payload.startDate);
                state.startDate = action.payload.startDate;
            }
        },
        appendMode(state, action) {
            if(action &&
                action.payload &&
                action.payload.timestamp &&
                action.payload.mode
            ) {
                state.mode = action.payload.mode;
            }
        } ,
        appendModelInput(state, action) {
            if(action &&
                action.payload &&
                action.payload.timestamp &&
                action.payload.modelInput
            ) {
                action.payload.modelInput.map( ts => {
                    if ('sensorname' in ts && 'value' in ts) {
                        const sensorname = ts['sensorname'];
                        if (sensorname !== 'mode') {
                            const value = ts['value'];
                            if (!(sensorname in state.modelInput)) {
                                state.modelInput[sensorname] = [];
                            }
                            state.modelInput[sensorname].push({
                                name: action.payload.timestamp,
                                value: value
                            });
                            if (state.modelInput[sensorname].length > MAX_ARRAY_LENGTH) {
                                state.modelInput[sensorname].shift();
                            }
                        }
                    }
                });
            }
        } ,
        appendModelOutput(state, action) {
            if(action &&
                action.payload &&
                action.payload.timestamp &&
                action.payload.modelOutput
            ) {
                action.payload.modelOutput.map( ts => {
                    if ('modelName' in ts && 'value' in ts) {
                        const sensorname = ts['modelName'];
                        const value = ts['value'];
                        if (!(sensorname in state.modelOutput)) {
                            state.modelOutput[sensorname] = [];
                        }
                        state.modelOutput[sensorname].push({
                            name : action.payload.timestamp ,
                            value : value
                        });
                        if (state.modelOutput[sensorname].length > MAX_ARRAY_LENGTH) {
                            state.modelOutput[sensorname].shift();
                        }
                        let color = '#0A540DFF'
                        if (value >= state.tensionThreshold) {
                            color = '#B70A0AFF'
                            state.thresholdFindings.push({
                                sensor : sensorname ,
                                timestamp : action.payload.timestamp
                            });
                        }
                        state.currentModelOutput[sensorname] = {
                            value : value ,
                            color : color
                        }
                    }
                });
            }
        },
        clear(state) {
            state.mode = {};
            state.modelInput = {};
            state.modelOutput = {};
            state.currentModelOutput = {};
            state.thresholdFindings = [];
            state.anomEvents = [];
        }
    }
});

export const predictionsActions = predictionsSlice.actions;
export default predictionsSlice;
