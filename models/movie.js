var mongoose = require('mongoose')
var movieSchema = require('../schemas/movie')
//编译生成Movie模型
var movie = mongoose.model('Movie',movieSchema)
module.exports = movie