
import classes from './PredTitle.module.css';
import {useSelector} from "react-redux";

const PredTitle = () => {

    const threshold = useSelector((state) => state.pred.tensionThreshold);
    const startDate = useSelector((state) => state.pred.startDate);

    return (
        <div className={classes.predtitle}>
            <h1>Bolt Tension Predictions</h1>
            <h4>(Threshold : {threshold} )</h4>
            <h4>(Start Date : {startDate} )</h4>
        </div>
    );
};

export default PredTitle;
