/*const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const router = express.Router();

router.post("/send-email", async (req, res) => {
  const { email, stockName, quantity, price, mode } = req.body;

  if (!email || !stockName || !quantity || !price || !mode) {
    console.log("⚠️ Missing required fields:", req.body);
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    console.log("📩 Preparing to send email to:", email);

    // ✅ Create transporter
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // ✅ Use `true` for SSL
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    // ✅ Verify connection to email server
    await transporter.verify();
    console.log("✅ Email transporter verified!");

    // ✅ Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Stock Purchase Confirmation - ${stockName}`,
      html: `
        <h2>Stock Purchase Confirmation</h2>
        <p>Dear Investor,</p>
        <p>You have successfully placed a <b>${mode} order</b> for <b>${quantity} shares</b> of <b>${stockName}</b> at <b>₹${price} per share</b>.</p>
        <p><b>Order Details:</b></p>
        <ul>
          <li><b>Stock:</b> ${stockName}</li>
          <li><b>Quantity:</b> ${quantity}</li>
          <li><b>Price:</b> ₹${price}</li>
          <li><b>Mode:</b> ${mode}</li>
        </ul>
        <p>Thank you for trading with us!</p>
        <p><i>Onex Stock Trading</i></p>
      `,
    };

    // ✅ Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${email}: ${info.response}`);

    res.status(200).json({ message: "Email sent successfully" });

  } catch (error) {
    console.error("❌ Error sending email:", error);

    // Check if it's an authentication issue
    if (error.response && error.response.includes("Invalid login")) {
      return res.status(500).json({ error: "Email authentication failed. Check EMAIL_USER and EMAIL_PASS." });
    }

    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;*/

/*const express = require("express");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
require("dotenv").config();

const router = express.Router();

// ✅ Initialize Mailgun client
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: "api", key: process.env.MAILGUN_API_KEY });

router.post("/send-email", async (req, res) => {
  const { email, stockName, quantity, price, mode } = req.body;

  if (!email || !stockName || !quantity || !price || !mode) {
    console.log("⚠️ Missing required fields:", req.body);
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    console.log("📩 Preparing to send email to:", email);

    // ✅ Mailgun email sending
    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `Onex Stock Trading <no-reply@${process.env.MAILGUN_DOMAIN}>`,
      to: "ashokupadhyay@gmail.com",
      subject: `Stock Purchase Confirmation - ${stockName}`,
      html: `
        <h2>Stock Purchase Confirmation</h2>
        <p>Dear Investor,</p>
        <p>You have successfully placed a <b>${mode} order</b> for <b>${quantity} shares</b> of <b>${stockName}</b> at <b>₹${price} per share</b>.</p>
        <p><b>Order Details:</b></p>
        <ul>
          <li><b>Stock:</b> ${stockName}</li>
          <li><b>Quantity:</b> ${quantity}</li>
          <li><b>Price:</b> ₹${price}</li>
          <li><b>Mode:</b> ${mode}</li>
        </ul>
        <p>Thank you for trading with us!</p>
        <p><i>Onex Stock Trading</i></p>
      `,
    });

    console.log("✅ Email sent successfully:", response);
    res.status(200).json({ message: "Email sent successfully" });

  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;*/

const express = require("express");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
require("dotenv").config();

const router = express.Router();
router.use(express.json());

// ✅ Initialize Mailgun client
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: "api", key: process.env.MAILGUN_API_KEY });

router.post("/send-email", async (req, res) => {
    const{name ,qty ,price ,mode  } = req.body;
    // ✅ Mailgun email sending
    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `Onex Stock Trading <no-reply@${process.env.MAILGUN_DOMAIN}>`,
      to: "ashokupadhyay8422@gmail.com",
      subject: `Stock Purchase Confirmation - ${name} `,
      html: `
        <h2>Stock Purchase Confirmation - ${name}</h2>
        <p>Dear Investor,</p>
        <p>You have successfully placed a <b>${mode} order</b> for <b>${qty} shares</b> of <b>${name}</b> at <b>₹${price} per share</b>.</p>
        <p><b>Order Details:</b></p>
        <ul>
          <li><b>Stock:</b> ${name}</li>
          <li><b>Quantity:</b> ${qty}</li>
          <li><b>Price:</b> ₹${price}</li>
          <li><b>Mode:</b> ${mode}</li>
        </ul>
        <p>Thank you for trading with us!</p>
        <p><i>Onex Stock Trading</i></p>
      `
    });
    console.log("✅ Email sent successfully:", response);
    res.status(200).json({ message: "Email sent successfully" });

  });

module.exports = router;