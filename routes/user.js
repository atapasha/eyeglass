
require('dotenv').config()
const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken')

const UserModel = require('../models/user')

const bcrypt = require('bcrypt');

async function hashPassword(password) {

    const salt = await bycript.genSalt(10)
    const hash = await bycript.hash(password, salt)

    console.log(hash)
    return hash

}


router.post('/register', async (req, res) => {

    req.body.password = await hashPassword(req.body.password)
    console.log(req.body)
    const newUser = new UserModel(req.body)

    await newUser.save()
    console.log(newUser)
    res.send(newUser)

})


router.post('/login', async (req, res) => {

    const { email, phone, password } = req.body

    console.log(email, phone, password)
    const foundUser = await UserModel.findOne({
        email, phone, password
    })

    if (foundUser) {

        console.log(password, foundUser.password)

        const passwordIscorrect = bcrypt.compare(password, foundUser.password)
        console.log(passwordIscorrect)
        if (passwordIscorrect) {

            const token = jwt.sign({ _id: foundUser._id, name: foundUser.name }, process.env.PASSWORD_HASH_KEY)
            return res.send(token)
        }

    }
    return res.send('false')
}),


    router.get('/', (req, res) => {
        res.send(req.user)
    })


module.exports = router 