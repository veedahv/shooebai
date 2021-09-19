
const express = require('express');
// const { GraphQLClient } = require('graphql-request');

const app = express();
app.use(express.json());

// const client = new GraphQLClient(
//     process.env.ENDPOINT
// );

// app.get('/getCourses', async (req, res) => {
//     const allCourses = `
//     {
//         courses {
//           index
//           id
//           name
//           description
//           url
//           vote
//           authors {
//             name
//           }
//         }
//     }
//   `;

//   const { courses } = await client.request(allCourses);

//   res.json({ courses })
// });

// mock data to send to our frontend
let events = [
    {
        id: 1,
        name: "Charity Ball",
        category: "Fundraising",
        description:
            "Spend an elegant night of dinner and dancing with us as we raise money for our new rescue farm.",
        featuredImage: "https://placekitten.com/500/500",
        images: [
            "https://placekitten.com/500/500",
            "https://placekitten.com/500/500",
            "https://placekitten.com/500/500"
        ],
        location: "1234 Fancy Ave",
        date: "12-25-2019",
        time: "11:30"
    },
    {
        id: 2,
        name: "Rescue Center Goods Drive",
        category: "Adoptions",
        description:
            "Come to our donation drive to help us replenish our stock of pet food, toys, bedding, etc. We will have live bands, games, food trucks, and much more.",
        featuredImage: "https://placekitten.com/500/500",
        images: ["https://placekitten.com/500/500"],
        location: "1234 Dog Alley",
        date: "11-21-2019",
        time: "12:00"
    }
];

// get all events

app.get("/events", (req, res) => {
    res.send(events);
});

app.get("/events/:id", (req, res) => {
    const id = Number(req.params.id);
    const event = events.find(event => event.id === id);
    res.send(event);
});

app.get("/", (req, res) => {
    res.send(`Hi! Server is listening on port ${port}`);
});

module.exports = app



// let location;
// let currencyRate;
// let currencyValue;
// let currency;
// const currencyRateValue = async (currency) => {
//     let response = await fetch(
//         `http://api.exchangeratesapi.io/v1/latest?access_key=a291dd902f2aa53659bf2ad17257029d&symbols=NGN,${currency}&format=1`
//     );
//     let result = await response.json();
//     currencyRate = await result.rates;
//     // console.log(result);
//     // console.log(result.rates);
//     // console.log(result.rates.NGN);
//     // console.log(result.rates[`${currency}`]);
//     console.log(currencyRate);
//     // console.log(currencyRate.rates);
//     console.log(currencyRate.NGN);
//     console.log(currencyRate[`${currency}`]);
//     currencyValue = (currencyRate.NGN) / (currencyRate[`${currency}`]);
//     console.log(currencyValue);
//     return currencyValue;
// }
// export default ({ app }, inject) => {
//     inject('currencyRate', (currency) => currencyRateValue(currency))
// }


// // const getLocation = async () => {
// //     let response = await fetch(
// //         "https://api.geoapify.com/v1/ipinfo?&apiKey=2a1bb31c0a134533b5261eae06c6d2e6"
// //     );
// //     let result = await response.json();
// //     location = await getLocationInfo(result.country.name);
// //     // console.log(location);
// //     return location;
// // }
// // getLocation();


// currency