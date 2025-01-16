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
	
	try {
		let products 
		// if (query.new) {
		// 	products = await Product.find().sort({ createdAt: -1 }).limit(5)

		// }
		if (query.category && query.page) {
			const page = query.page ?query.page : 1;  // Ensure the page is a valid integer, default to 1 if not provided


const limit = 6;  // Items per page
const skip = (page - 1) * limit;  // Calculate how many documents to skip
console.log('limit',limit);
// Use the correct query to find products based on categories and pagination
products = await Product.find({
  categories: { $in: [query.category] }
})
  .skip(skip)  // Skip documents based on the current page
  .limit(limit);  // Limit to the desired number of items per page

		} 
		else if (query.search ) {
			products = await Product.find({
				productCode: { $in: [query.search]}
			})

		}
		
		else {
			products = await Product.find();
		}
		return res.json(products)

	} catch (err) {
		console.error(err)
		return res.status(500).json(productResponse.unexpectedError)
	}
})

router.get("/all", 
	
	async (req, res) => {
	
	try {
		let products = await Product.find();
		
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
		const product = await Product.findById(req.params.id);
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