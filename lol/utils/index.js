var crypto = require("crypto"); // node 模块 

// 加密函数  data 需要加密的字段 
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

// 解密 
function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
const keys = "wuhan1906";

exports.aesEncrypt = aesEncrypt;   // 加密
exports.aesDecrypt = aesDecrypt;   // 解密
exports.keys = keys;        // 密钥 


// token 验证

exports.checkLogin=function(req,res,next){
    if(req.path.indexOf("/vue")!=-1){
        if(req.path!='/vue/register'&&req.path!='/vue/login'){
            var client=req.headers['token']
            var server=req.session.token
            if(client){
                if(server){
                    if(client==server){
                        next()
                    }else{
                        res.json({
                            code:500,
                            msg:"token不匹配",
                            type:0,
                        })
                    }
                }else{
                    res.json({
                        code:500,
                        msg:"token已失效",
                        type:0,
                    })
                }
            }else{
                res.json({
                    code:500,
                    msg:"token不存在,请马上登录",
                    type:0,
                })
            }
        }else{
            next()
        }
    }else{
        next();
    }
    
}