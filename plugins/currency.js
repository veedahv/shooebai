
// let location;
let currencyRate;
let currencyValue;
let currency;
const currencyRateValue = async (currency) => {
    let response = await fetch(
        `http://api.exchangeratesapi.io/v1/latest?access_key=a291dd902f2aa53659bf2ad17257029d&symbols=NGN,${currency}&format=1`
    );
    let result = await response.json();
    currencyRate = await result.rates;
    // console.log(result);
    // console.log(result.rates);
    // console.log(result.rates.NGN);
    // console.log(result.rates[`${currency}`]);
    console.log(currencyRate);
    // console.log(currencyRate.rates);
    console.log(currencyRate.NGN);
    console.log(currencyRate[`${currency}`]);
    currencyValue = (currencyRate.NGN) / (currencyRate[`${currency}`]);
    console.log(currencyValue);
    return currencyValue;
}
export default ({ app }, inject) => {
    inject('currencyRate', (currency) => currencyRateValue(currency))
}


// const getLocation = async () => {
//     let response = await fetch(
//         "https://api.geoapify.com/v1/ipinfo?&apiKey=2a1bb31c0a134533b5261eae06c6d2e6"
//     );
//     let result = await response.json();
//     location = await getLocationInfo(result.country.name);
//     // console.log(location);
//     return location;
// }
// getLocation();


currency