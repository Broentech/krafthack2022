import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {predictionsActions} from "../store/predictions-slice";
import DateTimePicker from 'react-datetime-picker';
import 'react-calendar/dist/Calendar.css';
import store from "../store";

const ConfigPage = () => {
    const dispatch = useDispatch();
    const threshold = store.getState().pred.tensionThreshold;
    const thresholdValue = useRef(threshold);
    const [startDate, setStartDate] = useState(new Date);
    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(predictionsActions.setTensionThreshold({
            tensionThreshold : thresholdValue.current.value
        }));
        dispatch(predictionsActions.setStartDate({
            startDate : startDate.toISOString()
        }));
    }

    const calendarStartDate = new Date(1971, 1, 25);
    const calendarStopDate = new Date(1971, 1, 26);

    return (
      <form onSubmit={submitHandler}>
          <button type="submit">Apply</button>
          <div>
              <label htmlFor="threshold">Tension Threshold</label>
              <input
                  id="threshold"
                  type="number"
                  max={3000}
                  step={100}
                  defaultValue={threshold}
                  ref={thresholdValue}
              />
          </div>
          <div>
              <label htmlFor="startDate">Prediction Start Time</label>
              <DateTimePicker id="startDate"
                        activeStartDate={calendarStartDate}
                        defaultActiveStartDate={calendarStartDate}
                        maxDate={calendarStopDate}
                        minDate={calendarStartDate}
                        onChange={setStartDate}
                        value={startDate}
              />
          </div>
      </form>
    );
};

export default ConfigPage;
