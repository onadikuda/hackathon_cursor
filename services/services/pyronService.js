const axios = require("../../utils/axios");
let pyToken = null;
const createToken = async (config) => {
    console.debug('Starting of getpyToken method');
    const response = await axios.post(`${config.py.tokenUrl}`, {
        'client_id': config.py.clientId,
        'client_secret': config.py.clientSecret,
        'grant_type': 'client_credentials'
    }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
    const token = response?.data?.access_token || '';
    if (token === '') {
        console.debug('getpyToken - Unable to get the token');
    }
    return `${token}`;
};

async function getpyToken(config) {
    if (pyToken == null) {
        pyToken = await createToken(config);
    }
    return pyToken;
}

module.exports = {
    getpyToken,
};