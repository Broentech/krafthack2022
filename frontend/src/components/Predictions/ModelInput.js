
import classes from './ModelInput.module.css';
import {useSelector} from "react-redux";
import TimeseriesGraph from "./TimeseriesGraph";

const ModelInput = () => {
    const modelInput = useSelector((state) => state.pred.modelInput);

    return (
        <div className={classes.modelinput}>
            <h1>Input</h1>
            {Object.keys(modelInput).map(k => (
                <TimeseriesGraph
                    key={k}
                    title={k}
                    chart_width={700}
                    chart_height={300}
                    data={modelInput[k]}
                    margin = {{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                    unit={null}
                    line_color={'#1F389BFF'}
                />
            ))}
        </div>
    );
};

export default ModelInput;
