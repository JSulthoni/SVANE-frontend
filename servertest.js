import axios from "axios";


const data = JSON.stringify({
    "collection": "products",
    "database": "mongo-api",
    "dataSource": "cluster0",
    "projection": {
        "_id": 1
    }
});

const API_KEY = process.env.VITE_MONGO_API_KEY

const config = {
    method: 'post',
    url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-mhvwb/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': API_KEY,
      'Accept': 'application/ejson'
    },
    data: data
};
            
axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
