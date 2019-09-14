var config = require('config.json');
var express = require('express');
var router = express.Router();
var questionsService = require('services/questions.service');

// routes
router.post('/create', createQuestion);
router.get('/list', listQuestions);
router.delete('/:_id', deleteQuestion);
router.put('/:_id', updateQuestion);


module.exports = router;
function createQuestion(req, res) {
    questionsService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function listQuestions(req,res){
    questionsService.list(req)
        .then(function (questions) {
            res.status(200).send(questions);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteQuestion(req,res){

 questionsService.delete(req.params._id)
    .then(function () {
        res.sendStatus(200);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}

function updateQuestion(req, res) {
    questionsService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}




