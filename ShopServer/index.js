const express = require('express');
const {urlencoded, json} = require('express');
const cors = require('cors');
const db = require('./database/mongo.js');
const app = express();
const products = require('./routes/products.routes.js');
// const {client} = require('./whatsapp/wpp.js')
// const sendWhatsAppMessage = require('./whatsapp/apiWhatsapp.js');

// sendWhatsAppMessage();

// client.initialize();
db.dbInit().then(() => console.log('Conexion realizada'))

app.use(urlencoded({extended: true}))
app.use(json())
app.use(cors())

app.use('/r1', products);

app.listen(4000, ()=>{
    console.log('listening at port 4000');
})

