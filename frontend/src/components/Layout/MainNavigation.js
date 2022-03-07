
import {NavLink} from 'react-router-dom';
import classes from './MainNavigation.module.css'
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/auth-slice";

const MainNavigation = () => {
    const dispatch = useDispatch();
    const is_logged_in = useSelector((state) => state.auth.is_logged_in);

    const logoutHandler = () => {
        dispatch(authActions.logOut());
    };

    return (
        <header className={classes.header}>
            <NavLink className={classes.logo} to='/'>Krafthack 2022 - Broentech</NavLink >
            <nav>
                <ul>
                    {!is_logged_in && <li><NavLink  to='/auth'>Login</NavLink ></li> }
                    {is_logged_in && <li><NavLink  to='/predictions'>Predictions</NavLink ></li> }
                    {is_logged_in && <li><NavLink  to='/user'>Profile</NavLink ></li> }
                    {is_logged_in && <li><button onClick={logoutHandler}>Logout</button></li>}
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
