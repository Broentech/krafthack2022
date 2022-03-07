
import classes from './ModelOutput.module.css';
import {useSelector} from "react-redux";
import TimeseriesGraph from "./TimeseriesGraph";

const ModelOutput = () => {
    const modelOutput = useSelector((state) => state.pred.modelOutput);
    return (
        <div className={classes.modeloutput}>
            <h1>Output</h1>
            {Object.keys(modelOutput).map(k => (
                <TimeseriesGraph
                    key={k}
                    title={k}
                    chart_width={600}
                    chart_height={300}
                    data={modelOutput[k]}
                    margin = {{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                    unit={null}
                    line_color={'#4B2102FF'}
                />
            ))}
        </div>
    );
};

export default ModelOutput;
