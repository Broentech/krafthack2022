import {useDispatch, useSelector} from "react-redux";
import classes from './UserProfile.module.css';
import {useNavigate} from "react-router-dom";
import {requestDeleteUser} from "../../store/auth-actions";

const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userName = useSelector((state)=> state.auth.name);
    const userEmail = useSelector((state)=> state.auth.email);
    const userPhoto = useSelector((state)=> state.auth.photoURL);

    const deleteMe = () => {
        dispatch(requestDeleteUser());
        //dispatch(tradeActions.clearCurrentBuyReq());
        navigate('/');
    };

    return (
      <div className={classes.userprofile}>
          <h1>Din bruker</h1>
          <img src={userPhoto} alt="new" />
          <p>Navn : {userName}</p>
          <p>Epost : {userEmail}</p>
          <button onClick={deleteMe}>Slett meg</button>
      </div>
    );
};

export default UserProfile;
