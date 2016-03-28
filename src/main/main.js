export default function($scope, $rootScope, $http, Auth) {
    $scope.tab = { main: true, todo: false, real: false, about: false };
    console.log('main here');
    $scope.test = 10;
    $scope.user = Auth.isLoggedIn();


    console.log(Auth.isLoggedIn().propertyList);

    //Binding between models. Hell yea!!!
    $scope.$watch(Auth.isLoggedIn, function() {
        $scope.savedProperties = Auth.isLoggedIn().propertyList;
        $scope.user = Auth.isLoggedIn();
    });

    $scope.$watch(Auth.isLoggedIn().propertyList, function() {
        $scope.savedProperties = Auth.isLoggedIn().propertyList;
    });



};