// JavaScript Document

/* ======= Restaurant Model =======
 * Creates Restaurant object with Knockoutjs observables
 * Location is saved as lat,lng object to help facilitate
 * creation of map markers through Google Maps API later.
 * Category must match one of the Cuisines in order for 
 * drop-down sort to work. Selected controls the data-bind
 * for the css selector that highlights the last clicked
 * restaurant in the listview.
 */
var Restaurant = function (data) {
    "use strict";
    this.id = data.id;
    this.name = data.name;
    this.location = {
        lat: data.lat,
        lng: data.lng
    };
    this.category = data.category;
    this.marker = data.marker;
    this.selected = ko.observable(false);
};

/* ======= ViewModel ======= */

var ViewModel = function () {

    "use strict";

    // preserve the ViewModel binding context as a variable
    var self = this;

    // initialize state of list toggle button and list visibility
    this.buttonState = ko.observable("Hide List");
    this.listVisible = ko.observable(true);

    // create empty KnockoutJS ObservableArray to hold Restaurants
    this.restaurantList = ko.observableArray([]);

    // iterate over initialRestaurants data to load Restaurants into array
    initialRestaurants.forEach(function (restaurant) {
        self.restaurantList.push(new Restaurant(restaurant));
    });

    // set most recently-clicked Restaurant - initialize as 0
    // in array, currently "The Varsity"
    this.currentRestaurant = ko.observable(self.restaurantList()[0]);

    // create empty KnockoutJS ObservableArray to hold Cuisines
    this.cuisines = ko.observableArray([]);

    // iterate over initialCuisines data to load Cuisines into array
    initialCuisines.forEach(function (cuisine) {
        self.cuisines.push(cuisine);
    });

    // set currently selected cuisine - initialize as 0 or "All"
    this.selectedCuisine = ko.observable(self.cuisines()[0]);
    
    this.selectedCuisine.subscribe(function(cuisine) {
        console.log("The new cuisine type is " + cuisine);
        mapView.closeInfowindow();
    });

    // KnockoutJS computed function - data-binds to drop-down
    // select in HTML view. Filters restaurantList accordingly.
    this.filteredRestaurants = ko.computed(function () {
        if (self.selectedCuisine() === self.cuisines()[0]) {
            for (var i = 0; i < self.restaurantList().length; i++) {
                if (self.restaurantList()[i].marker) {
                    self.restaurantList()[i].marker.setVisible(true);
                }
            }
            return self.restaurantList();
        } else {
            for (var j = 0; j < self.restaurantList().length; j++) {
                if (self.restaurantList()[j].marker) {
                    self.restaurantList()[j].marker.setVisible(false);
                }
            }
            var selectedTemp = self.selectedCuisine();
            var filteredRestaurants = ko.utils.arrayFilter(self.restaurantList(), function (rest) {
                return rest.category === selectedTemp;
            });
            for (var k = 0; k < filteredRestaurants.length; k++) {
                if (filteredRestaurants[k].marker) {
                    filteredRestaurants[k].marker.setVisible(true);
                }
            }
            return filteredRestaurants;
        }
    });

    // First, clears any previously set highlight on restaurantList
    // by setting selected to false on all Restaurants. Then,
    // sets selected to true on data-bind click Restaurant.
    // Also calls populateInfoWindow to highlight map marker and
    // open infoWindow for clicked Restaurant.
    this.highlightRestaurant = function (restaurant) {
        for (var i = 0; i < self.restaurantList().length; i++) {
            self.restaurantList()[i].selected(false);
        }
        self.currentRestaurant(restaurant);
        self.currentRestaurant().selected(true);
        mapView.populateInfoWindow(self.currentRestaurant().marker, mapView.largeInfowindow);
    };

    this.toggleView = function () {
        if (self.listVisible()) {
            self.listVisible(false);
            self.buttonState("Show List");
        } else {
            self.listVisible(true);
            self.buttonState("Hide List");
        }
    };
};

// make it go!
var vm = new ViewModel();
ko.applyBindings(vm);
