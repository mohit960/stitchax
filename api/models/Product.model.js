const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	productCode: { type: Array },
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
	discountedPrice:{
		type: Number,
		required: true,
	},
	stock:{
		type:Number,
	},
	inStock: {
		type: Boolean,
		default: true,
	},
	categories: { type: Array },
	color: { type: Array },
	size:{type:Array},
	material:{type:String},
	review:[{
		name:{type:String},
		title:{type:String},
		description:{type:String},
		rating:{type:Number},
		time:{type:Date}
	}]
}, 
	{timestamps: true}
)

module.exports = mongoose.model("Product", ProductSchema)