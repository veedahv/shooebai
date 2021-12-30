
const { Router } = require('express');
// const fetch = require('node-fetch');
const axios = require('axios');
const router = Router()


// let location;
// let country;

const getLocation = async () => {
    let response = await axios.get(
        "https://api.geoapify.com/v1/ipinfo?&apiKey=2a1bb31c0a134533b5261eae06c6d2e6"
    );
    let result = await response.data;
    location = result.country;
    // console.log(result);
    // console.log(location);
    return location;
    // return result;
}


/* GET users listing. */
router.get('/getLocation', function (req, res, next) {
    let locationValue = getLocation();
    locationValue.then((result) => {
        res.json(result)
    })
})


module.exports = router

