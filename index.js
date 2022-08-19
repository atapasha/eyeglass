const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRouter = require('./routes/user')
require('dotenv').config()



app.use(express.json());

const productModel = require('./models/product')

const UserModel = require('./models/user')




const newProduct = new productModel({ name: 'eynak1' })


console.log(newProduct)


app.use('/user', userRouter)
console.log(UserModel)

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);
    console.log('DB connected...')
}



app.get('/', (req, res) => {

    res.send('hello worldddd ')
})


app.listen(process.env.SERVER_PORT, () => {
    console.log('listening on port 5000')
})

