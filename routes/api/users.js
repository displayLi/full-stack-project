const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const passport = require('passport')

require('../../models/User')
const User = mongoose.model('users')

// validator 验证
const isRegister = require('../../verification/isRegister')
const isLogin = require('../../verification/isLogin')

// 引入响应头 
const msg = require('../../public/msg')

const { secretOrToken } = require('../../config/keys')

const router = express.Router()


/* =====================================================*
 * 注册接口 POST
 * 注册用户
 * Address: http://api.link97.com:8085/profile/register
 * 参数: name、email、password、management
 * Type:String
 * management 只接受两个值 ‘管理员’或‘员工’  string
 *=====================================================*/

router.post('/register', (req, res) => {
    const { err, isValid } = isRegister(req.body);
    if (!isValid) {
        return msg(res, 0, '出现错误!', 200, err)
    }

    User.findOne({ email: req.body.email })
        .then(data => {
            if (!data) {
                // 密码加密
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) throw err;

                        // 配置头像
                        const avatar = 'http:' + (gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' }))

                        const newUser = {
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            avatar,
                            management: req.body.management
                        }

                        // 存入数据库
                        new User(newUser)
                            .save()
                            .then(isok => msg(res, 1, '注册成功!', 200, isok))
                            .catch(err => console.log(err))
                    });
                });

            } else {
                return msg(res, 0, '该邮箱已被注册请更换邮箱!', 200, {})
            }
        })
})


/* =====================================================*
 * 登录接口 POST
 * 注册用户
 * Address: http://api.link97.com:8085/profile/login
 * 参数: email、password
 * Type:String
 *=====================================================*/

router.post('/login', (req, res) => {
    const { err, isValid } = isLogin(req.body);
    if (!isValid) {
        return msg(res, 0, '出现错误!', 200, err)
    }

    User.findOne({ email: req.body.email })
        .then(result => {
            if (result) {
                // token配置规则
                const rolu = {
                    userId: result.id,
                    management: result.management,
                    email: result.email,
                    avatar: result.avatar,
                    name: result.name,
                }
                // 生成token
                const token = 'Bearer ' + jwt.sign(rolu, secretOrToken, { expiresIn: 3600 });
                //  密码解密
                bcrypt.compare(req.body.password, result.password)
                    .then(isMath => {
                        if (isMath) {
                            return msg(res, 1, '登录成功!', 200, {
                                name: result.name,
                                email: result.email,
                                avatar: result.avatar,
                                management: result.management,
                                token,
                            })
                        }
                        return msg(res, 0, '密码输入错误，请重新输入!', 200, {})
                    })
                    .catch(err => console.log(err))
            } else {
                return msg(res, 0, '该用户不存在，请注册!', 200, {})
            }
        })
})


/* =====================================================*
 * 测试接口 POST
 * 测试token
 * Address: http://api.link97.com:8085/profile/test
 * 参数: token 
 * Type:String
 *=====================================================*/

router.post('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
    return msg(res, 1, 'token验证成功!', 200, req.user)
})



module.exports = router