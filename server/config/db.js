const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//yarn add dotenv (extract files from env file)

mongoose.connect( process.env.DB_URL, { useNewUrlParser: true });

mongoose.connection.once('open', () => console.log(`Connected to Mongo at ${process.env.DB_URL}`));

module.exports = mongoose;