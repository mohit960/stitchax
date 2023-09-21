const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

const authRouter = require('./routes/auth') 
const userRouter = require('./routes/user') 
const productRouter = require('./routes/product') 
const cartRouter = require('./routes/cart') 
const orderRouter = require('./routes/order');
const checkoutRouter = require('./routes/checkout')
const { 
  handleMalformedJson,
  formatCelebrateErrors
} = require('./middlewares/handleError')


const app = express()




// mongodb
mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => console.log("Connected to database"))
	.catch(err => console.error(err))


// global middlewares
app.use(cors({
  origin: ['https://twigg.store','https://stitchax.netlify.app',"http://localhost:3000","https://www.ethnikaa.com"]
}))
app.use(express.json())
app.use(handleMalformedJson) // handle common req errors
const Razorpay = require("razorpay");
const instance = new Razorpay({
    key_id: "rzp_test_80swUL1sWejR3W",
    key_secret: "Tc9pRdiXhMkHsbDbKJhUW4DZ",
});





app.get("/razor/order", (req, res) => {
  try {
    const options = {
      amount: 10 * 100, // amount == Rs 10
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 0,
 // 1 for automatic capture // 0 for manual capture
    };
  instance.orders.create(options, async function (err, order) {
    if (err) {
      return res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  return res.status(200).json(order);
 });
} catch (err) {
  return res.status(500).json({
    message: "Something Went Wrong",
  });
 }
});

app.post("/capture/:paymentId", (req, res) => {
  try {
    return request(
     {
     method: "POST",
     url: `https://rzp_test_80swUL1sWejR3W:Tc9pRdiXhMkHsbDbKJhUW4DZ@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
     form: {
        amount: 10 * 100, // amount == Rs 10 // Same As Order amount
        currency: "INR",
      },
    },
   async function (err, response, body) {
     if (err) {
      return res.status(500).json({
         message: "Something Went Wrong",
       }); 
     }
      console.log("Status:", response.statusCode);
      console.log("Headers:", JSON.stringify(response.headers));
      console.log("Response:", body);
      return res.status(200).json(body);
    });
  } catch (err) {
    console.log('asssss',`https://rzp_test_80swUL1sWejR3W:Tc9pRdiXhMkHsbDbKJhUW4DZ@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`)
    return res.status(500).json({
      message: "Something Went Wrong",
   });
  }
});



// routes
app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/carts", cartRouter)
app.use("/orders", orderRouter)
app.use("/checkout", checkoutRouter)

// server status
app.get("/", (req, res) => {
	res.json({status: "ok"})
})

// format celebrate paramater validation errors
app.use(formatCelebrateErrors)

app.listen(process.env.PORT || 5000, () => {
	console.log(`Listening on port ${process.env.PORT || 5000}`)
})