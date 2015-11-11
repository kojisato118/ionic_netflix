var list = angular.module('list', ['ionic']);

list.controller('ListCtrl', function($scope, $ionicGesture, $window, $interval) {
  this.items = [];
  for (var i = 0; i < 10; i++){
    this.items.push({id : i, image : "../img/image.png"});
  }
});

//http://codepen.io/shprink/pen/txliu
list.controller('GestureCtrl', function($scope, $ionicGesture, $window, $interval, $ionicScrollDelegate) {
  $scope.lastEventCalled = 'Try to Drag the content up, down, left or rigth';
  var element = angular.element(document.querySelector('#eventPlaceholder'));
  var events = [{
    event: 'dragup',
    text: 'You dragged me UP!'
  },{
    event: 'dragdown',
    text: 'You dragged me Down!'
  },{
    event: 'dragend',
    text: 'dragend!'
  }];

  angular.forEach(events, function(obj){
    $ionicGesture.on(obj.event, function (event) {
      //http://ionicframework.com/docs/api/service/$ionicScrollDelegate/
      //この辺適当
        var v = event.gesture.velocityY*30;
        if(event.gesture.direction == 'down'){
          v *= -1
        }
        console.log(event.gesture);

        if(event.type == 'dragend'){
          var count = 0;
          var decelerate = setInterval(function() {
            $ionicScrollDelegate.scrollBy(0, v, false)
            v *= 0.97
            count++;

            if (Math.abs(v) < 0.1) {
              clearInterval(decelerate);
            }
          }, 1);
        }else {
          $ionicScrollDelegate.scrollBy(0, v, false)
          $scope.$apply(function () {
            $scope.lastEventCalled = obj.text;
          });
        }
    }, element);
  });
});
