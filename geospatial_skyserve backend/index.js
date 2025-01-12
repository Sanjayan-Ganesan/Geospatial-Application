const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter =  require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter')



require('dotenv').config();
require('./Models/db')

app.use(cors());

const PORT = process.env.PORT || 8080;

app.get('/ping',(req,res)=>{
    res.send("Pong")
})

app.use(bodyParser.json());

app.use('/auth',AuthRouter)
app.use('/products',ProductRouter)

app.listen(PORT, () => {
    console.log(`Server Running Sucessfully! ${PORT}`)
})