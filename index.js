const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const fs = require('fs');
const templateString = fs.readFileSync('./views/index.ejs', 'utf-8');

require('./database/db');
require('dotenv').config();

let app = express();
var port = process.env.PORT;
app.use(bodyparser.json({ limit: '500mb' }));
app.use(express.static('public'));
app.listen(port, () => {
    console.log('server started at port : ' + port);
});

app.get('/', (req, res) => {
    res.end(ejs.render(templateString));
});


const user = require('./app/route/user.route');
app.use('/api/user', user);

const category = require('./app/route/category.route');
app.use('/api/category', category);

const subCategory = require('./app/route/subCategory.route');
app.use('/api/sub-category', subCategory);

const product = require('./app/route/product.route');
app.use('/api/product', product);