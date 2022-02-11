const express = require('express')
const TodoRouter = express.Router()
// /api/todos/
TodoRouter.route('/').get( (req, res) => {
    res.send('all todo list')
})

module.exports = TodoRouter