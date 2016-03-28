var mongoose = require('mongoose');
var Todo = require('../db/db').Todo;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    Todo.find(function(err, results) {
        if (err) { console.log(err); }

        res.send({ todos: results });
    })
});

router.post('/', function(req, res) {
    var todo = new Todo(req.body);
    todo.save(function(err) {
        if (err) { console.log(err); }

        console.log('Saved');
        res.send('Success');
    });
});

router.put('/:id', function(req, res) {
    var id = req.params.id;
    Todo.update({ _id: mongoose.Types.ObjectId(id) }, {
        $set: { checked: req.body.checked }
    }, function(err) {
        if (err) { console.log(err); }
        res.send('Updated Success');
    });
})


router.delete('/:id', function(req, res) {
    var id = req.params.id;
    Todo.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
        if (err) {
            console.log(err);
        }

        res.send('Todo Deleted succuss');
    });
});

module.exports = router;
