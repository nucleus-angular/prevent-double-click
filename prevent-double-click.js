angular.module('nag.preventDoubleClick', [])
.directive('nagPreventDoubleClick', [
  function(){
    return {
      restrict: 'EA',
      controller: [
        '$scope',
        function($scope) {
          this.unregisterBroadcast = null;

          $scope.$on('$destroy', function() {
            //if the scope is destroyed, we no longer need this broadcast to be registered
            if(_.isFunction(this.unregisterBroadcast)) {
              this.unregisterBroadcast();
            }
          });
        }
      ],
      require: ['nagPreventDoubleClick'],
      priority: 0,
      compile: function(element, attributes, transclude) {
        return function(scope, element, attributes, controllers) {
          this.unregisterBroadcast = scope.$on('unlock-prevent-double-click-' + attributes.nagPreventDoubleClick, function() {
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
