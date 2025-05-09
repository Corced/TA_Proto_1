const express = require('express');
const app = express();
app.use(express.json());

// API endpoints
app.get('/api/products', (req, res) => {
    res.json({ products: "All products" });
});

app.get('/api/products/:id', (req, res) => {
    res.json({ product: `Product ${req.params.id}` });
});

app.post('/api/products', (req, res) => {
    // Create product logic
    res.status(201).json(req.body);
});

app.listen(3000, () => console.log('Server running'));