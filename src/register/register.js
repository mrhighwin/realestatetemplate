export default function($scope, $http, $location, Auth) {

    $scope.registerUser = function() {
        console.log('Register User Triggered');
        $http({
            url: '/signup',
            method: 'POST',
            data: { username: $scope.username, password: $scope.password2 }
        }).then(function(response) {
            console.log(response.data);
            if (response.data.isAuthenticated) {
                Auth.setUser(response.data.user);
                console.log(Auth);
                $location.path('/');
            }
        }, function(error) {
            console.log(error);
        });
    };

    $scope.usernameValid = false;
    $scope.password1Valid = false;
    $scope.password2Valid = false;
    $scope.submitReady = true;
    $scope.password1 = '';
    $scope.password2 = '';

    $scope.checkPassword = function () {
    	// body...

    	if($scope.password1.length > 5){
    		$scope.password1Valid = true;
    	}else{
    		$scope.password1Valid = false;
    	}

    	if($scope.password1 === $scope.password2 && $scope.password1 !== ''){
    		$scope.password2Valid = true;
    	}else{
    		$scope.password2Valid = false;
    	}

    	if($scope.usernameValid && $scope.password1Valid && $scope.password2Valid){
    		$scope.submitReady = false;
    	}
    }

    $scope.checkUsername = function() {
        $http({
            url: '/checkuservalid/' + $scope.username,
            method: 'GET'
        }).then(function(response) {
            if (response.data.length === 0 ) {
                $scope.usernameValid = true;
            } else {
                $scope.usernameValid = false;
            }
        }, function(err) {
            console.log(err);
        });
    };
};