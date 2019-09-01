var mongoose=require('mongoose')

var Schema=mongoose.Schema

var schema_user=new Schema({
    username:String,
    usertel:String,
    userpwd:String,
    dbpwd:String,
    avatar:String
})

var user=mongoose.model('user',schema_user)
exports.user=user

var schema_hero=new Schema({
    heroid:String,
    name:String,
    alias:String,
    title:String,
    roles:Array
})

var hero=mongoose.model('hero',schema_hero)
exports.hero=hero

var schema_cart=new Schema({
    username:String,
    heroId:String,
    img:String,
    price:String,
    name:String,
    title:String
})

var herocart=mongoose.model('herocart',schema_cart)
exports.herocart=herocart


var schema_theme=new Schema({
    username:String,
    img:String,
    word:String,
    avatar:String,
    title:String,
    time:String,
    count:String
})

var theme=mongoose.model('theme',schema_theme)
exports.theme=theme


var schema_comment=new Schema({
    themeid:String,
    username:String,
    word:String,
    time:String,
    avatar:String
})

var comment=mongoose.model('comment',schema_comment)
exports.comment=comment






