(function () {
    'use strict';

    angular
        .module('app')
        .factory('QuestionsService', Service);

    function Service($http, $q) {
        var service = {};

        service.Create = Create;
        service.List = List;
        service.Delete = Delete;
        service.Update = Update;

        return service;
        function Create(question) {
            return $http.post('/api/questions/create', question).then(handleSuccess, handleError);
        }

        function List(perguntas) {
            return $http.get('/api/questions/list', perguntas).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/questions/' + _id).then(handleSuccess, handleError);
        }

        function Update(question) {
            return $http.put('/api/questions/' + question._id, question).then(handleSuccess, handleError);
        }

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
