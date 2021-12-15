const mongoose = require('mongoose')
const uri = process.env.MONGO_DB

mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(res => console.log('Database: OK 👍'))
    .catch(e => console.log(e))