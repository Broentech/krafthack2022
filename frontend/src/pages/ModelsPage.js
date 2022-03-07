import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {requestModels} from "../store/predictions-actions";

const ModelsPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestModels());
    } , []);

    return (
        <div>
            <h1>MODELS</h1>
        </div>
    );
};

export default ModelsPage;
