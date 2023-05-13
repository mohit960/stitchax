const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.ObjectId

const CartSchema = new mongoose.Schema({
	userID: {
		type: ObjectId,
		ref: 'User',
		required: true,
	},
	products: [
		{
			productID: { 
				type: ObjectId,
				ref: 'Product',
				required: true,
			}, 
			quantity: { 
				type: Number, 
				default: 1,
			},
			size: { 
				type: String, 
				default: "L",
				required:true
			},
		},
	],

}, 
	{timestamps: true}
)

module.exports = mongoose.model("Cart", CartSchema)