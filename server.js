// const express = require('express');
// const path = require('path');
// const { MongoClient } = require('mongodb');

// const app = express();
// const PORT = 3000;

// // Serve static files (like HTML) from the 'public' directory
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'public'));
// });
// // app.use(express.static(path.join(__dirname, 'public')));

// app.post('/api/orders')

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

//   // Handle POST requests to '/api/orders'
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));

// // Handle POST requests to '/api/orders'
// app.post('/api/orders', (req, res) => {
//    const { customerName, cakeFlavor, cakeSize } = req.body;

//   // Simulate processing and logging the received data
// console.log('Received Order:', { customerName, cakeFlavor, cakeSize });
// res.status(201).json({ message: 'Order received successfully!' });
//  });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public'));
// });
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
const uri = 'mongodb://admin:password@mongodb'; // Change this to your MongoDB connection string
const dbName = 'cake-orders'; // Change this to your database name

app.use(express.json());

// Handle POST requests to '/api/orders'
app.post('/api/orders', async (req, res) => {
  const { customerName, cakeFlavor, cakeSize } = req.body;

  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('orders');
    
    const result = await collection.insertOne({ customerName, cakeFlavor, cakeSize });
    await client.close();

    if (result.insertedCount === 1) {
      res.status(201).json({ message: 'Order placed successfully!' });
    } else {
      res.status(500).json({ error: 'Failed to place order' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
