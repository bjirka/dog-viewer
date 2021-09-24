import { useEffect, useState } from 'react';
import { createBrowserHistory } from 'history';
import { apiProvider } from '../../../services/api';
import classes from './Search.module.css';

const Search = () => {

    const [breeds, setBreeds] = useState([]);

    const [maxPics, setMaxPics] = useState(5);
    const [selectedBreed, setSelectedBreed] = useState(-1);
    const [selectedBreedText, setSelectedBreedText] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // get array of breeds on load
        apiProvider.getBreeds().then((response) => {
            setBreeds(response);
        })
    },[setBreeds]);

    const submitHandler = (form) => {
        form.preventDefault();

        if(validateForm()){
            const history = createBrowserHistory({forceRefresh:true});
            history.push({
                pathname: "/dogs",
                state: {
                    breed: selectedBreed,
                    breedText: selectedBreedText,
                    maxPics: maxPics
                }
            });
        }
    }

    const validateForm = () => {
        if(selectedBreed === -1){
            setErrorMessage("You must select a breed!");
            return false;
        }
        if(!(maxPics >= 1 && maxPics <= 10)){
            setErrorMessage("Max Pics must be between 1 and 10!");
            return false;
        }

        setErrorMessage("");
        return true;
    }

    const maxPicsHandler = (e) => {
        setMaxPics(e.target.value);
    }

    const breedHandler = (e) => {
        setSelectedBreed(e.target.value);
        setSelectedBreedText(e.target.options[e.target.selectedIndex].text);
    }


    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>Pick Your Options</div>
            <div className={classes.body}>
                <form onSubmit={submitHandler}>
                    <div className={classes.row}>
                        <label htmlFor="breed">Dog Breed: </label>
                        <select id="breed" onChange={breedHandler} value={selectedBreed}>
                            <option disabled value="-1">Select A Breed</option>
                            {breeds.map((breed) => <option key={breed.value} value={breed.value}>{breed.name}</option>)}
                        </select>
                    </div>
                    <div className={classes.row}>
                        <label htmlFor="count">Max Pics: </label>
                        <input id="count" type="text" value={maxPics} size="4" onChange={maxPicsHandler} />
                    </div>
                    {errorMessage !== "" && (<div className={classes.rowError}>
                        <div>{errorMessage}</div>
                    </div>)}
                    <div className={classes.rowCenter}>
                        <input type="submit" value="View Dogs! ➤" className={classes.submitButton} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Search;