import React, {useEffect , Fragment} from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import WelcomePage from "./pages/Welcome";
import AuthPage from "./pages/Auth";
import TodosPage from "./pages/TodosPage";
import TimeSeriesPage from "./pages/TimeSeriesPage";
import UserProfilePage from "./pages/UserProfile";
import Layout from "./components/Layout/Layout";
import {useSelector} from "react-redux";
import SideBar from "./components/Layout/SideBar";
import { socket, SocketContext } from './context/socket';

const App = () => {
    const navigate = useNavigate();
    const is_logged_in = useSelector((state) => state.auth.is_logged_in);

    useEffect(() => {
        if (is_logged_in) {
            navigate('/todos');
        } else {
            navigate('/auth');
        }
    },[is_logged_in]);

    return (
        <Fragment>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<WelcomePage />} />
                    {!is_logged_in && <Route exact path='/auth' element={<AuthPage />} />}
                    {is_logged_in && <Route exact path='/user' element={<UserProfilePage />} />}
                    {is_logged_in && <Route exact path='/todos' element={<TodosPage />} />}
                    {is_logged_in && <Route exact path='/ts' element={<TimeSeriesPage />} />}
                    <Route path='*' element={<p>Page not found</p>} />
                </Routes>
            </Layout>
        </Fragment>
    );
};

export default App;
