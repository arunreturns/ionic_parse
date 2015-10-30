// Ionic Starter App

angular.module('manager', ['ionic', 'manager.controllers', 'manager.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    Parse.initialize("DHIx1MpWf1DxU3TbI9cQXQjp4F6iqe4dYe221LBu", "H1Ll9BBtxv0YhKFfYfhWPPZmsRVymLSuZApWQ2a8");
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "views/tabs.html",
      controller: "TabsController" 
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "views/home_page.html",
          controller: 'EntryController'
        }
      }
    })
    .state('tabs.search', {
      url: "/search",
      views: {
        'search-tab': {
          templateUrl: "views/search_page.html",
          controller: 'SearchController'
        }
      }
    });
  $urlRouterProvider.otherwise('/tab/home');
})