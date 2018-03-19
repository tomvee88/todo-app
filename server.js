const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append file');
        }
    });

    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    res.render('home', {
        welcomeMsg: 'Welcome!',
        msg: 'Welcome, users'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page'
    });
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});