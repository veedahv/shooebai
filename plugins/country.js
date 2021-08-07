
let location;
let country;

const getLocationInfo = async (name) => {
    let response = await fetch(
        `https://restcountries.eu/rest/v2/name/${name}`
    );
    let result = await response.json();

    country = await result[0];
    // console.log(country);
    // let  fetch(
    //     `https://restcountries.eu/rest/v2/name/${name}`
    // )
    //     .then((response) => response.json())
    //     .then((result) => {
    //         // console.log(result[0])
    //         country = result[0];
    //         // console.log(country);
    //     })
    //     .catch((error) => console.log("error", error));
    // console.log(country);
    return country;
}
const getLocation = async () => {
    let response = await fetch(
        "https://api.geoapify.com/v1/ipinfo?&apiKey=2a1bb31c0a134533b5261eae06c6d2e6"
    );
    let result = await response.json();


    // location = result.country.name
    // getLocationInfo(location);
    location = await getLocationInfo(result.country.name);
    // console.log(location);
    // fetch(
    //     "https://api.geoapify.com/v1/ipinfo?&apiKey=2a1bb31c0a134533b5261eae06c6d2e6"
    // )
    //     .then((response) => response.json())
    //     // .then((result) => console.log(result.country.name))
    //     .then((result) => {
    //         // location = result.country.name
    //         // getLocationInfo(location);
    //         location = getLocationInfo(result.country.name);
    //         console.log(location);
    //     })
    //     .catch((error) => console.log("error", error));
    // console.log(location);
    // console.log(country);
    return location;
}

getLocation();

export default ({ app }, inject) => {
    inject('country', () => getLocation())
    // inject('country', () => {return location})
}