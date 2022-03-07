
import classes from './CurrentPredictions.module.css';
import CurrentBars from "./CurrentBars";
import {useSelector} from "react-redux";

const CurrentPredictions = () => {

    const currentModelOutput = useSelector((state) => state.pred.currentModelOutput);

    //console.log('currentModelOutput :: ' , currentModelOutput);

    let data = [];
    let color = '#6bc46e';
    Object.keys(currentModelOutput).map(key => {
        if (currentModelOutput[key].color === '#B70A0AFF') {
            color = '#c78e8e';
        }
        data.push({
            name : key ,
            Tension : currentModelOutput[key].value ,
            color : currentModelOutput[key].color
        });
    });
    //console.log(data);

    return (
        <div className={classes.currentpred}>
            <h1>Realtime</h1>
            <CurrentBars
                data={data}
                color={color}
            />
        </div>
    );
};

export default CurrentPredictions;
