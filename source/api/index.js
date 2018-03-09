const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const memes = [
    // lotr
    { id: 1, category: 'lotr', template: "one-does-not-simply.png", top: "One does not simply", bottom: "Upgrade Angular" },
    { id: 2, category: 'lotr', template: "and-my-axe.jpg", top: "And my", bottom: "directive!" },
    { id: 3, category: 'lotr', template: "you-have-no-power-here.jpg", top: "Internet Explorer", bottom: "You have no power here!" },
    { id: 4, category: 'lotr', template: "elevenses.png", top: "What do you mean", bottom: "I have to choose a module loader?" },
    { id: 5, category: 'lotr', template: "legolas.jpg", top: "I hear the internet", bottom: "losing its mind" },
    { id: 5, category: 'lotr', template: "mine.jpg", top: "I should have", bottom: "used react!" },
    { id: 6, category: 'lotr', template: "not-this-day.jpg", top: "One day we'll support IE", bottom: "But not this day!" },
    { id: 7, category: 'lotr', template: "oh-no.png", top: "I have to use", bottom: "TypeScript" },
    { id: 8, category: 'lotr', template: "orc.jpg", top: "what do you mean", bottom: "there's no upgrade path?" },
    { id: 9, category: 'lotr', template: "survived.png", top: "We've done it...", bottom: "We configured WebPack" },
    { id: 10, category: 'lotr', template: "yes.jpg", top: "But... I like", bottom: "Java!" }
];

const categories = [
    { key: 'lotr', description: 'Lord of the Rings' },
    { key: 'sw', description: 'Star Wars' },
    { key: 'pr', description: 'Parks and Recreation' },
    { key: 'corgi', description: 'Corgies' }
];

const templates = {
    base_url: `public/images/`,
    lotr: [
        'and-my-axe.jpg',
        'elevenses.png',
        'legolas.jpg',
        'mine.jpg',
        'not-this-day.jpg',
        'oh-no.png',
        'one-does-not-simply.png',
        'orc.jpg',
        'survived.png',
        'yes.jpg',
        'you-have-no-power-here.jpg'
    ],
    sw: [],
    pr: [],
    corgi: [
        'IDrive.jpg',
        'battle.jpg',
        'corgidown.jpg',
        'maxderp.jpg',
        'mistake.jpg',
        'treats.jpg'
    ]
};

app.use(express.static('public'));

app.get('/categories', (req, res) => res.json(categories));
app.get('/templates', (req, res) => res.json(templates));
app.get('/memes', (req, res) => res.json(memes));

app.get('/memes/:category', (req, res) => {
    console.log(req.params.category);
    const filtered = memes.filter((meme) => meme.category === req.params.category);
    res.json(filtered);
});

app.post('/memes', (req, res) => {
    let meme = req.body();
    memes.push(meme);
});

app.listen(3000, () => console.log('Running on port 3000.'));