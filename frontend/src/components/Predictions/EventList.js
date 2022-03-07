
import classes from './EventList.module.css';
import {useSelector} from "react-redux";
import PerfectScrollbar from 'react-perfect-scrollbar';

const EventList = () => {

    const findings = useSelector((state) => state.pred.thresholdFindings) ;

    return (
      <PerfectScrollbar className={classes.eventlist}>
          <h1>Events</h1>
          <ul>
              {findings.map((finding => (
                  <li key={finding.length}>
                      <div>
                          <h5>Sensor : {finding.sensor}</h5>
                          <p>Value : {finding.value} Time : {finding.timestamp}</p>
                      </div>
                  </li>
              )))}
          </ul>
      </PerfectScrollbar>
    );
};

export default EventList;
