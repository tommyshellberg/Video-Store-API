const express = require('express')
const router = express.Router()
const { Customer, validate } = require('../models/customer')
const auth = require('../middleware/auth')


router.get('/', async (req, res) => {
    const customers = await Customer.find()
    res.send(customers)
})

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if(!customer) return res.status(404).send('No customer found with that ID')
    res.send(customer)
})

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    if(req.error) return res.status(400).send("Error with the request.")

    try {
        const customer = new Customer({
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        })
        const result = await customer.save()
        res.send(result)
    } catch (err) {
        res.send(err.message)
    }
})

router.put('/:id', auth, async (req, res) => {
    try {
    const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone 
        }, { new: true })
    if (!customer) return res.status(404).send("Missing customer! Try a different ID")
    res.send(customer)
    } catch(err) {
        console.log(err.message)
    }
    })

router.delete('/:id', auth, async (req, res) => {
    if ( !req.params || !req.params.id ) return res.status(400).send("Something is wrong with the request")
    const customer = await Customer.findByIdAndRemove(req.params.id)
    if ( !customer ) return res.status(404).send('Customer not found, try a different ID.')
    res.send(customer)
})

module.exports = router