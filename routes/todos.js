var express = require('express');
const createError = require('http-errors');
var router = express.Router();

const todos = [{ id: 1, name: 'Do Something', completed: false }]

/* GET todos listing. */
router.get('/', function (req, res, next) {
  res.json(todos);
});

router.get('/:id', function (req, res, next) {
  const todo = todos.find(todo => todo.id == req.params.id)

  if (!todo) {
    return next(createError(404, 'Not Found'))
  }

  res.json(todo)
})

router.post('/', function (req, res, next) {
  const { body } = req

  if (typeof body.name !== 'string') {
    return next(createError(400, 'Validation Error'))
  }
    
  const todo = {
    id: todos.length + 1,
    name: body.name,
    completed: false
  }

  todos.push(todo)

  res.status(201).json(todo)
})

module.exports = router;
