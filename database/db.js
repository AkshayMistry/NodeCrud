var mongoose = require('mongoose');
mongoose.set('debug', false);
//contect to mongoDB
mongoose.connect('mongodb://localhost:27017/nodetest', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })

//on Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database mongodb @ 27017');
});
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error in database connection:' + err);
    }
});