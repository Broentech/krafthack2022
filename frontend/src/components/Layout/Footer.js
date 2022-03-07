
import classes from './Footer.module.css';
import {useSelector} from "react-redux";

const Footer = () => {
    const mode = useSelector((state) => state.pred.mode);

    return (
        <div className={classes.footer}>
            Current Powerplant Mode : {mode}
        </div>
    );
};

export default Footer;
