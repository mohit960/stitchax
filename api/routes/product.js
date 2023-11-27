const router = require("express").Router()
const { celebrate } = require('celebrate')

const Product = require("../models/Product.model")
const { product: productSchema } = require('../models/schema')
const ObjectId = require("mongoose").Types.ObjectId
const { 
	verifyToken,
	verifyAuthorization,
	verifyAdminAccess,
} = require('../middlewares/verifyAuth')


// Get all products - any user
router.get("/", 
	celebrate({ query: productSchema.query }),
	async (req, res) => {
	const query = req.query
	console.log('query',query);
	try {
		let products 
		// if (query.new) {
		// 	products = await Product.find().sort({ createdAt: -1 }).limit(5)

		// }
		if (query.category && query.page) {
			const page = query.page || 0;
        const limit = 12;
			products = await Product.find({
				categories: { $in: [query.category]}
			}) .skip((page-1) * limit)
            .limit(limit);

		} 
		else if (query.search ) {
			products = await Product.find({
				productCode: { $in: [query.search]}
			})

		}
		
		else {
			products = await Product.find()
           ;
		}
		return res.json(products)

	} catch (err) {
		console.error(err)
		return res.status(500).json(productResponse.unexpectedError)
	}
})

router.get("/count", 
	
	async (req, res) => {
	
	
		const query = req.query;
		
			const count = await Product.find({
				categories: { $in: [query.category]}
			}).countDocuments();
console.log('counttttt',count);
		

	
		
		
		
		return res.json({count:count})

	} 
)

// Add a new product - admin only
router.post("/", 
	verifyAdminAccess, 
	celebrate({ body: productSchema.new }),
	async (req, res) => {

	try {
		await Product.create(req.body)
		return res.json(productResponse.productAdded)

	} catch (err) {
		console.log(err)
		return res.status(500).json(productResponse.unexpectedErrorS)
	}
})

// Update a product - admin only
router.put("/:id",
  verifyAdminAccess, 
	celebrate({ body: productSchema.update }),
  async (req, res) => {
	try {
		await Product.findByIdAndUpdate(
			req.params.id,
			{$set: req.body },
			{new: true},
		)
		return res.json(productResponse.productUpdated)
		
	} catch (err) {
		console.error(err)
		return res.status(500).json(productResponse.unexpectedError)
	}
})

// Delete a product - admin only
router.delete("/:id", verifyAdminAccess, async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id)
		res.json(productResponse.productDeleted)

	} catch (err) {
		console.log(err)
		return res.status(500).json(productResponse.unexpectedError)
	}
})

// Get any product - any user
router.get("/:id", async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
		return res.json(product)

	} catch (err) {
		console.error(err)
		return res.status(500).json(productResponse.unexpectedError)
	}
})




router.post("/reviews/:id",
	celebrate({ body: productSchema.update }),
  async (req, res) => {
	try {
		await Product.findByIdAndUpdate(
			req.params.id,
			{$set: req.body },
			{new: true},
		)
		return res.json(productResponse.productUpdated)
		
	} catch (err) {
		console.error(err)
		return res.status(500).json(productResponse.unexpectedError)
	}
})

const productResponse = {
	productAdded: { 
		status: "ok",
		message: "product has been added",
	},	
	productUpdated: { 
		status: "ok",
		message: "product has been updated",
	},
	productDeleted: { 
		status: "ok",
		message: "product has been deleted",
	},
	unexpectedError: {
		status: "error",
		message: "an unexpected error occurred",
	},
}

module.exports = router