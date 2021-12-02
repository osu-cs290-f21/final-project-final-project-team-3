var express = require('express')
var exphbs = require('express-handlebars')
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.status(200).render('homePage', {page: 'Human Benchmark Tests'})
})

app.get('/reaction', function(req, res) {
    res.status(200).render('reaction', {page: 'Reaction Test'})
})

app.get('/memory', function(req, res) {
    res.status(200).render('memory', {page: 'Memory Test'})
})

// app.get('leaderboard', function(req, res) {
//     res.status(200).render('leaderboard', {page: 'Leaderboards'})
// })

app.get('*', function(req, res, next) {
    res.status(200).render('404', {page: 'Human Benchmark Tests'})
})

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});