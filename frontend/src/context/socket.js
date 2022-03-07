import React from 'react';
import io from "socket.io-client";

export const connectSocketIo = (token) => {
    //const url = 'localhost:5000/timestamp=1971-01-25 12:28:48'
    const url = 'localhost:5000'
    return io(url, {
        transports: ['websocket'],
        auth: {token: token} ,
        query: {
            timestamp : '1971-01-25 11:28:48'
        }
    });
};

