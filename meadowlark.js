var express = require('express');
var app = express();
var fortune = require('./lib/fortune.js'); // './'告诉Node，不要到node_modules中查找这个模块



app.use(express.static(__dirname + '/public'));

//设置handlebars引擎
var handlebars = require('express3-handlebars').create({
    defaultLayout: 'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(function(req,res,next){
    res.locals.showTests = app.get('env') !== 'production' && req.query.test ==='1';
    next();
})

app.get('/', function (req, res) {
    // res.type('text/plain');
    // res.send('Meadowlark Travel');
    res.render('home');
});

app.get('/about', function (req, res) {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    })
});

//404 catch-all 处理器(中间件)
app.use(function (req, res) {
    res.status(404);
    // res.type('text/plain');
    // res.send('404 - Not Found');
    res.render('404');
});

//500错误处理器(中间件)
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    // res.type('text/plain');
    // res.send('500 - Server Error');
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.')
})