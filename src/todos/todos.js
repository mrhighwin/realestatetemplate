export default function($scope, $http, $rootScope) {
    // console.log('todo list is working');
    $scope.tab = {main:false,todo:true,real:false,about:false};
    
    function Todo(input) {
        this.checked = false;
        this.description = input;
    };

    function getList(){
    	$http.get('/todos').success(response => {
    		$scope.todos = response.todos;
    	});
    };

    var fakeCreated = false;

    $scope.userInput = "";
    getList();

    $scope.formSubmit = function() {
        $http.post('/todos', {
            checked: false,
            description: $scope.userInput
        }).success(response => {
            $scope.userInput = "";
            fakeCreated = false;
            console.log(response);
            getList();
        });
    };

    $scope.checkItem = function(todo){
        $http.put('/todos/' + todo._id, {
            checked: !todo.checked
        }).success(response => {
            // console.log(response);
            console.log(todo.checked);
            getList();
        });
        // console.log(myForm.myInput.$dirty);
    };

    $scope.fakeLoad = function() {
        console.log($scope.userInput);
        if ($scope.userInput.length === 1 && fakeCreated === false) {
            var fakeTodo = new Todo($scope.userInput);
            $scope.todos.push(fakeTodo);
            fakeCreated = true;
        } else if ($scope.userInput.length === 1 && fakeCreated === true) {
            $scope.todos[$scope.todos.length - 1].description = $scope.userInput;
        } else if ($scope.userInput.length > 1) {
            $scope.todos[$scope.todos.length - 1].description = $scope.userInput;
        } else {
            $scope.todos.pop();
            fakeCreated = false;
        }
    };

    $scope.remove = function(todoToDelete) {
    	console.log(todoToDelete);
    	$http.delete('/todos/' + todoToDelete._id).success(response => {
    		console.log(response);
    		getList();
    	});
    };
}
