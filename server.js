const express = require('express');
const path = require('path');
const app = express();
const PORT = 5050;

const products = [
  {
    id: 1,
    name: 'Organic Honey Jar',
    description: 'Pure organic honey collected from local farms.',
    price: 10.5,
    imageURL: 'stufs/Organic Honey Jar.png'
  },
  {
    id: 2,
    name: 'Wool Scarf',
    description: 'Warm and cozy wool scarf perfect for winter.',
    price: 25.0,
    imageURL: 'stufs/Wool Scarf.png'
  },
  {
    id: 3,
    name: 'Leather Journal',
    description: 'Hand-stitched leather journal with rustic paper.',
    price: 32.99,
    imageURL: 'stufs/Leather Journal.png'
  },
  {
    id: 4,
    name: 'Locally Roasted Coffee Beans',
    description: 'Freshly roasted coffee beans from a local roaster.',
    price: 18.75,
    imageURL: 'stufs/Locally Roasted Coffee Beans.png'
  },
  {
    id: 5,
    name: 'Ceramic Vase',
    description: 'Pure organic honey collected from local farms.',
    price: 10.5,
    imageURL: 'stufs/Ceramic Vase.png'
  },
  {
    id: 6,
    name: 'Goan Homemade Mixed Fruit Jam',
    description: 'Pure organic honey collected from local farms.',
    price: 10.5,
    imageURL: 'stufs/Goan Homemade Mixed Fruit Jam.png'
  },
  {
    id: 7,
    name: 'Organic Cotton Tote Bag',
    description: 'Pure organic honey collected from local farms.',
    price: 10.5,
    imageURL: 'stufs/Organic Cotton Tote Bag.png'
  },
   {
    id: 8,
    name: 'Handmade Coffee Mug',
    description: 'A beautifully handcrafted coffee mug made locally.',
    price: 15.99,
    imageURL: 'stufs/Handcrafted_Wooden_Bowl.png'
  }
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
