
(function () {
    'use strict';

    angular
        .module('app.skill')
        .controller('SkillController',  SkillController);

     SkillController.$inject = ['logger',
        '$stateParams',
        '$location',
        'TableSettings',
        'ngTableParams',
        'Api',];
    /* @ngInject */
    function  SkillController(logger,
        $stateParams,
        $location,
        TableSettings,
        ngTableParams,
        Api
        ) {

        var vm = this;
      
        vm.skills = [];
        vm.tableParams =   new ngTableParams( );//TableSettings.getParams( Skill);
        vm.skill = {};
       
     
        activate();

        function activate() {
            if(!$stateParams.id){
                vm.tableParams.settings({dataset: vm.skills});
                getSkills();
            };
        }
        
        vm.toEditSkill = function(){
            Api.getSkillForEdit($stateParams.id).then(function(data) {  
                 vm.skill = data
                 
            });
        }
        
         vm.toViewSkill = function(){
            Api.getSkill($stateParams.id).then(function(data) {  
                  vm.skill = data
            });
        }
        
        function getSkills() {
            return Api.getSkills()
                .then(function(data) {
                    vm.skills = data;
                    logger.info('Activated  Skills View');
                    return vm.skills;
                });
        }
        
        
        
      
        
       
        vm.create = function() {
            /* if(!vm.skill.id )
                vm.skill.dob = "1988-11-01";*/
        };
        
        vm.remove = function( skill){
            return Api.removeSkill( skill).then(function (data){  
                logger.success('Skill Deleted');
                $location.path('skill');
            });
        }
 
        vm.update = function() {
        	var msg = 'updated';
            if(!vm.skill.id ){
                vm.create();
                msg = 'created';
            }
        
            return Api.saveSkill(vm.skill).then(function (data){  
                logger.success('Skill ' + msg);
                $location.path('skill/' + data.id);
            });
        };
    
    }

})();
