export default function($scope, $http) {
    $scope.tab = {main:false,todo:false,real:false,about:true};
    $scope.yearSelected = '1988';
    $scope.monthSelected = '4';
    $scope.daySelected = '15';

    $scope.year = new Array(100);
    for(var w = 0; w < 100; w++){
    	$scope.year[w] = 1915+w;
    }
    $scope.month = new Array(12);
    for(w = 0; w < 12; w++){
    	$scope.month[w] = w+1;
    }
    $scope.day = new Array(31);
    for(w = 0; w < 31; w++){
    	$scope.day[w] = w+1;
    }
    console.log($scope.year);

    $scope.tempArray = new Array(30);
    for (var i = 0; i < 30; i++) {
        $scope.tempArray[i] = new Array(30);
    }
    for (i = 0; i < 30; i++) {
        for (var j = 0; j < 30; j++) {
            $scope.tempArray[i][j] = false;
        }
    }

    $scope.dataChange = function () {
        console.log('datachanged');
        $scope.makeTable($scope.yearSelected, $scope.monthSelected, $scope.daySelected);
    }


    $scope.makeTable = function(year, month, day) {

        var first = new Date(year, month - 1, day);
        var now = new Date();

        var month = monthdiff(first, now);
        var row = Math.floor(month / 30);
        var col = month % 30;

        for (var k = 0; k < row; k++) {
            if (k !== row - 1) {
                for (var m = 0; m < 30; m++) {
                	$scope.tempArray[k][m] = true;
                }
            }else{
            	for(var n = 0; n < col; n++){
            		$scope.tempArray[k][n] = true;

            	}
            }
        }
    }

    // $scope.makeTable(1990, 3, 11);

    function daydiff(first, second) {
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }

    function monthdiff(first, second) {
        return Math.round((second - first) / (1000 * 60 * 60 * 24 * 30));
    }


};
