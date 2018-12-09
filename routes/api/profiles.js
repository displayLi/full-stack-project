const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const router = express.Router()

require('../../models/Profile')
const Profile = mongoose.model('profiles')

// validator 验证
const isProfile = require('../../verification/isProfile')

// 引入响应头 
const msg = require('../../public/msg')


/* =====================================================*
 * 添加数据接口 POST
 * 添加数据
 * Address: http://api.link97.com:8085/profile/add
 * 参数: types、details、income、expend、account、remarks
 * Type:String
 * income、expend、account 这三个参数必须是字符串类型的数字 
 *=====================================================*/

router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { err, isValid } = isProfile(req.body);
    if (!isValid) {
        return msg(res, 0, '出现错误!', 200, err)
    }

    const datas = {
        types: req.body.types,
        details: req.body.details,
        income: req.body.income,
        expend: req.body.expend,
        account: req.body.account,
        remarks: req.body.remarks,
        user: req.user._id
    }
    new Profile(datas)
        .save()
        .then(isok => {
            return msg(res, 1, '数据添加成功!', 200, isok)
        })
        .catch(err => console.log(err))
})



/* =====================================================*
 * 查询数据接口 POST
 * 获取所有用户的全部数据
 * Address: http://api.link97.com:8085/profile/getAll
 * 参数: null
 * Type:null
 *=====================================================*/
router.post('/getAll', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.find()
        .sort({ date: 'desc' })
        .then(result => {
            if (result) {
                return msg(res, 1, '查询成功!', 200, result)
            }
        })
        .catch(err => msg(res, 0, '查询失败!', 200, {}))
})


/* =====================================================*
 * 编辑数据接口 POST
 * 编辑数据
 * Address: http://api.link97.com:8085/profile/edit
 * 参数: types、details、income、expend、account、remarks、id
 * Type:String
 * income、expend、account 这三个参数必须是字符串类型的数字
 *=====================================================*/

router.post('/edit', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { err, isValid } = isProfile(req.body);

    if (!isValid) {
        return msg(res, 0, '出现错误!', 200, err)
    }

    if (!req.body.id) {
        return msg(res, 0, '参数Id不能为空!', 200, {})
    }

    const datas = {
        types: req.body.types,
        details: req.body.details,
        income: req.body.income,
        expend: req.body.expend,
        account: req.body.account,
        remarks: req.body.remarks,
        user: req.user._id
    }

    Profile.findById(req.body.id)
        .then(data => {
            if (data.user == req.user._id.toString()) {
                Profile.findOneAndUpdate({ _id: req.body.id }, { $set: datas }, { new: true })
                    .then(data => {
                        return msg(res, 1, '修改成功!', 200, data)
                    })
                    .catch(err => msg(res, 0, '参数Id错误，编辑失败!', 200, {}))
            } else {
                return msg(res, 0, '不是当前用户，非法操作!', 200, {})
            }
        })
        .catch(err => msg(res, 0, '未查询到数据，编辑失败!', 200, {}))
})


/* =====================================================*
 * 删除数据接口 POST
 * 删除数据
 * Address: http://api.link97.com:8085/profile/delete
 * 参数: id
 * Type:String
 *=====================================================*/

router.post('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {

    if (!req.body.id) {
        return msg(res, 0, '参数Id不能为空!', 200, {})
    }

    Profile.findById(req.body.id)
        .then(data => {
            if (data.user == req.user._id.toString()) {
                Profile.findByIdAndRemove({ _id: req.body.id })
                    .then(removesData => {
                        removesData.save()
                            .then(removes => msg(res, 1, '删除成功!', 200, removes))
                    })
                    .catch(err => msg(res, 0, '参数Id错误，删除失败!', 200, {}))
            } else {
                return msg(res, 0, '不是当前用户，非法操作!', 200, {})
            }
        })
        .catch(err => msg(res, 0, '未查询到数据，删除失败!', 200, {}))
})


module.exports = router