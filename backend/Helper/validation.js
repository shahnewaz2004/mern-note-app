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


function registerValidate(data){
    return registerSchema.validate(data);
}

module.exports.registerValidate = registerValidate;