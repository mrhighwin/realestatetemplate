export default function($scope, $location, $rootScope, $http, Auth) {
    //initiate the value fist
    $scope.signinform = true;

    $scope.$watch(Auth.isLoggedIn, function(newValue, oldValue) {
        if (!newValue && oldValue){
            console.log('User Logged out!');
            $scope.signinform = true;
            $scope.user = {};
            $location.path('/');
        }else if(newValue){
            console.log('Logged In! The user is : ' + Auth.isLoggedIn());
            $scope.user = Auth.isLoggedIn();
            $scope.signinform = false;
        }
    });
    // console.log(Auth);

    $scope.signin = function() {
        console.log('signin clicked');
        console.log('username: ' + $scope.username);
        console.log('password: ' + $scope.password);
        if (!$rootScope.isAuthenticated) {
            $http({
                url: '/login',
                method: 'POST',
                data: { password: $scope.password, username: $scope.username }
            }).then(function(response) {
                console.log(response.data);
                //This set the Auth service
                if (response.data.isAuthenticated) {
                    Auth.setUser(response.data.user);
                }
                console.log("Current user: ");
                console.log(Auth.curUser());

                $scope.signinform = false;
                $location.path('/');
            }, function(error) {
                console.log(error);
            }); // body...
        }
    };

    $scope.logout = function() {
        $http({
            url: '/logout',
            method: 'GET'
        }).then(function(response) {
            console.log(response.data);
            Auth.logout();
        }, function(error) {
            console.log(error);
        });
    };


};
