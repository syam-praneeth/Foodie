const mongoose = require("mongoose");
const firmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: [
        {
            type: String,
            enum: ['veg', 'non-veg'],
            required: true
        }
    ],
    region: [
        {
            type: String,
            enum: ['north', 'south', 'east', 'west'],
            required: true
        }
    ],
    offer: {
        type: String,
        required: true
    },
    image:{
        type: String
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    }
})

const Firm = mongoose.model("Firm", firmSchema);
module.exports = Firm;