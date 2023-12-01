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



const { createTransport } = require('nodemailer');

app.post("/mail/send", (req, res) => {
  const { email,value } = req.body
  console.log('swfwer',process.env.USERSMTP, process.env.SMTPPASS ,process.env.HOSTNAME)
  const transporter = createTransport({
    host: process.env.HOSTNAME,
    port: 587,
    auth: {
        user: process.env.USERSMTP,
        pass: process.env.SMTPPASS,
    },
});

const mailOptions = {
    from: 'customersupport@ethnikaa.com',
    to: email,
    subject: `Otp to login to Ethnikaa`,
    text: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <html lang="en">
    
     
    
      <body style="background-color:#ffffff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
        <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;background-color:#ffffff;border:1px solid #eee;border-radius:5px;box-shadow:0 5px 10px rgba(20,50,70,.2);width:360px;">
          <tr style="width:100%">
            <td><img alt="Plaid" src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/plaid-logo.png" width="212" height="88" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" />
              <p style="font-size:11px;line-height:16px;margin:16px 8px 8px 8px;color:#0a85ea;font-weight:700;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;height:16px;letter-spacing:0;text-transform:uppercase;text-align:center">Verify Your Identity</p>
              <h1 style="color:#000;display:inline-block;font-family:HelveticaNeue-Medium,Helvetica,Arial,sans-serif;font-size:20px;font-weight:500;line-height:24px;margin-bottom:0;margin-top:0;text-align:center">Enter the following code to login to Ethnikaa</h1>
              <table style="background:rgba(0,0,0,.05);border-radius:4px;vertical-align:middle;width:280px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                <tbody>
                  <tr>
                    <td>
                      <p style="font-size:32px;line-height:40px;margin:0 auto;color:#000;display:inline-block;font-family:HelveticaNeue-Bold;font-weight:700;letter-spacing:6px;padding-bottom:8px;padding-top:8px;width:100%;text-align:center">${value}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size:15px;line-height:23px;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">Not expecting this email?</p>
              <p style="font-size:15px;line-height:23px;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">Contact <a target="_blank" style="color:#444;text-decoration:underline" href="mailto:customersupport@ethnikaa.com">customersupport@ethnikaa.com</a> if you did not request this code.</p>
            </td>
          </tr>
        </table>
        <p style="font-size:12px;line-height:23px;margin:0;color:#000;font-weight:800;letter-spacing:0;margin-top:20px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;text-align:center;text-transform:uppercase">Team Ethnikaa</p>
      </body>
    
    </html>`
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
  })
app.post("/mail/sendOrder", (req, res) => {
  const { email,value } = req.body
  console.log('swfwer',process.env.USERSMTP, process.env.SMTPPASS ,process.env.HOSTNAME)
  const transporter = createTransport({
    host: process.env.HOSTNAME,
    port: 587,
    auth: {
        user: process.env.USERSMTP,
        pass: process.env.SMTPPASS,
    },
});

const mailOptions = {
    from: 'customersupport@ethnikaa.com',
    to: email,
    subject: `Order Trackink for Order ID: ${value}`,
    text: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <html lang="en">
    
      <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Ethnikaa<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
      </div>
    
      <body style="background-color:#fff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
        <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em">
          <tr style="width:100%">
            <td>
              <table style="padding:30px 20px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                <tbody>
                  <tr>
                    <td><img src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/yelp-logo.png" style="display:block;outline:none;border:none;text-decoration:none" /></td>
                  </tr>
                </tbody>
              </table>
              <table style="border:1px solid rgb(0,0,0, 0.1);border-radius:3px;overflow:hidden" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                <tbody>
                  <tr>
                    <td><img src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/yelp-header.png" width="620" style="display:block;outline:none;border:none;text-decoration:none" />
                      <table width="100%" style="padding:20px 40px;padding-bottom:0" align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                        <tbody style="width:100%">
                          <tr style="width:100%">
                            <td>
                              <h1 style="font-size:32px;font-weight:bold;text-align:center">Order Placed Successfully</h1>
                              <h2 style="font-size:26px;font-weight:bold;text-align:center">Track your order at link provided below</h2>
                             
                              
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table width="100%" style="padding:20px 40px;padding-top:0" align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                        <tbody style="width:100%">
                          <tr style="width:100%">
                            <td colSpan="2" style="display:flex;justify-content:center;width:100%"><a href="https://ethnikaa.com/track/${value}" target="_blank" style="background-color:#e00707;padding:0px 0px;border-radius:3px;color:#FFF;font-weight:bold;border:1px solid rgb(0,0,0, 0.1);cursor:pointer;line-height:100%;text-decoration:none;display:inline-block;max-width:100%"><span><!--[if mso]><i style="letter-spacing: undefinedpx;mso-font-width:-100%;mso-text-raise:0" hidden>&nbsp;</i><![endif]--></span><span style="background-color:#e00707;padding:12px 30px;border-radius:3px;color:#FFF;font-weight:bold;border:1px solid rgb(0,0,0, 0.1);cursor:pointer;max-width:100%;display:inline-block;line-height:120%;text-decoration:none;text-transform:none;mso-padding-alt:0px;mso-text-raise:0">Track Order</span><span><!--[if mso]><i style="letter-spacing: undefinedpx;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table style="padding:45px 0 0 0" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                <tbody>
                  <tr>
                    <td><img src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/yelp-footer.png" width="620" style="display:block;outline:none;border:none;text-decoration:none" /></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size:12px;line-height:24px;margin:16px 0;text-align:center;color:rgb(0,0,0, 0.7)">© 2022 | Yelp Inc., 350 Mission Street, San Francisco, CA 94105, U.S.A. | www.yelp.com</p>
            </td>
          </tr>
        </table>
      </body>
    
    </html>`
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
        return info.response;
    }
});
  })

















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

      return res.status(200).json(body);
    });
  } catch (err) {
    
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
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname,'dist/index.html'),(err)=>{
    if(err){
      res.status(500).send(err);
    }
  })
	// res.json({status: "ok"})
})

// format celebrate paramater validation errors
app.use(formatCelebrateErrors)

app.listen(process.env.PORT || 5000, () => {
	console.log(`Listening on port ${process.env.PORT || 5000}`)
})