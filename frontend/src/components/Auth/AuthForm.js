import {useEffect, useRef, useState} from "react";
import classes from './AuthForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { requestLoginToken } from "../../store/auth-actions";
import FacebookButton from "../UI/FacebookButton";
import {authActions} from "../../store/auth-slice";
import RingLoader from 'react-spinners/RingLoader';
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const AuthForm = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [hasFail, setHasFail] = useState(false);

    const dispatch = useDispatch();
    const passwordInputRef = useRef();
    const emailInputRef = useRef();
    const login_failed = useSelector((state) => state.auth.failed);
    const is_loading = useSelector((state) => state.info.is_loading);

    useEffect(() => {
        if (login_failed) {
            emailInputRef.current.value = '';
            passwordInputRef.current.value = '';
            setHasFail(true);
        } else {
            setHasFail(false);
        }
    },[login_failed]);

    const submitHandler = (event) => {
        event.preventDefault();
        const newUserObj = {
            email : emailInputRef.current.value,
            password : passwordInputRef.current.value
        };
        dispatch(requestLoginToken(newUserObj, !isSignup));
    };

    const switchAuthModeHandler = () => {
        setIsSignup(prevState => !prevState) ;
    };

    const userInfoFromFacebook = (userObj) => {
        emailInputRef.current.value = userObj.user.email;
        const tokenObj = {
            token : userObj.user.accessToken ,
            email : userObj.user.email ,
            expiresIn : 3600
        };
        dispatch(authActions.setToken(tokenObj));
    };

    return (
        <section className={classes.auth}>
            {isSignup && <h1>Sign up</h1>}
            {!isSignup && <h1>Log in</h1>}
            {is_loading && <RingLoader css={override} size={250} />}
            {!is_loading && <form onSubmit={submitHandler}>

                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={emailInputRef} />
                </div>

                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required ref={passwordInputRef} />
                </div>

                <div className={classes.actions}>
                    <button type='submit'>{!isSignup ? 'Login' : 'Create Account'}</button>
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {!isSignup ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>

                <div className={classes.actions}>
                    <div className={classes.toggle}>
                        OR
                    </div>
                </div>

                <FacebookButton userInfoFromFacebook={userInfoFromFacebook}/>
                {hasFail && <div className={classes.error}><p>{login_failed}</p></div>}
            </form> }
        </section>
    );
};

export default AuthForm;

