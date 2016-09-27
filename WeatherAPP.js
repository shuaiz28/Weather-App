var app = angular.module("myApp", []);
app.controller("myController", function($scope, $http) {
	//Check current weather by city name
	$scope.checkCurByCity = function() {
		var city = $scope.cityName;
		if (city) {
			$http.get("http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=a30ebb5af6b78e566e1797db9855606e").then(function(response) {
				console.log(response);
				$scope.infoCurByCity = response.data;
				var iconId = $scope.infoCurByCity.weather[0].icon;
				showIcon(iconId,"#iconholderCity");
				jQuery("#curByCityPanelInfo").show();
			});
		} else {
			jQuery("#curByCityPanelInfo").hide();
		}
	}
	//Check current weather by lon & lat
	$scope.checkCurByLoc = function() {
		var lon = $scope.longitude;
		var lat = $scope.latitude;
		if (!lon || !lat) {
			jQuery("#curByLocPanelInfo").hide();
			return;
		} else {
			jQuery("#curByLocPanelInfo").show();
		}
		if (lon>=-180 && lon<=180 && lat>=-90 && lat<=90) {
			$scope.alertCurByLoc = "";
			$http.get("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=a30ebb5af6b78e566e1797db9855606e").then(function(response) {
				console.log(response.data);
				$scope.infoCurByLoc = response.data;
				var iconId = $scope.infoCurByLoc.weather[0].icon;
				showIcon(iconId,"#iconholderLoc");		
			});
		} else {
			jQuery("#curByLocPanelInfo").hide();
			$scope.alertCurByLoc = "Please input the valid longitude & latitude.";
		}
	}
	//Check current weather by zipcode
	$scope.checkCurByZip = function() {
		var zip = $scope.zipcode;
		if (!zip) {
			jQuery("#curByZipPanelInfo").hide();
			return;
		} else {
			jQuery("#curByZipPanelInfo").show();
		}
		//------   var regexp = /youregexp/;
		var regexp = /\d{5}([\-]\d{4})?/;
		if (zip.match(regexp)) {
			$scope.alertCurByZip = "";
			$http.get("http://api.openweathermap.org/data/2.5/weather?zip="+zip+",us&appid=a30ebb5af6b78e566e1797db9855606e").then(function(response) {
				console.log(response);
				$scope.infoCurByZip = response.data;
				var iconId = $scope.infoCurByZip.weather[0].icon;
				showIcon(iconId,"#iconholderZip");
			});
		} else {
			$scope.alertCurByZip = "Please input a valid U.S. zipcode.";
		}
	}
	//check weather forecast by city name
	$scope.checkForeByCity = function() {
		var city = $scope.foreCityName;
		if (city) {
			jQuery("#tabTmrwByCity").attr("class","active");
			jQuery("#tabdayAftTmrwByCity").attr("class","disactive");
			$http.get("http://api.openweathermap.org/data/2.5/forecast/daily?q="+city+"&cnt=2&appid=a30ebb5af6b78e566e1797db9855606e").then(function(response) {
				console.log(response.data);
				$scope.infoForeByCity = response.data;
				$scope.infoForeByCityListIndex = 0;
				var iconId = $scope.infoForeByCity.list[$scope.infoForeByCityListIndex].weather[0].icon;	
				showIcon(iconId,"#iconholderForeCity");
				jQuery("#foreByCityPanelInfo").show();
			});
		} else {
			jQuery("#foreByCityPanelInfo").hide();
		}
	}
	jQuery("#tmrwByCity").click(function() {
		$scope.infoForeByCityListIndex = 0;
		iconId = $scope.infoForeByCity.list[$scope.infoForeByCityListIndex].weather[0].icon;
		showIcon(iconId,"#iconholderForeCity");
		jQuery("#foreByCityPanelInfo").show();
		//Tell inside scope that some values are updtaeted and refresh the page
		$scope.$apply();
	})
	jQuery("#dayAftTmrwByCity").click(function() {
		$scope.infoForeByCityListIndex = 1;
		iconId = $scope.infoForeByCity.list[$scope.infoForeByCityListIndex].weather[0].icon;
		showIcon(iconId,"#iconholderForeCity");
		jQuery("#foreByCityPanelInfo").show();
		$scope.$apply();
	})			
	//check weather forecast by lon & lat
	$scope.checkForeByLoc = function() {
		var lon = $scope.foreLongitude;
		var lat = $scope.foreLatitude;
		if (!lon || !lat) {
			jQuery("#foreByLocPanelInfo").hide();
			return;
		} else {
			jQuery("#foreByLocPanelInfo").show();
		}
		if (lon>=-180 && lon<=180 && lat>=-90 && lat<=90) {
			$scope.alertForeByLoc = "";
			jQuery("#tabTmrwByLoc").attr("class","active");
			jQuery("#tabdayAftTmrwByLoc").attr("class","disactive");
			$http.get("http://api.openweathermap.org/data/2.5/forecast/daily?lat="+lat+"&lon="+lon+"&cnt=2&mode=json&appid=a30ebb5af6b78e566e1797db9855606e").then(function(response) {
				console.log(response.data);
				$scope.infoForeByLoc = response.data;
				$scope.infoForeByLocListIndex = 0;
				var iconId = $scope.infoForeByLoc.list[$scope.infoForeByLocListIndex].weather[0].icon;
				showIcon(iconId,"#iconholderForeLoc");
			});
		} else {
			jQuery("#foreByLocPanelInfo").hide();
			$scope.alertForeByLoc = "Please input the valid longitude & latitude.";
		}
	}
	jQuery("#tmrwByLoc").click(function() {
		$scope.infoForeByLocListIndex = 0;
		iconId = $scope.infoForeByLoc.list[$scope.infoForeByLocListIndex].weather[0].icon;
		showIcon(iconId,"#iconholderForeLoc");
		jQuery("#foreByLocPanelInfo").show();
		//Tell inside scope that some values are updtaeted and refresh the page
		$scope.$apply();
	})
	jQuery("#dayAftTmrwByLoc").click(function() {
		$scope.infoForeByLocListIndex = 1;
		iconId = $scope.infoForeByLoc.list[$scope.infoForeByLocListIndex].weather[0].icon;
		showIcon(iconId,"#iconholderForeLoc");
		jQuery("#foreByLocPanelInfo").show();
		$scope.$apply();
	})				
});

