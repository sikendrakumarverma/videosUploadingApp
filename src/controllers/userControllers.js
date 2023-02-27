const userModel = require("../models/userModel")
const { isPresent, isValidEmail, isValidPassword, isValidName, } = require("../validations/validation")
//const {JWT_SECRET} = require('../config/keys.js');
const createUsers = async function (req, res) {
    try {
        let data = req.body;
        let {  name, email, password } = data;

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Data is mandatory" })

        // ----->> name validation <<-----

        if (!isPresent(name)) return res.status(400).send({ status: false, message: "Please enter name" })
        if (!isValidName(name)) return res.status(400).send({ status: false, message: "Name should be in alphabets" })
        data.name = name;

        // ----->> email validation <<-----
        if (!isPresent(email)) { return res.status(400).send({ status: false, message: "Please provide the email" }) }
        if (!isValidEmail(email)) { return res.status(400).send({ status: false, message: "Please provide valid email number" }) }
        let emailCheck = await userModel.findOne({ email: email })
        if (emailCheck) { return res.status(400).send({ status: false, message: "This email is already registerd" }) }
        data.email = email;

        // ----->> password validation <<-----
        if (!isPresent(password)) { return res.status(400).send({ status: false, message: "Please provide the password" }) }
        if (!isValidPassword(password)) { return res.status(400).send({ status: false, message: "Password must have Upper Case, Lower Case, Numbers, special characters" }) }
        data.password = password;

        const createdData = await userModel.create(data)
        return res.status(201).send({ status: true, message: "success", data: createdData })

    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

const login = async function (req, res) {
    try {
        let { email, password } = req.body;
        if (Object.entries(req.body).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter email and Password" })
        }
        if (!isPresent(email)) {
            return res.status(400).send({ status: false, message: "Please enter email" })
        }
        if (!isPresent(password)) {
            return res.status(400).send({ status: false, message: "Please enter Password" })
        }
        if (isValidEmail(email) == false) {
            return res.status(400).send({ status: false, message: "Please enter correct Email" })
        }
        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, message: "Please enter correct Password" })
        }
        let user = await userModel.findOne(req.body);
        if (!user) {
            return res.status(404).send({ status: false, message: "User not found by this email or password" })
        }
        
        return res.status(200).send({ status: true, message: "Login Successfully"})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
module.exports = { createUsers, login }
