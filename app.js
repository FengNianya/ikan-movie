var express = require('express')

//express的中间件，旧版本express内置了此模块，新版express需要单独安装。
//此中间件用于格式化表单提交的数据
var bodyParser = require('body-parser')

//创建一个exress实例
var app = express()

//node内置的模块
var path = require('path')
//日期和时间格式化插件，在list页面中格式化日期
app.locals.moment = require('moment');

//引入mongoose模块，来连接数据库
var mongoose = require('mongoose')
//引入字段替换模块
var _ = require('underscore')

//加载Movie模型
var Movie = require('./models/movie')

//设置默认端口3000，并可以从命令行传端口号参数
var port = process.env.PORT||3000  

//连接本地的数据库，数据库名：ikan-movie
mongoose.connect('mongodb://localhost:27017/ikan-movie')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("ikan-movie db is connected")
});

//设置页面试图入口文件夹
app.set('views','./views/pages')
//设置试图引擎模板
app.set('view engine','jade')

//格式化表单提交数据
app.use(bodyParser.urlencoded({ extended: true }))

//通过node内置的path模块，设置公共静态资源目录
app.use(express.static(path.join(__dirname + '/public')))

//监听端口
app.listen(port, ()=>{
    console.log('ikan-movie start on port:' + port)
})

//请求首页
app.get("/",function(req,res){
    Movie.fetch(function(err,movies){
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
//get：params
//post:body
//delete:delete
app.get("/movie/:id", function (req, res) {
    var id = req.params.id
    Movie.findById(id,function(err,movie){
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
app.get('/admin/update/:id',function(req,res){
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

//详情页删除按钮
app.delete('/admin/list',function(req,res){
    var id = req.query.id
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if(err){
                console.log(err)
            }
            else{
                res.json({success:1})
            }
        })
    }
})

//后台页面点击录入按钮提交数据到数据库
app.post('/admin/movie/new',function(req,res){
    var id = req.body.movie.id
    var movieObj = req.body.movie
    var _movie = null

//这里有bug，不能修改已经存在的数据。
//未解决bug
    if (id !== undefined){
        Movie.findById(id,function(err,movie){
            if(err){
                console.log(err)
            }
// 用post过来的电影数据替换掉旧的数据
//underscope的extend方法，用新对象的字段来替换掉对应的旧字段
//查询到的参数放在第一个位置，将要 post的参数放在第二个位置
            _movie = _.extend(movie,movieObj)
            
            //里面的回调中的movie是save后的
            _movie.save(function(err,movie){
                if(err){
                    console.log(err)
                }
                res.redirect('/movie/'+movie._id)  //edited
            })
        })
    }
    else{
        _movie = new Movie({
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
    Movie.fetch(function (err, movies) {
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