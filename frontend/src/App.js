import React, {useEffect , Fragment} from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import WelcomePage from "./pages/Welcome";
import AuthPage from "./pages/Auth";
import PredictionsPage from "./pages/PredictionsPage";
import UserProfilePage from "./pages/UserProfile";
import Layout from "./components/Layout/Layout";
import {useSelector} from "react-redux";
import ConfigPage from "./pages/ConfigPage";
import ModelsPage from "./pages/ModelsPage";

const App = () => {
    const navigate = useNavigate();
    const is_logged_in = useSelector((state) => state.auth.is_logged_in);

    useEffect(() => {
        if (is_logged_in) {
            navigate('/user');
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
                    {is_logged_in && <Route exact path='/predictions' element={<PredictionsPage />} />}
                    {is_logged_in && <Route exact path='/config' element={<ConfigPage />} />}
                    {is_logged_in && <Route exact path='/models' element={<ModelsPage />} />}
                    <Route path='*' element={<p>Page not found</p>} />
                </Routes>
            </Layout>
        </Fragment>
    );
};

export default App;
