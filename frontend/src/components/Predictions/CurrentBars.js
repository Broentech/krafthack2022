import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const CurrentBars = (props) => {

    return (
        <BarChart
            width={700}
            height={300}
            data={props.data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis type="number" domain={['auto' , 'auto']} />
            <Tooltip />
            <Legend />
            <Bar
                dataKey="Tension"
                fill={props.color}
            />
        </BarChart>
    );
};

export default CurrentBars;
