const mongoose = require('mongoose');


const mongo_db_url = process.env.MONGO_CONN;

mongoose.connect(mongo_db_url)

.then(()=>{
    console.log("DB Connected sucessfully")
}).catch((err)=>{
    console.log("DB Connection Error")
})