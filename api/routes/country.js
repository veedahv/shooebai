
const { Router } = require('express');
// const fetch = require('node-fetch');
const axios = require('axios');
const router = Router()

// let location;
// let country;
const getAllCountries = async () => {
    let response = await axios.get(
        'https://restcountries.com/v3/all?fields=name,capital,currencies,flags'
    );
    let result = await response.data;
    // country = await result[0];
    // console.log(country);
    // console.log(result);
    // console.log('result');
    return result;
    // return country;
}

const getCountryInfo = async (name) => {
    // `https://restcountries.com/v3/name/${name}?fields=name,capital,currencies,flag,`
    let response = await axios.get(
        `https://restcountries.com/v3/alpha/${name}?fields=name,capital,currencies,flags`        
    );
    // console.log(`https://restcountries.com/v3/alpha/${name}?fields=name,capital,currencies,flag`);
    let result = await response.data;
    // country = await result[0];
    // console.log(result);
    // console.log(country);
    // console.log('result');
    return result;
    // return country;
}


/* GET users listing. */
router.get('/getAllCountries', function (req, res, next) {
    // console.log(getAllCountries);
    let rateValue = getAllCountries();
    rateValue.then((result) => {
        // res.json(getAllCountries)
        res.json(result)
    })
})

/* GET user by ID. */
router.get('/getCountryInfo/:id', function (req, res, next) {
    const id = req.params.id;
    // console.log(id);
    let rateValue = getCountryInfo(id);
    // console.log(rateValue);
    rateValue.then((result) => {
        // console.log(result);
        res.json(result)
        // res.send({ id: result })
    })
})

module.exports = router

