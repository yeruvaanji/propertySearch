const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const dbURI = 'mongodb+srv://yeruva_ydm:OwhtNjVIKtYZnY68@atlascluster.zjyibid.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Hello World');
});


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
