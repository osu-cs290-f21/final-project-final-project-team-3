var express = require('express')
var exphbs = require('express-handlebars')
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.status(200).render('homePage')
})

app.get('/reaction', function(req, res) {
    res.status(200).render('reaction')
})

app.get('/memory', function(req, res) {
    res.status(200).render('memory')
})

app.get('*', function(req, res, next) {
    res.status(200).render('404')
})

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});