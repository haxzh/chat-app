const mongoose =  require('mongoose')

mongoose.connect(process.env.CONN_STRING);

// connection state
const db = mongoose.connection;


// check db connnection

db.on('connected', () => {
    console.log('MongoDB connected successfully');
});
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

module.exports = db;