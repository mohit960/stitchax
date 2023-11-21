const { Joi } = require('celebrate')

const MIN_PASSWORD_LENGTH = 6
const ID_LENGTH = 24
const ALLOWED_ORDER_STATUS = ['pending', 'shipped', 'in transit', 'delivered']


module.exports = {
	auth: {
		login: Joi.object().keys({
			email: Joi.string().email().required(),
		}),
		register: Joi.object().keys({
			email: Joi.string().email().required(),
		}),
	},
	user: {
		query: Joi.object().keys({
			new: Joi.boolean(),
		}),
		update: Joi.object().keys({
			wallet:Joi.number(),
		}),
	},
	product: {
		query: Joi.object().keys({
			new: Joi.boolean(),
			category: Joi.string(),
			search:Joi.string(),
			page:Joi.number()
		}),
		new: Joi.object().keys({
			title: Joi.string().required(),
			description: Joi.string().required(),
			image: Joi.array().items(Joi.string().uri().required()).single(),
			price: Joi.number().positive().required(),
			discountedPrice: Joi.number().positive().required(),
			inStock: Joi.boolean(),
			material:Joi.string(),
			stock:Joi.number(),
			productCode:Joi.array().items(Joi.string()).single(),
			categories: Joi.array().items(Joi.string()).single(),
			color: Joi.array().items(Joi.string()).single(),
			size: Joi.array().items(Joi.string()).single(),
			review: Joi.array().items(
				Joi.object().keys({
					title: Joi.string(),
					description: Joi.string(),
					rating:Joi.number().positive(),
				}),
			),
		}),
		update: Joi.object().keys({
			_id:Joi.string(),
			__v:Joi.number(),
			updatedAt:Joi.string(),
			createdAt:Joi.string(),
			title: Joi.string(),
			description: Joi.string(),
			image: Joi.array().items(Joi.string().uri().required()).single(),
			price: Joi.number().positive(),
			discountedPrice: Joi.number().positive().required(),
			inStock: Joi.boolean(),
			material:Joi.string(),
			stock:Joi.number(),
			productCode:Joi.array().items(Joi.string()).single(),
			categories: Joi.array().items(Joi.string()).single(),
			color: Joi.array().items(Joi.string()).single(),
			size: Joi.array().items(Joi.string()).single(),
			review: Joi.array().items(
				Joi.object().keys({
					_id:Joi.string(),
					title: Joi.string(),
					description: Joi.string(),
					rating:Joi.number().positive(),
					name:Joi.string(),
					time:Joi.date()
				}),
			),
		}),
		patch: Joi.object().keys({
			
			review: Joi.array().items(
				Joi.object().keys({
					title: Joi.string(),
					description: Joi.string(),
					rating:Joi.number().positive(),
					name:Joi.string(),
					time:Joi.date()
				}),
			),
		}),
	},
	order: {
		query: Joi.object().keys({
			status: Joi.string().valid(...ALLOWED_ORDER_STATUS),
		}),
		new: Joi.object().keys({
			products: Joi.array().items(
				Joi.object().keys({
					productID: Joi.string().length(ID_LENGTH).alphanum().required(),
					quantity: Joi.number().positive(),
					
				}).required(),
			).single().min(1),
			amount: Joi.any().required(),
			address: Joi.any().required(),
			status: Joi.string().valid(...ALLOWED_ORDER_STATUS),
			razorOrderId:Joi.string().required(),
			razorPaymentId:Joi.string().required(),
			userId:Joi.string(),to:Joi.string(),from:Joi.string(),cardType:Joi.string()

		}),
		update: Joi.object().keys({
			products: Joi.array().items(
				Joi.object().keys({
					productID: Joi.string().length(ID_LENGTH).alphanum().required(),
					quantity: Joi.number().positive(),
				}).required(),
			).single(),
			amount: Joi.number().positive(),
			address: Joi.any(),
			status: Joi.string().valid(...ALLOWED_ORDER_STATUS),
			razorOrderId:Joi.string().required(),
			razorPaymentId:Joi.string().required(),to:Joi.string(),from:Joi.string(),cardType:Joi.string()

		}),
	},
	cart: {
		new: Joi.object().keys({
			products: Joi.array().items(
				Joi.object().keys({
					productID: Joi.string().length(ID_LENGTH).alphanum().required(),
					quantity: Joi.number().positive(),
					category:Joi.array().items(Joi.string()).single(),
					
				}).required(),
			).single(),
		}),
		update: Joi.object().keys({
			products: Joi.array().items(
				Joi.object().keys({
					productID: Joi.string().length(ID_LENGTH).alphanum().required(),
					
					category:Joi.array().items(Joi.string()).single(),
					
					quantity: Joi.number().positive(),
				}).required(),
			).single()
		}),
		patch: Joi.object().keys({
			productID: Joi.string().length(ID_LENGTH).alphanum().required(),
			quantity: Joi.number().integer().min(0)
		}),
	},
}