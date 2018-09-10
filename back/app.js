const express = require('express'),
    app = express(),
    path = require("path"),
    bodyParser = require('body-parser'),
    jsonParser = bodyParser.json();


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    next();
});
 
app.set('views', path.join(__dirname, ''));


var Worker = require('./models/worker')();

app.post('/api/Worker/add', jsonParser, (req, res) => {

    if (req.body.id == 0) {
        Worker.New(
            req.body.surname,
            req.body.name,
            req.body.patronymic,
            req.body.items,
            req.body.length,
            req.body.itogo,
            function (result, err) {
                res.json({
                    result
                })
            });
    } else {
        Worker.Update(
            req.body.surname,
            req.body.name,
            req.body.patronymic,
            req.body.items,
            req.body.length,
            req.body.itogo,
            req.body.id,
            function (result, err) {
                res.json({
                    result
                })
            });
    }
});

app.get('/api/Worker/select', (req, res) => {
    Worker.Select(
        function (result, err) {
            res.json({
                result
            })
        });
});
app.post('/api/Worker/get', jsonParser, (req, res) => {
    Worker.Get(
        req.body.id,
        function (result, err) {
            res.json({
                result
            })
        });
});
app.post('/api/Worker/delete', jsonParser, (req, res) => {
    Worker.Delete(
        req.body.id,
        function (result, err) {
            res.json({
                result
            })
        });
});


app.get('/dist/build.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist//build.js'));

});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));

});

app.listen(3000, () => console.log('Example app listening on port 3000!'))