var express=require('express')
var router=express.Router()
var {user,hero,herocart,theme,comment}=require('../utils/schema')
var {aesEncrypt,aesDecrypt,keys}=require('../utils')
router.post('/register',(req,res)=>{
    var body=req.body
    user.findOne({
        $or:[
            {username:body.username},
            {usertel:body.usertel}
        ]
    },{}).then(result=>{
        if(result){
            res.json({
                code:200,
                msg:'用户名已存在',
                type:0
            })
        }else{
            user.insertMany(body).then(result=>{
                res.json({
                    code:200,
                    msg:'注册成功',
                    type:1
                })
            })
        }
    })
})

router.post('/login',(req,res)=>{
    var body=req.body
    user.findOne({
        $or:[
            {username:body.username},
            {usertel:body.username}
        ]
    },{}).then(result=>{
        if(result){
            if(result.userpwd==body.userpwd){
                var token=aesEncrypt(body.username,keys)
                req.session.token=token
                res.json({
                    code:200,
                    msg:'登录成功',
                    type:1,token
                })
            }else{
                res.json({
                    code:200,
                    msg:'密码不正确',
                    type:0
                })
            }
        }else{
            res.json({
                code:200,
                msg:'账号不存在',
                type:0
            })
        }
    })
})

var multer=require('multer')
var storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './static/avatar')
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+ file.originalname)
    }
})

var upload=multer({storage}).any()


router.post('/newavatar',(req,res)=>{
    var body=req.body
    var username=aesDecrypt(req.session.token,keys)
    theme.updateMany({username},{
        $set:{
            avatar:body.url
        }
    }).then(result=>{
        comment.updateMany({username},{
            $set:{
                avatar:body.url
            }
        }).then(result=>{
            res.json({
                msg:"头像更新成功",
                code:200,
                result
            })
        })
    })
})




router.post('/updateavatar',upload,(req,res)=>{
    var username=aesDecrypt(req.session.token,keys)
    var pic=req.files[0].path
    user.updateOne({username},{
        $set:{
            avatar:pic
        }
    }).then(result=>{
        res.json({
            msg:"头像上传成功",
            code:200,
            type:1,
            pic,
            result
        })
    })
})


router.post('/getavatar',(req,res)=>{
    var {username}=req.body
    user.findOne({username},{}).then(result=>{
        if(result.avatar){
            res.json({
                code:200,
                msg:'头像加载成功',
                avatar:result.avatar,
                type:1
            })
        }else{
            res.json({
                code:200,
                msg:'头像加载成功',
                avatar:null,
                type:0
            })
        }
    })
})


router.get('/herolist',(req,res)=>{
    var obj={}
    var {limit,keyword}=req.query
    if(keyword){
        obj={
            $or:[
                {title:new RegExp(keyword)},
                {name:new RegExp(keyword)}
            ]
        }
    }
    hero.find(obj,{}).sort({_id:1}).limit(limit).then(result=>{
        res.json({
            code:200,
            msg:'获取英雄列表成功',
            result
        })
    })
})

router.get('/herotype',(req,res)=>{
    hero.distinct('roles').then(result=>{
        res.json({
            code:200,
            msg:'获取英雄类型成功',
            result
        })
    })
})


router.post('/addcart',(req,res)=>{
    var body=req.body
    herocart.findOne({
        username:body.username,
        heroId:body.heroId
    }).then(result=>{
        if(result){
            res.json({
                code:200,
                msg:'该道具单次只能购买一件',
                type:0
            })
        }else{
            herocart.insertMany(body).then(result=>{
                res.json({
                    code:200,
                    msg:'添加购物车成功',
                    type:1,
                    result
                })
            })
        }
    })
})


router.get('/getcart',(req,res)=>{
    var query=req.query
    herocart.find(query).then(result=>{
        res.json({
            code:200,
            msg:'获取购物车列表成功',
            result
        })
    })
})

router.get('/delcart',(req,res)=>{
    var {arr}=req.query
    var obj=[]
    arr.forEach((item,index)=>{
        obj[index]=JSON.parse(item)
    })
    herocart.deleteMany({
        $or:obj 
    }).then(result=>{
        res.json({
            code:200,
            msg:'删除成功',
            result
        })
    })
})

router.post('/settheme',upload,(req,res)=>{
    var body=req.body
    var img=null
    if(req.files[0]){
        img=req.files[0].path
    }
    theme.insertMany({
        img,
        username:body.username,
        word:body.word,
        avatar:body.avatar,
        count:body.count,
        time:body.time
    },{}).then(result=>{
        res.json({
            code:200,
            msg:'发表成功',
            result
        })

    })
})

router.get('/gettheme',(req,res)=>{
    var {_id}=req.query
    var obj={}
    if(_id){
        obj._id=_id
    }
    theme.find(obj,{}).sort({_id:-1}).then(result=>{
        res.json({
            code:200,
            msg:'获取成功',
            result
        })
    })
})


router.post('/setcomment',(req,res)=>{
    var body=req.body
    comment.insertMany(body).then(result=>{
        res.json({
            code:200,
            msg:'评论成功',
            result
        })
    })
})


router.get('/getcomment',(req,res)=>{
    var query=req.query
    comment.find({themeid:query.themeid},{}).then(result=>{
        res.json({
            code:200,
            msg:'获取评论成功',
            result
        })
    })
})

router.post('/deltheme',(req,res)=>{
    var body=req.body
    theme.deleteOne({_id:body._id}).then(result=>{
        res.json({
            code:200,
            msg:'删除成功',
            result
        })
    })
})


router.post('/delcomment',(req,res)=>{
    var body=req.body
    comment.deleteOne({_id:body._id}).then(result=>{
        res.json({
            code:200,
            msg:'删除评论成功',
            result
        })
    })
})


module.exports=router