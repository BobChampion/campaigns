const axios = require('axios');
const fs = require('fs');
require('dotenv').config()

const data = {
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
};

axios
  .post('https://api.voluum.com/auth/session', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
    if (response.data) {
      axios
        .get('https://api.voluum.com/campaign', {
          headers: {
            'cwauth-token': response.data.token,
            Accept: 'application/json',
          },
        })
        .then((response) => {
          if (response.data) {
            fs.writeFile('campaigns.txt', JSON.stringify(response.data,null, " "), function (err) {
              if (err) throw err;
              console.log('Saved!');
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  })
  .catch((error) => {
    console.error(error);
  });
