import { Link } from 'react-router-dom';
import classes from './Header.module.css';

const Header = () => {
    return (
        <div className={classes.header}>
            <Link className={classes.titleLink} to='/'>Dog Viewer</Link>
        </div>
    );
};

export default Header;