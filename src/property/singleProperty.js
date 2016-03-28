export default function($scope, $http, $stateParams, $rootScope, Auth) {

    $scope.tab = { main: false, todo: false, real: true, about: false };
    var id = $stateParams.id;
    console.log($stateParams.id);
    var zipcode = '94110';

    $scope.model = {
        images: [
            'http://placehold.it/400x300',
            'http://placehold.it/400x300',
            'http://placehold.it/400x300',
            'http://placehold.it/400x300'
        ]
    };

    $scope.selected = [true, false, false, false];
    $scope.current = 0;

    var numbers = [1, 2, 3, 4];

    $scope.housePrice = 590000;
    $scope.interest = 0.03;
    $scope.downPayment = 100000;
    $scope.year = '15';

    $scope.monthPayment = Math.floor(($scope.housePrice - $scope.downPayment) * Math.pow((1 + parseFloat($scope.interest)), parseInt($scope.year)) / parseInt($scope.year) / 12);
    $scope.dataChange = function() {
        // body...
        $scope.monthPayment = Math.floor(($scope.housePrice - $scope.downPayment) * Math.pow((1 + parseFloat($scope.interest)), parseInt($scope.year)) / parseInt($scope.year) / 12);
    };

    $scope.changeCurrent = function(index) {
        $scope.selected = [false, false, false, false];
        $scope.current = index;
        $scope.selected[$scope.current] = true;
        // body...
    };

    $scope.next = function() {
        console.log('next');
        console.log('current: ' + $scope.current);
        if ($scope.current < 3) {
            $scope.selected = [false, false, false, false];
            $scope.current++;
            $scope.selected[$scope.current] = true;
        }
    };

    $scope.prev = function() {
        console.log('prev');
        if ($scope.current > 0) {
            $scope.selected = [false, false, false, false];
            $scope.current--;
            $scope.selected[$scope.current] = true;
        }
    }


    $scope.getSchoolRating = function() {
        $http({
            method: 'GET',
            url: '/properties/rating/' + zipcode
        }).then(function(response) {
            console.log(response);
            $scope.averageSchoolRating = response.data.average;
        }, function(err) {
            console.log(err);
        });
    };

    $scope.addProperty = function() {

        console.log($stateParams.id);
        $http({
            method: 'POST',
            url: '/addlist/' + $stateParams.id,
            data: { username: Auth.isLoggedIn() }
        }).then(function(response) {
            console.log(response.data);
            Auth.setUser(response.data.user);
        }, function(err) {
            console.log(err);
        });
    };

    $scope.getSchoolRating();
};

//http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=<ZWSID>&zpid=48749425