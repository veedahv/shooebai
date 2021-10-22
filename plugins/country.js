let location;
// let country;
const getLocationInfo = async (name) => {
    // let response = await fetch(
    //     `https://restcountries.com/v3/name/${name}`
    // );
    // let result = await response.json();
    // country = await result[0];
    // console.log(country);
    // return country;
    return name;
}
const getLocation = async () => {
    let response = await fetch(
        "https://api.geoapify.com/v1/ipinfo?&apiKey=2a1bb31c0a134533b5261eae06c6d2e6"
    );
    let result = await response.json();
    location = await getLocationInfo(result.country.name);
    // console.log(location);
    return location;
}
// getLocation();
export default ({ app }, inject) => {
    inject('country', () => getLocation())
}