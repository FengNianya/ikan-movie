var express = require('express')  //o
var bodyParser = require('body-parser')
var app = express()  //o
var path = require('path')
var port = process.env.PORT||8686  //o

app.set('views','./views/pages')
app.set('view engine','jade')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname + '/bower_components')))

app.listen(port, () => {
    console.log('ikan-movie start on port:' + port)
})


app.get("/",function(req,res){
    res.render("index",
        {
            title:'ikan-movie',
            message:'ikan movie 首页',
            movies: [
                {
                    title: '机械战警',
                    _id: 1,
                    poster: 'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=96d7f34770cf3bc7fc0dc5beb069d1c4/10dfa9ec8a136327930ecd79918fa0ec09fac79d.jpg'
                },
                {
                    title: '机械战警',
                    _id: 1,
                    poster: 'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=96d7f34770cf3bc7fc0dc5beb069d1c4/10dfa9ec8a136327930ecd79918fa0ec09fac79d.jpg'
                },
                {
                    title: '机械战警',
                    _id: 1,
                    poster: 'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=96d7f34770cf3bc7fc0dc5beb069d1c4/10dfa9ec8a136327930ecd79918fa0ec09fac79d.jpg'
                }
            ]
        }
    )
})

app.get("/movie/:id", function (req, res) {
    res.render("detail",
        {
            title: 'ikan-movie',
            message: 'ikan movie 详情页',
            movie:{
                doctor:'何塞',
                country:'美国',
                title:'机械战警',
                year:2014,
                poster:'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=96d7f34770cf3bc7fc0dc5beb069d1c4/10dfa9ec8a136327930ecd79918fa0ec09fac79d.jpg',
                language:'英语',
                flash:'http://player.youku.com/embed/XNjY3NDA2NjMy',
                summary:'《铁甲钢拳》是一部由梦工厂影业制作，迪士尼影业发行的科幻电影。影片由史蒂文·斯皮尔伯格监制，肖恩·利维执导，休·杰克曼、达科塔·高尤、伊万杰琳·莉莉和安东尼·麦凯等联袂出演。影片于2011年11月8日在中国内地上映。电影的故事是围绕未来世界的机器人拳击比赛展开的，讲述了一个饱含动作、梦想与亲情的励志故事。'
            }
        }
    )
})

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

app.get("/admin/list", function (req, res) {
    res.render("list",
        {
            title: 'ikan-movie',
            message: 'ikan movie 列表页',
            movies:[
                {
                    title:'机械战警',
                    _id:1,
                    doctor: '何塞',
                    country: '美国',
                    year: 2014,
                    poster: 'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=96d7f34770cf3bc7fc0dc5beb069d1c4/10dfa9ec8a136327930ecd79918fa0ec09fac79d.jpg',
                    language: '英语',
                    flash: 'http://player.youku.com/embed/XNjY3NDA2NjMy',
                    summary: '《铁甲钢拳》是一部由梦工厂影业制作，迪士尼影业发行的科幻电影。影片由史蒂文·斯皮尔伯格监制，肖恩·利维执导，休·杰克曼、达科塔·高尤、伊万杰琳·莉莉和安东尼·麦凯等联袂出演。影片于2011年11月8日在中国内地上映。电影的故事是围绕未来世界的机器人拳击比赛展开的，讲述了一个饱含动作、梦想与亲情的励志故事。'
                }
            ]
        }
    )
})