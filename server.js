var express = require('express')
var exphbs = require('express-handlebars')
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
var leaderboardData = require('./leaderboardData')

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.status(200).render('homePage', {page: 'Human Benchmark Tests'})
})

app.get('/reaction', function(req, res) {
    res.status(200).render('reaction', {
        test: 'Reaction',
        page: 'Reaction Test',
        globalLeaderboard: leaderboardData.reaction.globalLeaderboard,
        personalLog: leaderboardData.reaction.personalLog

    })
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