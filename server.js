const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sslcPayment = require('./sslcPayment/index')

const port = 3322;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/home', (req, res) => {
    res.render('index', { page: 'index' })
})

app.post('/payment', async (req, res) => {

    let _response, response;
    try {
        _response = await sslcPayment({
            store_id: 'testbox',
            store_passwd: 'qwerty',
            total_amount: 10,
            currency: 'BDT',
            tran_id: 'asdasd',
            product_category: 'asadsadsads',
            success_url: 'https://api.stupidarnob.com',
            fail_url: 'https://api.stupidarnob.com',
            cancel_url: 'https://api.stupidarnob.com',
            emi_option: 11,

            cus_name: 'sadsd',
            cus_email: 'asdsad',
            cus_add1: 'sadsad',
            cus_add2: 'asdsaddasd',
            cus_city: 'sasads',
            cus_postcode: '123',
            cus_country: 'asdsad',
            cus_phone: 'asdsdssd',
            shipping_method: 'NO',
            num_of_item: 22,

            product_name: 'test',
            product_category: 'test',
            product_profile: 'asdasdsa',
        })

    } catch (error) {
        _response = {
            status: 'FAILED'
        }
    }

    if (_response.status === "SUCCESS") {
        response = {
            status: 'success',
            data: _response.GatewayPageURL,
            logo: _response.storeLogo,
            sessionkey: _response.sessionkey,
        }
    } else {
        response = {
            status: 'failed',
            data: null,
            logo: null,
            message: ''
        }
    }

    res.json({
        ...response,
    })
})

app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
)