var express = require('express')
var exphbs = require('express-handlebars')
var app = express();
var fs = require('fs')
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
var leaderboardData = require('./leaderboardData')

app.use(express.json())

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
    res.status(200).render('memory', {
        test: 'Memory',
        page: 'Memory Test',
        globalLeaderboard: leaderboardData.memory.globalLeaderboard,
        personalLog: leaderboardData.memory.personalLog
    })
})

app.post('/reaction/leaderboard', function(req, res, next) {
    console.log("req.body:", req.body)
    var name = req.body.name
    var score = req.body.score

    if (name && score) {
        leaderboardData.reaction.globalLeaderboard.push({
            name: name,
            score: score
        })

        fs.writeFile(
            __dirname + '/leaderboardData.json',
            JSON.stringify(leaderboardData, null, 2),
            function (err) {
                if (!err) {
                    res.status(200).send("Score was successfully stored.")
                } else {
                    res.status(500).send("Error storing score in DB.")
                }
            }
        )
    }
    else {
        res.status(400).send("Request body needs `url` and `caption`.")
    }
})

app.get('*', function(req, res, next) {
    res.status(200).render('404', {page: 'Human Benchmark Tests'})
})

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});