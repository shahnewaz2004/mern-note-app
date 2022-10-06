const joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');


const registerSchema = joi.object({
    Name: joi.string().min(3).max(30).required(),
    Email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] }}).required(),
    Password : new PasswordComplexity({
        min: 8,
        max: 255,
        requirementCount: 4,
    })
})


const noteSchema = joi.object({
    Title: joi.string().min(1).max(256).required(),
    Description: joi.string().min(1).max(10000).required()
})


const passSchema = joi.object({
    'New password': new PasswordComplexity({
        min: 8,
        max: 255,
        requirementCount: 4,
    })
})


function registerValidate(data){
    return registerSchema.validate(data);
}

function noteValidate(data){
    return noteSchema.validate(data);
}

function passwordValidate(data){
    return passSchema.validate(data)
}

module.exports.registerValidate = registerValidate;
module.exports.noteValidate = noteValidate;
module.exports.passwordValidate = passwordValidate;