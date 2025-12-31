require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const nodemailer = require("nodemailer");


const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const User = require("./model/UserModel");
const authRoute = require("./Routes/AuthRoute");
const sendEmailRoute = require("./Routes/sendEmail");

const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URL;


const app = express();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Get from .env file
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Get from .env file
});


const corsOptions = {
  origin: ["https://onex-project.onrender.com", "https://onex-dashboard.onrender.com"] , // Ensure this matches your frontend URL
  credentials: true,  // Allow cookies and authorization headers
  methods: "GET,POST,PUT,DELETE",  // Allow specific HTTP methods
  allowedHeaders: "Content-Type,Authorization"  // Allow these headers
};

app.use(express.json());

app.use(cors(corsOptions));


/*app.get("/addHoldings", async (req, res) => {
     let tempHoldings = [
        {
          name: "BHARTIARTL",
          qty: 2,
          avg: 538.05,
          price: 541.15,
          net: "+0.58%",
          day: "+2.99%",
        },
        {
          name: "HDFCBANK",
          qty: 2,
          avg: 1383.4,
          price: 1522.35,
          net: "+10.04%",
          day: "+0.11%",
        },
        {
          name: "HINDUNILVR",
          qty: 1,
          avg: 2335.85,
          price: 2417.4,
          net: "+3.49%",
          day: "+0.21%",
        },
        {
          name: "INFY",
          qty: 1,
          avg: 1350.5,
          price: 1555.45,
          net: "+15.18%",
          day: "-1.60%",
          isLoss: true,
        },
        {
          name: "ITC",
          qty: 5,
          avg: 202.0,
          price: 207.9,
          net: "+2.92%",
          day: "+0.80%",
        },
        {
          name: "KPITTECH",
          qty: 5,
          avg: 250.3,
          price: 266.45,
          net: "+6.45%",
          day: "+3.54%",
        },
        {
          name: "M&M",
          qty: 2,
          avg: 809.9,
          price: 779.8,
          net: "-3.72%",
          day: "-0.01%",
          isLoss: true,
        },
        {
          name: "RELIANCE",
          qty: 1,
          avg: 2193.7,
          price: 2112.4,
          net: "-3.71%",
          day: "+1.44%",
        },
        {
          name: "SBIN",
          qty: 4,
          avg: 324.35,
          price: 430.2,
          net: "+32.63%",
          day: "-0.34%",
          isLoss: true,
        },
        {
          name: "SGBMAY29",
          qty: 2,
          avg: 4727.0,
          price: 4719.0,
          net: "-0.17%",
          day: "+0.15%",
        },
        {
          name: "TATAPOWER",
          qty: 5,
          avg: 104.2,
          price: 124.15,
          net: "+19.15%",
          day: "-0.24%",
          isLoss: true,
        },
        {
          name: "TCS",
          qty: 1,
          avg: 3041.7,
          price: 3194.8,
          net: "+5.03%",
          day: "-0.25%",
          isLoss: true,
        },
        {
          name: "WIPRO",
          qty: 4,
          avg: 489.3,
          price: 577.75,
          net: "+18.08%",
          day: "+0.32%",
        },
      ]

      tempHoldings.forEach((item) => {
        let newHolding = new HoldingsModel({
          name: item.name,
          qty: item.qty,
          avg: item.avg,
          price: item.price,
          net: item.day,
          day: item.day,
        })
        newHolding.save();
      });
      res.send("Done!");
    });
    */
    

    /* app.get("/addPositions", async (req, res) => {
       let tempPositions = [
         {
           product: "CNC",
           name: "EVEREADY",
           qty: 2,
           avg: 316.27,
           price: 312.35,
           net: "+0.58%",
           day: "-1.24%",
           isLoss: true,
         },
         {
           product: "CNC",
           name: "JUBLFOOD",
           qty: 1,
           avg: 3124.75,
           price: 3082.65,
           net: "+10.04%",
           day: "-1.35%",
           isLoss: true,
         },
       ];

       tempPositions.forEach((item) => {
         let newPosition = new PositionsModel({
           product: item.product,
           name: item.name,
           qty: item.qty,
           avg: item.avg,
           price: item.price,
           net: item.net,
           day: item.day,
           isLoss: item.isLoss,
         });

         newPosition.save();
       });
       res.send("Deepak It's Done!");
     }); */



app.get("/allHoldings", async (req, res) => {
let allHoldings = await HoldingsModel.find({});
res.json(allHoldings);
});
    
app.get("/allPositions", async (req, res) => {
let allPositions = await PositionsModel.find({});
res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,

  });

  newOrder.save();

  res.send("Order saved!");
});



// ✅ Route to place a new order

app.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Fetching user with ID:", userId); // ✅ Debugging

    const user = await User.findById(userId); // Fetch user from the database

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ email: user.email }); // ✅ Send back user email
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


/*app.post("/newOrder", async (req, res) => {
  try {
    let newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
      email: req.body.email,
    });
    newOrder.save();
    
    const { name, qty, price, mode, email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required to send confirmation." });
    }

    console.log("Order received:", { name, qty, price, mode, email });

    // ✅ Send confirmation email
    sendConfirmationEmail(email, name, qty, price, mode);

    res.status(200).json({ message: "Order placed & email sent successfully!" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to process order" });
  }
});

// ✅ Function to send email using Nodemailer
const sendConfirmationEmail = async (email, stockName, quantity, price, mode) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can also use other providers like SendGrid, Outlook, etc.
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail ID
        pass: process.env.EMAIL_PASS, // Your App Password (Not your Gmail password)
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Stock Purchase Confirmation",
      html: `
        <h2>Stock Purchase Successful</h2>
        <p><strong>Stock Name:</strong> ${stockName}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Price per Share:</strong> ₹${price}</p>
        <p><strong>Transaction Mode:</strong> ${mode}</p>
        <br/>
        <p>Thank you for trading with us!</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};*/

// Route to create an order
app.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // Convert to paisa (₹10 = 1000 paisa)
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to verify payment signature
app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === razorpay_signature ) {
    res.json({ success: true, message: "Payment verified" });
  } else {
    res.json({ success: false, message: "Payment verified" });
  }
});


app.use("/auth" , authRoute);
app.use(sendEmailRoute);


    
app.listen( PORT , () => {
    console.log("App Started");
    mongoose.connect(uri);
    console.log("DB connected");
});