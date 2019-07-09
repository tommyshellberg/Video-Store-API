const mongoose = require('mongoose')
const Joi = require('joi')

const customerSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15
    }
})

const Customer = mongoose.model("Customer", customerSchema)

const validateCustomer = (customer) => {
    let schema = {
        name: Joi.string().required(),
        phone: Joi.string().required()
    }
    return Joi.validate(customer, schema)
}

exports.Customer = Customer
exports.validate = validateCustomer