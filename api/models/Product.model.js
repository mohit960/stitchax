const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: [{
		type: String,
		
	}],
	price: { 
		type: Number,
		required: true,
	},
	inStock: {
		type: Boolean,
		default: true,
	},
	categories: { type: Array },
	size: { type: Array },
	color: { type: Array },
	review:[{
		title:{type:String},
		description:{type:String},
		rating:{type:Number}
	}]
}, 
	{timestamps: true}
)

module.exports = mongoose.model("Product", ProductSchema)