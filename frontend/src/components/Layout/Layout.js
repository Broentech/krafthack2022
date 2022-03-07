import React from "react";
import MainNavigation from "./MainNavigation";
import Footer from "./Footer";
import ErrorModal from "../ErrorModal/ErrorModal";
import {errorActions} from "../../store/error-slice";
import {useDispatch, useSelector} from "react-redux";

const Wrapper = props => {
    return props.children;
};

const Layout = (props) => {
    const dispatch = useDispatch();
    const errorObj = useSelector((state) => state.error.error);
    const errorTitle = errorObj.title;
    const errorMessage = errorObj.message;

    const errorConfirmHandler = () => {
        dispatch(errorActions.clearError());
    };

    return (
        <Wrapper>
            { (errorObj && errorTitle && errorMessage) && <ErrorModal
                title={errorObj.title}
                message={errorObj.message}
                onConfirm={errorConfirmHandler}
            />}
            <MainNavigation />
            <main>{props.children}</main>
            <Footer/>
        </Wrapper>
    );
};

export default Layout;
