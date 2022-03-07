import React from 'react';

import classes from './ErrorCard.module.css';

const ErrorCard = (props) => {
    return <div className={`${classes.card} ${props.className}`}>{props.children}</div>;
};

export default ErrorCard;
