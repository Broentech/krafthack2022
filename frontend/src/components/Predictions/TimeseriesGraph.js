import {LineChart , Line , XAxis, YAxis , Tooltip, Legend} from 'recharts';

const TimeseriesGraph = (props) => {
    return (
        <div>
            <p>{props.title}</p>
            <LineChart
                width={props.chart_width}
                height={props.chart_height}
                data={props.data}
                margin={props.margin}
                animationEasing='linear'
                isAnimationActive={false}
            >
                <XAxis
                    dataKey="name"
                    unit={props.unit}
                    domain={['auto' , 'auto']}
                />

                <YAxis type="number" domain={['auto' , 'auto']} />
                <Tooltip />
                <Legend />
                <Line type="monotone"
                      dataKey="value"
                      stroke={props.line_color}
                      strokeWidth={3}
                />
            </LineChart>
        </div>
    );
};

export default TimeseriesGraph;
