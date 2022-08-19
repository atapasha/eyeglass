const express = require('express')
const router = express.Router()

const UserModel = require('../models/user')

const bycript = require('bcrypt');

async function hashPassword(password) {

    const salt = await bycript.genSalt(10)
    const hash = await bycript.hash(password, salt)

    console.log(hash)
    return hash

}


router.post('/register', async (req, res) => {

    req.body.password = await hashPassword(req.body.password)
    console.log(req.body)
    newUser = UserModel(req.body)

    await newUser.save()
    console.log(newUser)
    res.send(newUser)

})


router.post('/login', async (req, res) => {



    const { email, phone, password } = req.body
    const foundUser = await UserModel.findOne({ $or: [{ email }, { phone }] })
    if (foundUser) {

        console.log(password, foundUser.password)
        await bcrypt.compare(password, foundUser.password)
        console.log(password)
        const passwordIscorrect = await bcrypt.compare(password, foundUser.password, function (err, result) {

            result
            console.log(result)

        });



    }


})

module.exports = router 