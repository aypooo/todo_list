const { response } = require('express')
const express = require('express')
const TodoRouter = express.Router()
const Todo = require("../../models/Todo")//정의한 모델 가져오기
// /api/todos/
TodoRouter.route('/').get(async(req, res) => {
    const todos = await Todo.find()
    res.json({status:200,todos})//함수 리턴과 동일함
})
// /api/todos/{id}
TodoRouter.route('/:id').get((req,res)=>{
    Todo.findById(req.params.id,(err,todo)=>{
        if(err) throw err
        res.json({status:200,todo})
    })
})
// /api/todos
TodoRouter.route('/:id').put((req,res)=>{
    Todo.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,todo)=>{
        if(err) throw err;
        res.json({status:204,msg:`todo${req.params.id} updated in db !`, todo})
    })
})
TodoRouter.route('/').post((req,res)=>{
    console.log(`name:${req.body.name}`)
    //데이터베이스 접속 후 데이터 찾기 =>
    Todo.findOne({name:req.body.name, done:false}, async (err,todo) => {
        if(err) throw err
        if(!todo){//생성하려는 할일과 동일한할일이 데이터베이스에 없음
            //생성하면 됨
            const newTodo = new Todo(req.body)// 할일 생성
            await newTodo.save().then( (err,todo) =>{
                res.json({ status:201, msg:"new todo created is db",todo})
            })
        }else {
            const msg = "this todo already exists in db"
            res.json({status:204,msg})
        }
    })
    // res.send(`todo ${req.body.name},${req.body.age}created`)
})

TodoRouter.route('/:id').delete( (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, todo) => {
        if(err) throw err;
        res.json({ status: 204, msg: `todo ${req.params.id} removed in db !`})
    })
})


module.exports = TodoRouter