// JavaScript Document
/* jshint esversion:6 */

/* ======= Model ======= */

var Restaurant = function (id, name, lat, lng, category) {
    "use strict";
    this.id = id;
    this.name = name;
    this.location = {
        lat: lat,
        lng: lng
    };
    this.category = category;
};

/* ======= ViewModel ======= */

var ViewModel = function () {

    "use strict";
    var self = this;
    var map;
    var markers = [];

    self.restaurantList = ko.observableArray([
        new Restaurant("43e1f592f964a520cc2e1fe3", "The Varsity", 33.771648596496604, -84.38931849661414, "American"),
        new Restaurant("53a5f442498e192ea70e51bf", "Ladybird Grove & Mess Hall", 33.75968473532744, -84.36417242003067, "American"),
        new Restaurant("4a47cde3f964a52023aa1fe3", "Mary Mac's Tea Room", 33.772755145900604, -84.37990628388033, "American"),
        new Restaurant("4387a580f964a520062b1fe3", "The Vortex Bar & Grill", 33.779067072239236, -84.38439846038818, "American"),
        new Restaurant("40e5f700f964a520100a1fe3", "Joe's on Juniper", 33.783213691244676, -84.38229560852051, "American"),
        new Restaurant("4a54d8b7f964a5205bb31fe3", "Tin Drum Asian Kitchen", 33.825598, -84.364861, "Chinese"),
        new Restaurant("4aa2f4e0f964a520bf4220e3", "Hsu's Chinese Food", 33.75956512767296, -84.38608767603405, "Chinese"),
        new Restaurant("4a38371ef964a520cf9e1fe3", "Fortune Cookie", 33.82655117374547, -84.3328543209997, "Chinese"),
        new Restaurant("4a9b2018f964a520803420e3", "Little Bangkok", 33.81585054624896, -84.3525194643487, "Chinese"),
        new Restaurant("4a5a37d9f964a520ecb91fe3", "Chin Chin", 33.80255946152492, -84.4131821776038, "Chinese"),
        new Restaurant("4af21075f964a52098e521e3", "Bistro Niko", 33.84654832641648, -84.36867751315688, "French"),
        new Restaurant("546d31ad498e774b5c87fc8b", "Le Bilboquet", 33.83786774371116, -84.38049495279441, "French"),
        new Restaurant("428a8580f964a52088231fe3", "Carroll Street Cafe", 33.74894384196275, -84.36804663948855, "French"),
        new Restaurant("4ba04120f964a520686437e3", "The Sound Table", 33.754204706274386, -84.3718118100296, "French"),
        new Restaurant("4c8ec3b5d68c6dcbd617ffa1", "Der Biergarten", 33.761880986766215, -84.3966481089592, "German"),
        new Restaurant("50ee4908e4b0793e2a2814ac", "Crumley Burgers And Brewskis", 33.739655926716495, -84.38401304158316, "German"),
        new Restaurant("50e4e4cae4b0c88a511f0f0e", "Summerhill Schnitzelhaus", 33.73968769076406, -84.38404878612383, "German")
    ]);

    self.currentRestaurant = ko.observable(self.restaurantList()[0]);

    self.cuisines = ["All", "American", "Chinese", "French", "German"];

    self.selectedCuisine = ko.observable(self.cuisines[0]);

    self.filteredRestaurants = ko.computed(function () {
        if (self.selectedCuisine() === self.cuisines[0]) {
            return self.restaurantList();
        } else {
            return ko.utils.arrayFilter(self.restaurantList(), function (rest) {
                return rest.category === self.selectedCuisine();
            });
        }
    });

    self.selectedCuisine.subscribe(function (newCuisine) {
        if (newCuisine === self.cuisines[0]) {
            self.displayMarkers(0, 16);
        } else if (newCuisine === self.cuisines[1]) {
            self.displayMarkers(0, 4);
        } else if (newCuisine === self.cuisines[2]) {
            self.displayMarkers(5, 9);
        } else if (newCuisine === self.cuisines[3]) {
            self.displayMarkers(10, 13);
        } else if (newCuisine === self.cuisines[4]) {
            self.displayMarkers(14, 16);
        }
    });

    self.initMap = function () {
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
            self.map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 33.7582458,
                    lng: -84.3885123
                },
                zoom: 15,
                styles: styles,
                mapTypeControl: false
            });
            var defaultIcon = self.makeMarkerIcon('0091ff');
            var len = vm.restaurantList().length;
            console.log("There are " + vm.restaurantList().length + " restaurants in the list.");
            if (len > 0) {
                var bounds = new google.maps.LatLngBounds();
                for (var i = 0; i < len; i++) {
                    var position = vm.restaurantList()[i].location;
                    var title = vm.restaurantList()[i].title;
                    var marker = new google.maps.Marker({
                        position: position,
                        title: title,
                        animation: google.maps.Animation.DROP,
                        icon: defaultIcon,
                        id: i
                    });
                    marker.setMap(this.map);
                    markers.push(marker);
                    bounds.extend(marker.position);
                }
                this.map.fitBounds(bounds);
                console.log("There are " + markers.length + " markers in the list.");
            }
        },
        // This function takes in a COLOR, and then creates a new marker
        // icon of that color. The icon will be 21 px wide by 34 high, have an origin
        // of 0, 0 and be anchored at 10, 34).
        self.makeMarkerIcon = function (markerColor) {
            "use strict";
            var markerImage = new google.maps.MarkerImage(
                'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
                '|40|_|%E2%80%A2',
                new google.maps.Size(21, 34),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 34),
                new google.maps.Size(21, 34));
            return markerImage;
        },


        self.displayMarkers = function (start, stop) {
            "use strict";
            if (markers.length === 0) {
                return true;
            }
            for (var i = 0; i < start; i++) {
                markers[i].setMap(null);
            }
            for (i = start; i <= stop; i++) {
                markers[i].setMap(this.map);
            }
            for (i = stop + 1; i < 17; i++) {
                markers[i].setMap(null);
            }
        }
};

// make it go!
var vm = new ViewModel();
ko.applyBindings(vm);
