angular.module('sortApp', [])

    .controller('mainController', function ($scope, $http) {
        $scope.sortType = 'name'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.searchFish = '';     // set the default search/filter term

        // create the list of sushi rolls

        $http.get('src/people.json').success(function (data) {
            $scope.sushi = data;
        });

    });