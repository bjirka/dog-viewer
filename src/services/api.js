import axios from 'axios';

const API_BASE_URL = "https://dog.ceo/api";

const getBreeds = () => {
    return axios.get(`${API_BASE_URL}/breeds/list/all`)
        .then((response) => {
            let breeds = [];

            // loop through each breed in the object
            Object.keys(response.data.message).forEach((key) => {
                //console.log(`${key}: ${response.data.message[key].length}`);
                if(response.data.message[key].length === 0){
                    // no sub-breeds, so just add the breed
                    breeds.push({
                        name: key,
                        value: key
                    });
                }else{
                    // there are sub-breeds, so add each of sub-breed

                    // add the parent breed, too, if there is more than one sub-breed
                    if(response.data.message[key].length > 1){
                        breeds.push({
                            name: key,
                            value: key
                        });
                    }

                    response.data.message[key].forEach((subBreed) => {
                        //console.log(`Breed: ${key}, Sub-Breed: ${subBreed}`);
                        breeds.push({
                            name:`${key} (${subBreed})`,
                            value: `${key}/${subBreed}`
                        });
                    });
                }
            })

            return breeds;
        })
        .catch((error) => {
            console.log("Error Getting Breeds");
            console.log(error);
        });
};


const getPics = (breed, maxPics) => {
    return axios.get(`${API_BASE_URL}/breed/${breed}/images`)
        .then((response) => {
            return response.data.message.slice(0, maxPics);
        })
        .catch((error) => {
            console.log("Error Getting Dogs");
            console.log(error);
        });
};

export const apiProvider = {
    getBreeds,
    getPics,
};