// JavaScript Document
/* jshint esversion:6 */

/* ======= Model ======= */

var Restaurant = function(data) {
    "use strict";
    this.name = ko.observable(data.name);
    this.location = ko.observable({
        lat: data.location.lat,
        lng: data.location.lng    
    });
};

/* ======= ViewModel ======= */

var ViewModel = function() {
    
    "use strict";
    
    var self = this;
    
    self.restaurantList = ko.observableArray([]);
    
    const RESTURL = "https://api.foursquare.com/v2/venues/search?ll=33.7582458, -84.3885123&intent=browse&radius=24140&venuePhotos=1&client_id=PP3RWERUTIA1OI3DNHTIKX4T2WSJ0L1UEXUXPEZ1Z2BFY2RM&client_secret=FNI4MCR2USHA21HA4V0RHS3SFHZ4GXSHLMZACQESYYUKAODT&v=20170801&categoryId=4bf58dd8d48988d14e941735";
    
    $.getJSON(RESTURL, function(data) {
        $.each( data.response.venues, function (i,venue) {
           self.restaurantList.push( new Restaurant(venue)); 
        });
    } );
              
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
