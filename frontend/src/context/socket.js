import React from 'react';
import io from "socket.io-client";
import store from "../store";

const STREAM_ENDPOINT = 'https://krafthack2022-hbr5fwevba-uc.a.run.app';
//const STREAM_ENDPOINT = 'localhost:5000';

export const connectSocketIo = (token) => {
    const startDate = new Date(store.getState().pred.startDate).getTime() / 1000;
    console.log('Connecting to ' , STREAM_ENDPOINT , 'with startDate : ' , startDate);
    return io(STREAM_ENDPOINT, {
        transports: ['websocket'],
        auth: {token: token} ,
        query: {
            timestamp : startDate
        }
    });
};

