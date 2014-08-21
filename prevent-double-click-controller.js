angular.module('nag.preventDoubleClick')
.controller('NagPreventDoubleClickDCtrl', [
  '$scope',
  function($scope) {
    /**
     * Unregisters the callback tied to the trigger-auto-focus event
     *
     * @ngscope
     * @method unregisterFormResetEvent
     * @type function
     */
    $scope.unregisterPreventDoubleClickEvent = null;

    $scope.$on('$destroy', function() {
      //if the scope is destroyed, we no longer need this broadcast to be registered
      if(this.unregisterPreventDoubleClickEvent) {
        this.unregisterPreventDoubleClickEvent();
      }
    });
  }
]);
