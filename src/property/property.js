export default function($scope, $http, $rootScope, Auth, $location){
	
    $scope.tab = {main:false,todo:false,real:true,about:false};
	$scope.number = 3;
	$scope.properties = [];
	$scope.loading = false;

	$scope.getList = function(){
		$scope.loading = true;
		$scope.properties = [];
		$http({
			url: '/properties/' + $scope.input,
			method: 'GET'
		}).then(function(response){
			console.log(response.data.properties);
			$scope.properties = response.data.properties;
			$scope.loading = false;
		}, function(error){
			console.log(error);
			$scope.loading = false;
		});
	};

	$scope.checkLength = function(){
		if($scope.input.length === 5){
			$scope.getList();
		}
	};

};