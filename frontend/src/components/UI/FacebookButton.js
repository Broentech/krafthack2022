
import {AiOutlineFacebook} from 'react-icons/ai';
import classes from './FacebookButton.module.css';
import {getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCV3Wk9tNZPbotHg9lF9xDbzgm0e4-xEUI",
    authDomain: "learn-react-10897.firebaseapp.com",
    databaseURL: "https://learn-react-10897-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "learn-react-10897",
    storageBucket: "learn-react-10897.appspot.com",
    messagingSenderId: "849262235450",
    appId: "1:849262235450:web:1cf205efee2078aff58a03"
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
