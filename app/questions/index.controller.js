(function () {
    'use strict';

    angular
        .module('app')
        .controller('Questions.IndexController', Controller);

    function Controller($window, QuestionsService, FlashService) {
        var vm = this;      
        vm.pergunta ={
            Question : "",
            Answer:""
        }
        vm.lista = [];

        vm.saveQuestion = function() {
            QuestionsService.Create(vm.pergunta).then(function () {
                FlashService.Success('question created');
                vm.pergunta = {};
                vm.listQuestion();
            })
        }
        vm.listQuestion = function() {
            QuestionsService.List(vm.lista).then(function (response) {
                vm.lista = response;
                angular.forEach(vm.lista, function(item){
                    item.edit=false;
                })

            });
        }
        vm.deleteQuestion = function(item) {
            QuestionsService.Delete(item._id)
            vm.listQuestion();
        }
        vm.updateQuestion = function(item) {
            QuestionsService.Update(item)
            vm.listQuestion();
        }
        initController();

        function initController() {
            // get current user
            vm.listQuestion();
        }
    }

})();