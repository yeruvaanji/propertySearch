const express = require("express");
const { User, Property } = require("./model");
const nodemailer = require('nodemailer');

const router = express.Router();
const sgMail = require('@sendgrid/mail');
//sgMail.setApiKey('giK3qH34R5KtHkGRcZmLgA');
 sgMail.setApiKey('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');
// Register Route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password,phoneNumber, userType } = req.body;

  try {
    const newUser = new User({ firstName, lastName, email,password, phoneNumber, userType });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Property Routes

router.post('/newProperty', async (req, res) => {
  const newProperty = new Property(req.body);
  newProperty.save()
    .then(() => res.json('Property added!'))
    .catch(err => res.status(500).json('Error: ' + err));
});

router.get('/property/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(400).json({ msg: 'Not found the property' });
    }
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/list-properties', async (req, res) => {

  try {
      const propertyList = await Property.find();
    if (!propertyList) {
      return res.status(400).json({ msg: 'Not found the property' });
    }
    res.json(propertyList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a property
router.delete('/deleteProperty/:id', (req, res) => {
  Property.findByIdAndDelete(req.params.id)
    .then(() => res.json('Property deleted!'))
    .catch(err => res.status(500).json('Error: ' + err));
});

// Update a property
router.put('/updateProperty/:id', (req, res) => {
  Property.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json('Property updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Get property By sellerID
router.get('/getSellerInfo', async (req, res) => {
    const { email } = req.query;
    // console.log('request email query', req.body,req.query);
  try {
      const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//like a property
router.put('/updateLike/:id', (req, res) => {
  Property.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json('Property likes count updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/sendEmail', (req, res) => {
  // Extract buyer and seller information from the request body
  const { buyerName, buyerEmail, sellerName, sellerEmail, propertyDetails } = req.body;

//   // Set up Nodemailer transporter
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'anjireddyy77@gmail.com',
//       pass: 'Baby@@123',
//     },
//   });

//   // Compose email for buyer
  const buyerMailOptions = {
    from: 'anjireddyy77@gmail.com',
    to: buyerEmail,
    subject: 'Property Interest Confirmation',
    html: `<p>Hello ${buyerName},</p><p>Thank you for your interest in the property.</p><p>Contact the seller at ${sellerEmail} for more details.Below are some of the property details ${propertyDetails}</p>`,
  };

  // Compose email for seller
  const sellerMailOptions = {
    from: 'anjireddyyeruva23@gmail.com',
    to: sellerEmail,
    subject: 'Buyer Interest Notification',
    html: `<p>Hello ${sellerName},</p><p>${buyerName} is interested in your property.</p><p>Contact them at ${buyerEmail} for further discussion.Below is the liked property details ${propertyDetails}</p>`,
  };

//   // Send emails
//   transporter.sendMail(buyerMailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send('Error sending email to buyer');
//     } else {
//       console.log('Email sent: ' + info.response);
//       // Send email to seller after buyer's email is sent
//       transporter.sendMail(sellerMailOptions, (error, info) => {
//         if (error) {
//           console.log(error);
//           res.status(500).send('Error sending email to seller');
//         } else {
//           console.log('Email sent: ' + info.response);
//           res.status(200).send('Emails sent successfully');
//         }
//       });
//     }
    //   });
//     const msg = {
//   to: 'recipient-email@example.com',
//   from: 'yeruvadurga@gmail.com',
//   subject: 'Subject of your email',
//   text: 'Body of your email',
//   html: '<strong>HTML version of your email</strong>',
// };

sgMail.send(buyerMailOptions)
  .then(() => {
    console.log('Email sent');
  })
  .catch((error) => {
    console.error(error);
  });
sgMail.send(sellerMailOptions)
  .then(() => {
    console.log('Email sent');
  })
  .catch((error) => {
    console.error(error);
  });
});

module.exports = router;
