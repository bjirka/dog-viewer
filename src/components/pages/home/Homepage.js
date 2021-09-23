import classes from './Homepage.module.css';
import Search from './Search';

const Homepage = () => {
    return (
        <div className={classes.wrapper}>
            <Search />
        </div>
    );
};

export default Homepage;