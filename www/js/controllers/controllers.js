angular.module('manager.controllers', ['ionic'])
.controller('TabsController', ['$scope', '$log', function($scope, $log){
	
}])
.controller('EntryController', ['$scope','$log', '$ionicPopup', '$ionicLoading', function($scope, $log, $ionicPopup, $ionicLoading){
	$scope.entry = {};
	$scope.minDate = new Date();

	$scope.submitForm = function(){
		var Entry = Parse.Object.extend("Entry");
		var query = new Parse.Query(Entry);
		var newEntry = new Entry();	
		$ionicLoading.show({
			template: 'Saving...'
		});

		$scope.entry.paymentDate = new Date($scope.entry.paymentDate);
		query.equalTo("number", $scope.entry.number);
		query.first().then(function(result){
			$ionicLoading.hide();
			if (result) {
				var userName = result.toJSON().firstName + " " + result.toJSON().lastName;
				var alertPopup = $ionicPopup.alert({
					title: 'Error',
					template: 'The User Id is already used for ' + userName,
					okText: 'Let me Check!',
					okType: 'button-assertive'
				});
				alertPopup.then(function(res) {
					console.log('Please check the user number');
				});
			} else {
				newEntry.save($scope.entry , {
					success: function(savedEntry){

						$log.info("Entry is saved", savedEntry);
						$scope.entry = {};
						var alertPopup = $ionicPopup.alert({
							title: 'Success',
							template: 'The User is Saved successfully',
							okText: 'Cool',
							okType: 'button-balanced'
						});
						alertPopup.then(function(res) {
							console.log('Please check the user number');
						});
					} , 
					error: function(unsavedEntry, error) {
						$log.info('Failed to create new object, with error code: ' + error.message);
					}
				});
			}
		});
	};

	$scope.resetForm = function(){
		$scope.entry = {};
	};
}])
.controller('SearchController', ['$scope','$log','$ionicPopup','$ionicLoading', function($scope, $log, $ionicPopup, $ionicLoading){
	$scope.input = {};
	$scope.getUserData = function(){
		console.log($scope.input.inputName);
		var Entry = Parse.Object.extend("Entry");
		var query = new Parse.Query(Entry);
		var firstName = $scope.input.inputName.split(" ")[0];
		var lastName = $scope.input.inputName.split(" ")[1];
		$log.log("Querying for : ", firstName , lastName)
		query.equalTo("firstName", firstName);
		query.equalTo("lastName", lastName);
		$ionicLoading.show({
			template: 'Searching...'
		});
		query.first().then(function(result){
			$ionicLoading.hide();
			if (result) {
				$scope.data = result.toJSON();
			} else {
				$log.error("No users found");
				var alertPopup = $ionicPopup.alert({
					title: 'Error',
					template: 'The User is Not Found',
					okText: 'OK',
					okType: 'button-assertive'
				});
				alertPopup.then(function(res) {
					console.log('Please check the user number');
				});
			}
		});
	};

	$scope.resetData = function(){
		$scope.data = null;
		$scope.input = {};
	};
}])

