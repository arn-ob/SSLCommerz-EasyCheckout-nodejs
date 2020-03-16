const request = require('request');

module.exports = async (data = {}, isLive = false, isFastCheckout = false) => {
    return new Promise(async (resolve, reject) => {
        
        let liveURL = 'https://securepay.sslcommerz.com/gwprocess/v4/api.php';
        let localURL = 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php';
        let selectedURL = localURL

        if (isLive) {
            selectedURL = liveURL
        }

        var options = {
            'url': selectedURL,
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            formData: data
        };
        request(options, function (error, response) {
            if (error) reject(error);
            resolve(JSON.parse(response.body))
        });
    })
}