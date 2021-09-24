import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { apiProvider } from '../../../services/api';
import classes from './Dogs.module.css';

const Dogs = (props) => {

    const location = useLocation();

    const [pics, setPics] = useState([]);

    useEffect(() => {
        // get array of breeds on load
        apiProvider.getPics(location.state.breed, location.state.maxPics).then((response) => {
            setPics(response);
        })
    },[location.state.breed, location.state.maxPics]);

    let picCount = 0;

    return (
        <div className={classes.wrapper}>
            <div className={classes.breedTitle}>{location.state.breedText}:<div className={classes.backLink}><Link to="/">&lt;- Back</Link></div></div>
            
            {pics.length === 0 && <div>Loading, please wait...</div>}
            {pics.map((pic) => <div key={pic} className={classes.picRow}><div className={classes.picNumber}>{++picCount}: </div><div className={classes.picImage}><img src={pic} alt={`${location.state.breedText} dog`} /></div></div>)}
        </div>
    );
};

export default Dogs;