var express = require('express')
var app = express()
var path = require('path')
var port = process.env.PORT||3000

app.set('views','./views/pages')
app.set('view engine','pug')

app.use(express.static(__dirname + '/bower_components'))

app.get("/",(req,res)=>{
    res.render("index",
        {
            title:'ikan-movie',
            message:'ikan movie 首页'
        }
    )
})
app.listen(port,()=>{
    console.log('ikan-movie start on port:'+3000)
})
