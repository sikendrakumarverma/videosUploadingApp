const mongoose = require("mongoose")
const isValidFile = (value) => {

    if (value.length == 0) {
        return "No file found";
    }

    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value[0].originalname)) {
        return "file must not contain Whitespaces.";
    }

    let regex = /^.*\.(jpg|JPG|gif|GIF|png|jpeg|mp4|MP4)$/
    if (!regex.test(value[0].originalname)) {
        return "Invalid file extension.";
    }
}

const isPresent = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidName = function (name) {
    const nameRegex = /^[a-zA-Z ]{2,30}$/
    return nameRegex.test(name)
}

const isValidEmail = function (email) {
    const emailRegex = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/
    return emailRegex.test(email)
}

const isValidPassword = function (password) {
    var passRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})");
    return passRegex.test(password)
}

const isValidObjectId = function (id) {
    var ObjectId = mongoose.Types.ObjectId;
    return ObjectId.isValid(id)
}

module.exports = { isPresent, isValidFile, isValidName, isValidEmail, isValidPassword, isValidObjectId };