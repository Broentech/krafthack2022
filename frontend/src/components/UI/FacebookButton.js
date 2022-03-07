
import {AiOutlineFacebook} from 'react-icons/ai';
import classes from './FacebookButton.module.css';
import {getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCVhC-GQeMuqcZfK_-_yvlMXuk00ZFN008",
    authDomain: "krafthack2022.firebaseapp.com",
    projectId: "krafthack2022",
    storageBucket: "krafthack2022.appspot.com",
    messagingSenderId: "733683085520",
    appId: "1:733683085520:web:e97ba3709d2a1d9e4feed5",
    measurementId: "G-2BZQYQ08LD"
};

const FacebookButton = (props) => {
    const provider = new FacebookAuthProvider();

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    const clicked = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                props.userInfoFromFacebook({
                    user : user,
                    token : accessToken
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = FacebookAuthProvider.credentialFromError(error);

                console.log('ERROR WHEN SIGNING IN WITH FACEBOOK :');
                console.log('errorCode : ' , errorCode);
                console.log('email : ' , email);
                console.log('errorMessage : ' , errorMessage);
                console.log('credential : ' , credential);
            });
    }

    return (
        <div className={classes.actions} onClick={clicked}>
            <AiOutlineFacebook className={classes.icon} />
            Login with Facebook
        </div>
    );
}

export default FacebookButton;
