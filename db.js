const mongoose = require('mongoose');
const { mongoUri } = require('./config');

const connect = () => {
    mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
};

module.exports = {
    connect
};
