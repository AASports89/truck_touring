const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'localhost://127.0.0.1:27017/odds-db',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
