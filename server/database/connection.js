const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        
        //mongodb conn string
        const con = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`MongoDB connected at cluster ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

//export db conn for server.js
module.exports = connectDB
