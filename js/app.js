// JavaScript Document
/* jshint esversion:6 */

/* ======= Model ======= */

var Restaurant = function (data) {
    "use strict";
    this.name = data.name;
    this.location = {
        lat: data.location.lat,
        lng: data.location.lng
    };
};

var Cuisine = function (name, category) {
    "use strict";
    this.name = name;
    this.category = category;
};

/* ======= ViewModel ======= */

var ViewModel = function () {

    "use strict";
    var self = this;
    var map;

    self.restaurantList = ko.observableArray([]);

    self.currentRestaurant = ko.observable(self.restaurantList()[0]);

    self.cuisines = [
        new Cuisine("All", "4bf58dd8d48988d14e941735,4bf58dd8d48988d145941735,4bf58dd8d48988d10c941735,4bf58dd8d48988d10d941735"),
        new Cuisine("American", "4bf58dd8d48988d14e941735"),
        new Cuisine("Chinese", "4bf58dd8d48988d145941735"),
        new Cuisine("French", "4bf58dd8d48988d10c941735"),
        new Cuisine("German", "4bf58dd8d48988d10d941735")
    ];

    self.selectedCuisine = ko.observable(self.cuisines[0]);

    const RESTURL = "https://api.foursquare.com/v2/venues/search?";

    self.setRestaurants = function (newCuisine) {
        $.getJSON(RESTURL, {
                ll: "33.7582458,-84.3885123",
                intent: "browse",
                radius: 10000,
                venuePhotos: 1,
                limit: 50,
                categoryId: newCuisine.category,
                client_id: "PP3RWERUTIA1OI3DNHTIKX4T2WSJ0L1UEXUXPEZ1Z2BFY2RM",
                client_secret: "FNI4MCR2USHA21HA4V0RHS3SFHZ4GXSHLMZACQESYYUKAODT",
                v: "20170801"
            },
            function (data) {
                self.restaurantList([]);
                $.each(data.response.venues, function (i, venue) {
                    self.restaurantList.push(new Restaurant(venue));
                });
            });
        /*        mapView.loadmarkers(self.restaurantList);
         */
    };

    self.selectedCuisine.subscribe(self.setRestaurants);

};

var mapView = {
    initMap: function () {
        "use strict";
        var styles = [{
            featureType: 'water',
            stylers: [{
                color: '#19a0d8'
            }]
        }, {
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [{
                color: '#ffffff'
            }, {
                weight: 6
            }]
        }, {
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#e85113'
            }]
        }, {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{
                color: '#efe9e4'
            }, {
                lightness: -40
            }]
        }, {
            featureType: 'transit.station',
            stylers: [{
                weight: 9
            }, {
                hue: '#e85113'
            }]
        }, {
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [{
                visibility: 'off'
            }]
        }, {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{
                lightness: 100
            }]
        }, {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{
                lightness: -100
            }]
        }, {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{
                visibility: 'on'
            }, {
                color: '#f0e4d3'
            }]
        }, {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [{
                color: '#efe9e4'
            }, {
                lightness: -25
            }]
        }];

        // Constructor creates a new map - only center and zoom are required.
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 33.7582458,
                lng: -84.3885123
            },
            zoom: 15,
            styles: styles,
            mapTypeControl: false
        });
        var defaultIcon = mapView.makeMarkerIcon('0091ff');
    },
    // This function takes in a COLOR, and then creates a new marker
    // icon of that color. The icon will be 21 px wide by 34 high, have an origin
    // of 0, 0 and be anchored at 10, 34).
    makeMarkerIcon: function (markerColor) {
        "use strict";
        var markerImage = new google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
            '|40|_|%E2%80%A2',
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(21, 34));
        return markerImage;
    }

};

// make it go!
var vm = new ViewModel();
ko.applyBindings(vm);
vm.setRestaurants(vm.selectedCuisine());
