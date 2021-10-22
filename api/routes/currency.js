const { Router } = require('express');
// const fetch = require('node-fetch');
const axios = require('axios');
const router = Router()

let currencyRate;
let currencyValue;
const currencyRateValue = async (currency) => {
    let response = await axios.get(
        `http://api.exchangeratesapi.io/v1/latest?access_key=a291dd902f2aa53659bf2ad17257029d&symbols=NGN,${currency}&format=1`
    );
    let result = await response.data;
    currencyRate = await result.rates;
    currencyValue = (currencyRate.NGN) / (currencyRate[`${currency}`]);
    console.log(currencyValue);
    return currencyValue;
}


/* GET users listing. */
// router.get('/currency', function (req, res, next) {
//     res.json(currency)
// })

/* GET user by ID. */
router.get('/currency/:id', function (req, res, next) {
    const id = req.params.id;
    let rateValue = currencyRateValue(id);
    rateValue.then((result) => {
        res.send({ id: result })
    })
})

module.exports = router