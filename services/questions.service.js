var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('questions');

var service = {};

service.create = create;
service.list = list;
service.delete = _delete;
service.update = update;

module.exports = service;

function create(questionParam) {
    var deferred = Q.defer();
    // set question object to questionParam without the cleartext password
    var question = questionParam;
    db.questions.insert(
        question,
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
        });
    return deferred.promise;
}

function list(perguntas) {
    var deferred = Q.defer();
    // set question object to questionParam without the cleartext password
    db.questions.find().toArray(function(err, result){
        deferred.resolve(result);
        // perguntas.res.render('index', { perguntas : result });
    });
    return deferred.promise;    
}

function _delete(_id) {
    var deferred = Q.defer();

    db.questions.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function update(_id, questionParam) {
    var deferred = Q.defer();
    var set = {
        Question: questionParam.Question,
        Answer: questionParam.Answer,
    };

    db.questions.update(
        { _id: mongo.helper.toObjectID(_id) },
        { $set: set },
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });
    return deferred.promise;
}

