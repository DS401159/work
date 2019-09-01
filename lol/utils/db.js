var mongoose=require('mongoose')

var hostname='localhost'
var port=27017
var dbName='1908'

var url=`mongodb://${hostname}:${port}/${dbName}`

mongoose.connect(url,{useNewUrlParser:true})

var connection=mongoose.connection
connection.on('connect',()=>{
    console.log('数据库连接成功')
})

module.exports=connection