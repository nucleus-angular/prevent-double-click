/**
 * Prevents double clicking on a button
 *
 * @module nag.preventDoubleClick
 * @ngdirective nagPreventDoubleClick
 */
angular.module('nag.preventDoubleClick', [])
.directive('nagPreventDoubleClick', [
  '$rootScope',
  function($rootScope){
    return {
      restrict: 'EA',
      controller: [
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
      ],
      require: ['nagPreventDoubleClick'],
      priority: 0,
      compile: function(element, attributes, transclude) {
        return function(scope, element, attributes, controllers) {
          /**
           * Will unlock the button
           *
           * @respondto NagPreventDoubleClick[attribute nag-prevent-double-click]/unlock
           * @eventlevel root
           */
          scope.unregisterPreventDoubleClickEvent = $rootScope.$on('NagPreventDoubleClick[' + attributes.nagPreventDoubleClick + ']/unlock', function() {
            unlockElement();
          });

          var lockElement = function(event) {
            element.attr('disabled', true);
          };

          var unlockElement = function(event) {
            element.removeAttr('disabled')
          };

          element.click(lockElement);
        }
      }
    }
  }
]);
