
(function() {
    'use strict';

    angular
        .module('app.skill')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listSkill',
                config: {
                    url: '/skill',
                    templateUrl: 'app/skill/views/list.html',
                    controller: 'SkillController',
                    controllerAs: 'vm',
                    title: 'List Skills',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-folder-open"></i> Skills'
                    }
                }
            },
            {
                state: 'viewSkill',
                config: {
                    url: '/skill/:id',
                    templateUrl: 'app/skill/views/view.html',
                    controller: 'SkillController',
                    controllerAs: 'vm',
                    title: 'View Skill'
                }
            },
            {
                state: 'editSkill',
                config: {
                    url: '/skill/:id/edit',
                    templateUrl: 'app/skill/views/edit.html',
                    controller: 'SkillController',
                    controllerAs: 'vm',
                    title: 'Edit Skill'
                }
            }
        ];
    }
})();
