var mongoose = require('mongoose')
var movieSchema = new mongoose.Schema({
    title:String,
    doctor:String,
    language:String,
    country:String,
    summary:String,
    flash:String,
    poster:String,
    year:Number,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})

//添加一个 save方法，在每次存储数据之前都会调用 save 方法
movieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else{
        this.meta.updateAt = Date.now()
    }
    next()
})

movieSchema.statics = {
    fetch:function(cb){
        return this
        .find({})
        .sort('meta.updateAt')
        .exec(cb)
    },
    findById: function (id,cb) {
        return this
            .findOne({_id:id})
            .exec(cb)
    }
}
module.exports = movieSchema