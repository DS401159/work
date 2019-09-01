const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

var connection=require('../utils/db')
const session = require("express-session");
app.use(session({
    secret:"test",
    name:"appTest",
    cookie:{maxAge:60*60*1000},  // session 记录数据的时长 
    resave:false,
    saveUninitialized:true
  }))

var {checkLogin}=require('../utils')
app.use(checkLogin)

app.use(express.json());     // from-data 
app.use(express.urlencoded({ extended: false }));   // x-www-form-urlencoded  获取 POST 请求 获取 参数数据

var router=require('./vue')
app.use('/vue',router)

start()
