var express = require('express')  
var bodyParser = require('body-parser')
var app = express()  
var path = require('path')

//引入mongoose模块，来连接数据库
var mongoose = require('mongoose')
//引入字段替换模块
var _ = require('underscore')

//加载movie模型
var movie = require('./models/movie')
var port = process.env.PORT||3000  

//连接本地的数据库，数据库名：ikan-movie
mongoose.connect('mongodb://localhost:27017/ikan-movie')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("ikan-movie db is connected")
    // we're connected!
});

app.set('views','./views/pages')
app.set('view engine','jade')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname + '/bower_components')))

app.listen(port, () => {
    console.log('ikan-movie start on port:' + port)
})

//请求首页
app.get("/",function(req,res){
    movie.fetch(function(err,movies){
        if(err){
            console.log(err)
        }
        res.render("index",
            {
                title: 'ikan-movie',
                message: 'ikan movie 首页',
                movies: movies
            }
        )
    })
   
})

//请求详情页
// 斜杠+id,这样可以通过 req.params.id 拿到id的值
app.get("/movie/:id", function (req, res) {
    var id = req.params.id
    movie.findById(id,function(err,movie){
        res.render("detail",
            {
                title: 'ikan-movie',
                message: 'ikan movie '+movie.title,
                movie: movie
            })
    })
})

//后台页面
app.get("/admin/movie", function (req, res) {
    res.render("admin",
        {
            title: 'ikan-movie',
            message: 'ikan movie 后台页',
            movie:{
                title:'',
                doctor:'',
                country:'',
                year:'',
                poster:'',
                flash:'',
                summary:'',
                language:''
            }
        }
    )
})
//详情页面点击修改按钮
app.get('admin/update/:id',function(req,res){
    var id = req.params.id
    if(id){
        Movie.findById(id,function(err,movie){
            res.render('admin',{
                title: 'ikan-movie',
                message: 'ikan movie 后台更新页',
                movie:movie
            })
        })
    }
})

//后台页面点击录入按钮提交数据到数据库
app.post('/admin/movie/new',function(req,res){
    var id = req.body.movie.id
    var movieObj = req.body.movie
    var _movie = null
    
    if (typeof(id) !== 'undefined'){
        movie.findById(id,function(err,movie){
            if(err){
                console.log(err)
            }
// 用post过来的电影数据替换掉旧的数据
//underscope的extend方法，用新对象的字段来替换掉对应的旧字段
//查询到的参数放在1位置，将要 post的参数放在第二个位置
            _movie = _.extend(movie,movieObj)
            
            //里面的回调中的movie是save后的
            _movie.save(function(err,movie){
                if(err){
                    console.log(err)
                }
                res.redirect('/movie/'+movie._id)
            })
        })
    }
    else{
        _movie = new movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary:movieObj.summary,
            flash:movieObj.flash
        })
        _movie.save(function(err,movie){
            if (err) {
                console.log(err)
            }
            res.redirect('/movie/' + movie._id)
        })
    }
})

//列表页
app.get("/admin/list", function (req, res) {
    movie.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }
        res.render("list",
            {
                title: 'ikan-movie',
                message: 'ikan movie 列表页',
                movies: movies
            }
        )
    })
})