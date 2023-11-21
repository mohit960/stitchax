const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	wallet:{
type:Number,
default:0,
	},
	count:{
		type:Number,
		default:1,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
}, 
	{timestamps: true}
)

module.exports = mongoose.model("User", userSchema)