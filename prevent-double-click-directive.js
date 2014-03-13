/**
 * # Prevent Double Click
 *
 * This directive will prevent the user from double clicking on any element that support the disabled property (like a button).  It provide a event that when triggered, the button is re-enabled.
 *
 * ```html
 * <button nag-prevent-double-click="123">button</button>
 * ```
 *
 * @module nag.preventDoubleClick
 * @ngdirective nagPreventDoubleClick
 *
 * @nghtmlattribute {mixed} nag-prevent-double-click Unique identifier used in the event it listens to for removed the disabled state
 */
angular.module('nag.preventDoubleClick')
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
