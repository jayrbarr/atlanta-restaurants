// JavaScript Document


/* ======= Model ======= */


var Restaurant = function(data) {
    "use strict";
    this.title = ko.observable(data.title);
    this.location = ko.observable(data.location);
};

var restaurantsArray = [
    {
        title: 'Park Ave Penthouse',
        location: {
            lat: 40.7713024,
            lng: -73.9632393
        }
    }, {
        title: 'Chelsea Loft',
        location: {
            lat: 40.7444883,
            lng: -73.9949465
        }
    }, {
        title: 'Union Square Open Floor Plan',
        location: {
            lat: 40.7347062,
            lng: -73.9895759
        }
    }, {
        title: 'East Village Hip Studio',
        location: {
            lat: 40.7281777,
            lng: -73.984377
        }
    }, {
        title: 'TriBeCa Artsy Bachelor Pad',
        location: {
            lat: 40.7195264,
            lng: -74.0089934
        }
    }, {
        title: 'Chinatown Homey Space',
        location: {
            lat: 40.7180628,
            lng: -73.9961237
        }
    }];


/* ======= ViewModel ======= */

var ViewModel = function() {
    
    "use strict";
    
    var self = this;
    
    self.restaurantList = ko.observableArray([]);
    
    restaurantsArray.forEach(function(restItem){
        self.restaurantList.push( new Restaurant(restItem) );
    });
    
    self.currentRestaurant = ko.observable( self.restaurantList()[0] );
    
};

var mapView = {
    initMap: function () {
        "use strict";
        var map;
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
    }
};

// make it go!
ko.applyBindings(new ViewModel());
