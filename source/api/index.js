var app = require('express')();
var bodyParser = require('body-parser');
var cors = require('cors')

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:4200'
}));

const quotes = [
    { quoteNumber: 'Q123', description: 'This is random' },
    { quoteNumber: 'Q456', description: 'More rubbish' },
    { quoteNumber: 'Q789', description: 'blah blah' },
];

app.get('/quotes', (req, res) => res.json(data));

app.get('/products', (req, res) => {
    const products = [
        { id: 1, name: "Widgets", cost: 250.00, img: '' },
        { id: 2, name: "Sprockets", cost: 85.00, img: '' },
        { id: 3, name: "Doohickey", cost: 115.00, img: '' },
        { id: 4, name: "Thingy", cost: 25.00, img: '' },
        { id: 5, name: "Gizmo", cost: 175.00, img: '' }
    ];

    res.json(products);
});

app.listen(3000, () => console.log('Started. http://localhost:3000'))