'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'eventCtrl'
  });
}])

.controller('eventCtrl',["$scope","$http","$filter","$q",function($scope,$http,$filter,$q) {

        $scope.fetchDataOnLoad =  function() {
        var promiseArr = [];
        promiseArr.push($http({
            method:"GET",
            url:"/api/event",
            headers:{"Accept": "application/json"}
        }));

        $q.all(promiseArr).then(function(results){
            console.log(results);
            if (results) {
                for (var x in results) {
                    if (Object.prototype.hasOwnProperty.call(results,x)) {
                        for (var i = 0; i < results[x].data.length; i++) {
                            $scope.eventData.push(results[x].data[i]);
                        }
                    }
                }
            }
        },function(error){
        });
    };

    $scope.fetchDataOnLoad();

    $scope.eventData = [
        //{"title":"Event Title1","description":"Event Descriptssssssss","eventDate": "1234","type":"To be chosen"},
        //{"title":"Event Title2","description":"Event Description2","eventDate": "1234","type":"To be chosen"},
        //{"title":"Event Title3","description":"Event Description3","eventDate": "1234","type":"To be chosen"},
        //{"title":"Event Title4","description":"Event Description4","eventDate": "12111134","type":"To be chosen"},
        //{"title":"Event Title5","description":"Event Description5","eventDate": "1234","type":"To be chosen"},
        //{"title":"Event Title6","description":"Event Description6","eventDate": "1234","type":"To be chosen"}
    ];

    $scope.eventType = [
        "Children",
        "Animal",
        "Environment",
        "Elderly",
        "Physically",
        "Disabled",
        "Financial",
        "Difficulty",
        "Hidden",
        "Disabled (Blind and/or Deaf)",
        "Illness (Cancer Patients)",
        "Mentally Disabled Ex-Offenders"];

    $scope.createEvent = function(newEvent){
        var eventDataX={};
        var convertedDate = new Date($filter('date')(newEvent.myEventDate)).getTime();
        eventDataX.eventDate = convertedDate;
        eventDataX.type = newEvent.myEventType;
        eventDataX.description= newEvent.myEventDescription;
        eventDataX.title = newEvent.myEventTitle;
        var promiseArr = [];
        promiseArr.push($http({
            method:"POST",
            url:"/api/event",
            data:eventDataX,
            headers:{"Accept": "application/json"}
        }));

        $q.all(promiseArr).then(function(results){
            console.log(results);
            for (var x in results) {
                if (Object.prototype.hasOwnProperty.call(results,x)) {
                    $scope.eventData.push(results[x].data);
                }
            }
        },function(error){
        });
    };


}]);