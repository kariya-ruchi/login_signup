const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Empdata")
.then(() => {
    console.log('MONGODB CONNECTED');
})
.catch(err => {
    console.log(err);
});

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }     
});

const collection = mongoose.model("LoginCollection", loginSchema);

module.exports = collection;
