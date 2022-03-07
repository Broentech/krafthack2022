import React from 'react';
import io from "socket.io-client";

export const connectSocketIo = (token) => {
    return io('localhost:5000', {
        transports: ['websocket'],
        auth: {token: token}
    });
};

