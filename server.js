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
        globalLeaderboard: getTop5(false),
        personalLog: leaderboardData.reaction.personalLog
    })
})

app.get('/memory', function (req, res) {
    res.status(200).render('memory', {
        test: 'Memory',
        page: 'Memory Test',
        globalLeaderboard: getTop5(true),
        personalLog: leaderboardData.memory.personalLog
    })
})

app.post('/reaction/leaderboard', function(req, res, next) {
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
                    res.status(200).send(getTop5(false))
                } else {
                    res.status(500).send("Error storing score in DB.")
                }
            }
        )
    }
    else {
        res.status(400).send("Request body needs `name` and `score`.")
    }
})

app.post('/memory/leaderboard', function(req, res, next) {
    var name = req.body.name
    var score = req.body.score

    if (name && score) {
        leaderboardData.memory.globalLeaderboard.push({
            name: name,
            score: score
        })

        fs.writeFile(
            __dirname + '/leaderboardData.json',
            JSON.stringify(leaderboardData, null, 2),
            function (err) {
                if (!err) {
                    res.status(200).send(getTop5(true))
                } else {
                    res.status(500).send("Error storing score in DB.")
                }
            }
        )
    }
    else {
        res.status(400).send("Request body needs `name` and `score`.")
    }
})

function sortResults(correct, leaderboard, memory) {
    if (memory){
    return leaderboard.memory.globalLeaderboard.sort(function(a, b) {
        return b[correct] - a[correct]
    })
    } else {
        return leaderboard.reaction.globalLeaderboard.sort(function (a, b) {
            return a[correct] - b[correct]
        })
    }
}

function getTop5(memory) {
    var leaderboardJson = fs.readFileSync(__dirname + '/leaderboardData.json', {
        encoding: 'utf-8'
    })
    leaderboardJson = sortResults('score', JSON.parse(leaderboardJson), memory)

    var sortedLeaderboard = leaderboardJson.splice(0, 5)

    return sortedLeaderboard
}

app.get('*', function(req, res, next) {
    res.status(200).render('404', {page: 'Human Benchmark Tests'})
})

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});
