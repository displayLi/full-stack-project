const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()

const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')

// body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 链接数据库
mongoose.connect('mongodb://localhost:27017/financial_system')
    .then(() => console.log(`MongoDB is Connected...`))
    .catch(err => console.log(err))


// 配置passport
require('./config/passport')(passport);

// 配置路由
app.use('/user', users)
app.use('/profile', profiles)

// 设置端口号
const port = 8084;

// 配置node服务地址
app.listen(port, '0.0.0.0', (req, res) => {
    console.log(`Server is running...\nAddress: http://localhost:${port}`)
})