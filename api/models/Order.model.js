const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.ObjectId

const OrderSchema = new mongoose.Schema({
	userID: {
		type: ObjectId ,
		ref: 'User',
		
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
				default: "S",
			},

		},
	],
	amount: {
		type: Number,
		required: true,
	},
	address: [
		{
			name: {
				type: String,
				
				required: true,
			}, 
			address1: {
				type: String,
				
				required: true,
			},
			address2: {
				type: String,
				
				
			},
			city: {
				type: String,
				
				required: true,
			},
			email: {
				type: String,
				
				required: true,
			},
			phone: {
				type: Number,
				
				required: true,
			},
			state: {
				type: String,
				
				required: true,
			},
			zipcode: {
				type: Number,
				
				required: true,
			},
		},
	],
	status: {
		type: String,
		default: "pending",
	},
	razorOrderId:{
		type:String
	},
	razorPaymentId:{
		type:String
	},
	to:{
		type:String
	},from:{
		type:String
	},cardType:{
		type:String
	}
}, 
	{timestamps: true}
)

module.exports = mongoose.model("Order", OrderSchema)