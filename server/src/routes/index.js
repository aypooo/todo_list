const express = require('express')
const router = express.Router()//서브 라우터
const todo = require('./todo')

router.use('/todos', todo)// /api/todos/ =>todo 모듈을 실행하라 

module.exports = router