//show the weather icon
function showIcon(iconId, iconholder) {
	var iconUrl = "http://openweathermap.org/img/w/"+iconId+".png";
	jQuery(iconholder).html("<img src='"+iconUrl+"'/>");
	//alert(iconId);
}

jQuery(document).ready(function() {
	jQuery("#curByCityPanel").hide();
	jQuery("#curByLocPanel").hide();
	jQuery("#curByZipPanel").hide();
	jQuery("#curByCityPanelInfo").hide();
	jQuery("#curByLocPanelInfo").hide();
	jQuery("#curByZipPanelInfo").hide();

	jQuery("#foreByCityPanel").hide();
	jQuery("#foreByLocPanel").hide();
	jQuery("#foreByCityPanelInfo").hide();
	jQuery("#foreByLocPanelInfo").hide();

	//show current weather info when checking by city name
	jQuery("#curByCity").click(function() {
		jQuery("#curByLocPanel").hide();
		jQuery("#curByZipPanel").hide();
		jQuery("#curByCityPanelInfo").hide();
		jQuery("#curByLocPanelInfo").hide();
		jQuery("#curByZipPanelInfo").hide();
		
		jQuery("#foreByCityPanel").hide();
		jQuery("#foreByLocPanel").hide();
		jQuery("#foreByCityPanelInfo").hide();
		jQuery("#foreByLocPanelInfo").hide();

		jQuery("#curByCityPanel").show();
	});

	////show current weather info when checking by lon & lat
	jQuery("#curByLoc").click(function() {
		jQuery("#curByCityPanel").hide();
		jQuery("#curByZipPanel").hide();
		jQuery("#curByCityPanelInfo").hide();
		jQuery("#curByLocPanelInfo").hide();
		jQuery("#curByZipPanelInfo").hide();
		
		jQuery("#foreByCityPanel").hide();
		jQuery("#foreByLocPanel").hide();
		jQuery("#foreByCityPanelInfo").hide();
		jQuery("#foreByLocPanelInfo").hide();

		jQuery("#curByLocPanel").show();
	});

	//show current weather info when checking by zipcode
	jQuery("#curByZip").click(function() {
		jQuery("#curByCityPanel").hide();
		jQuery("#curByLocPanel").hide();
		jQuery("#curByCityPanelInfo").hide();
		jQuery("#curByLocPanelInfo").hide();
		jQuery("#curByZipPanelInfo").hide();

		jQuery("#foreByCityPanel").hide();
		jQuery("#foreByLocPanel").hide();
		jQuery("#foreByCityPanelInfo").hide();
		jQuery("#foreByLocPanelInfo").hide();

		jQuery("#curByZipPanel").show();
	});

	//show weather forecast info when checking by city name
	jQuery("#foreByCity").click(function() {
		jQuery("#curByCityPanel").hide();
		jQuery("#curByLocPanel").hide();
		jQuery("#curByZipPanel").hide();
		jQuery("#curByCityPanelInfo").hide();
		jQuery("#curByLocPanelInfo").hide();
		jQuery("#curByZipPanelInfo").hide();
			
		jQuery("#foreByLocPanel").hide();
		jQuery("#foreByCityPanelInfo").hide();
		jQuery("#foreByLocPanelInfo").hide();

		jQuery("#foreByCityPanel").show();
	});

	//show weather forecast info when checking by lon & lat
	jQuery("#foreByLoc").click(function() {
		jQuery("#curByCityPanel").hide();
		jQuery("#curByLocPanel").hide();
		jQuery("#curByZipPanel").hide();
		jQuery("#curByCityPanelInfo").hide();
		jQuery("#curByLocPanelInfo").hide();
		jQuery("#curByZipPanelInfo").hide();
		
		jQuery("#foreByCityPanel").hide();
		jQuery("#foreByCityPanelInfo").hide();
		jQuery("#foreByLocPanelInfo").hide();
		
		jQuery("#foreByLocPanel").show();	
	});
});
