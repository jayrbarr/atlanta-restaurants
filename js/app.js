// JavaScript Document

/* ======= Restaurant Data =======
 * These hard-coded restaurants were pulled from the Foursquare API
 * They could also be introduced through a live API get but for
 * purposes of this assignment, they were input directly.
 * The id param is the Foursquare id for the restaurant venue
 * which is crucial to the live get for the photo infowindow later.
 * The subscribe for
 * selectedCuisine must be modified as cuisines and restaurants
 * are added to the hard-coded data.
 * Restaurants should be sorted by cuisine type to make range-bound
 * selection and display of markers simpler and code-compliant.
 */

var initialRestaurants = [{
    id: "43e1f592f964a520cc2e1fe3",
    name: "The Varsity",
    lat: 33.771648596496604,
    lng: -84.38931849661414,
    category: "American"
}, {
    id: "53a5f442498e192ea70e51bf",
    name: "Ladybird Grove & Mess Hall",
    lat: 33.75968473532744,
    lng: -84.36417242003067,
    category: "American"
}, {
    id: "4a47cde3f964a52023aa1fe3",
    name: "Mary Mac's Tea Room",
    lat: 33.772755145900604,
    lng: -84.37990628388033,
    category: "American"
}, {
    id: "4387a580f964a520062b1fe3",
    name: "The Vortex Bar & Grill",
    lat: 33.779067072239236,
    lng: -84.38439846038818,
    category: "American"
}, {
    id: "40e5f700f964a520100a1fe3",
    name: "Joe's on Juniper",
    lat: 33.783213691244676,
    lng: -84.38229560852051,
    category: "American"
}, {
    id: "4a54d8b7f964a5205bb31fe3",
    name: "Tin Drum Asian Kitchen",
    lat: 33.825598,
    lng: -84.364861,
    category: "Chinese"
}, {
    id: "4aa2f4e0f964a520bf4220e3",
    name: "Hsu's Chinese Food",
    lat: 33.75956512767296,
    lng: -84.38608767603405,
    category: "Chinese"
}, {
    id: "4a38371ef964a520cf9e1fe3",
    name: "Fortune Cookie",
    lat: 33.82655117374547,
    lng: -84.3328543209997,
    category: "Chinese"
}, {
    id: "4a9b2018f964a520803420e3",
    name: "Little Bangkok",
    lat: 33.81585054624896,
    lng: -84.3525194643487,
    category: "Chinese"
}, {
    id: "4a5a37d9f964a520ecb91fe3",
    name: "Chin Chin",
    lat: 33.80255946152492,
    lng: -84.4131821776038,
    category: "Chinese"
}, {
    id: "4af21075f964a52098e521e3",
    name: "Bistro Niko",
    lat: 33.84654832641648,
    lng: -84.36867751315688,
    category: "French"
}, {
    id: "546d31ad498e774b5c87fc8b",
    name: "Le Bilboquet",
    lat: 33.83786774371116,
    lng: -84.38049495279441,
    category: "French"
}, {
    id: "428a8580f964a52088231fe3",
    name: "Carroll Street Cafe",
    lat: 33.74894384196275,
    lng: -84.36804663948855,
    category: "French"
}, {
    id: "4ba04120f964a520686437e3",
    name: "The Sound Table",
    lat: 33.754204706274386,
    lng: -84.3718118100296,
    category: "French"
}, {
    id: "4c8ec3b5d68c6dcbd617ffa1",
    name: "Der Biergarten",
    lat: 33.761880986766215,
    lng: -84.3966481089592,
    category: "German"
}, {
    id: "50ee4908e4b0793e2a2814ac",
    name: "Crumley Burgers And Brewskis",
    lat: 33.739655926716495,
    lng: -84.38401304158316,
    category: "German"
}, {
    id: "50e4e4cae4b0c88a511f0f0e",
    name: "Summerhill Schnitzelhaus",
    lat: 33.73968769076406,
    lng: -84.38404878612383,
    category: "German"
}];

/* ======= Cuisines Data ======
 * Hard-coded data for cuisines selection in drop-down
 * selector. Additional cuisines can be easily added to
 * drop-down and then also included in category of 
 * initialRestaurants (Restaurant) data.
 * "All" must remain in 0 position for filteredRestaurants function
 * in ViewModel to work correctly. The subscribe for
 * selectedCuisine must be modified as cuisines and restaurants
 * are added to the hard-coded data.
 */

var initialCuisines = ["All", "American", "Chinese", "French", "German"];

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
    this.id = ko.observable(data.id);
    this.name = ko.observable(data.name);
    this.location = ko.observable({
        lat: data.lat,
        lng: data.lng
    });
    this.category = ko.observable(data.category);
    this.selected = ko.observable(false);
};

/* ======= ViewModel ======= */

var ViewModel = function () {

    "use strict";

    // preserve the ViewModel binding context as a variable
    var self = this;

    // global array to hold map markers for ViewModel and Maps API
    var markers = [];

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

    // KnockoutJS computed function - data-binds to drop-down
    // select in HTML view. Filters restaurantList accordingly.
    this.filteredRestaurants = ko.computed(function () {
        if (self.selectedCuisine() === self.cuisines()[0]) {
            return self.restaurantList();
        } else {
            return ko.utils.arrayFilter(self.restaurantList(), function (rest) {
                return rest.category() === self.selectedCuisine();
            });
        }
    });

    // Sets KnockoutJS subscribe on selectedCuisine to 
    // display the associated map markers for selected cuisine.
    this.selectedCuisine.subscribe(function (newCuisine) {
        if (newCuisine === self.cuisines()[0]) {
            self.displayMarkers(0, 16);
        } else if (newCuisine === self.cuisines()[1]) {
            self.displayMarkers(0, 4);
        } else if (newCuisine === self.cuisines()[2]) {
            self.displayMarkers(5, 9);
        } else if (newCuisine === self.cuisines()[3]) {
            self.displayMarkers(10, 13);
        } else if (newCuisine === self.cuisines()[4]) {
            self.displayMarkers(14, 16);
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
        var index = self.restaurantList().indexOf(self.currentRestaurant());
        self.populateInfoWindow(markers[index], self.largeInfowindow);
    };

    /* =======  Map =======
     * Functions for Google Maps API to control Google Map and
     * map markers for app.
     */

    // Callback function for Google Maps API initialization
    this.initMap = function () {
        // Styles array to control map appearance.
        // Used below in initial maps call.
        // Adapted from course code, New York Listings
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
                lat: 33.7582458, // downtown Atlanta
                lng: -84.3885123
            },
            zoom: 15,
            styles: styles, // from array above
            mapTypeControl: false // turn off terrain, satellite controls
        });

        // Create elements for marker creation and highlighting
        self.largeInfowindow = new google.maps.InfoWindow();
        self.defaultIcon = self.makeMarkerIcon('0091ff');
        self.highlightedIcon = self.makeMarkerIcon('FFFF24');

        // restaurantList length determines number of markers needed
        var len = self.restaurantList().length;

        // make sure we have restaurants
        if (len > 0) {
            // if so, define marker bounds
            var bounds = new google.maps.LatLngBounds();
            // create a marker for each Restaurant from restaurantList
            for (var i = 0; i < len; i++) {
                var position = self.restaurantList()[i].location();
                var title = self.restaurantList()[i].name();
                var marker = new google.maps.Marker({
                    position: position,
                    title: title,
                    animation: google.maps.Animation.DROP,
                    icon: self.defaultIcon,
                    id: i
                });
                marker.setMap(this.map); // put marker on map
                markers.push(marker); // add marker to global markers array

                // set click listener for each marker id
                this.markerClick(marker);

                // if necessary, extend bounds to fit markers created
                bounds.extend(marker.position);
            }
            this.map.fitBounds(bounds);
        }
    };

    this.markerClick = function (markerCopy) {
        markerCopy.addListener('click', function () {
            self.highlightRestaurant(self.restaurantList()[markerCopy.id]);
        });
    };

    // This callback function 
    // helps catch authentication errors in Google Maps API
    // Posts an alert when error received
    function gm_authFailure() {
        alert('Google maps failed to load!');
    }

    // This function takes in a COLOR, and then creates a new marker
    // icon of that color. The icon will be 21 px wide by 34 high, have an origin
    // of 0, 0 and be anchored at 10, 34).
    // Adapted from course code, New York Listings
    this.makeMarkerIcon = function (markerColor) {
        var markerImage = new google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
            '|40|_|%E2%80%A2',
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(21, 34));
        return markerImage;
    };

    // Displays markers in a range from start to stop. Markers array index
    // matches restaurantList array index. So each marker corresponds to
    // Restaurant from restaurantList. Range should capture Restaurants
    // matching a cuisine type. Therefore, all Restaurants need to be sorted
    // by cuisine in restaurantList to have simple range for cuisine type.
    this.displayMarkers = function (start, stop) {
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
    };

    // Clears all animation and highlighting from all markers.
    this.clearMarkers = function () {
        var len = self.restaurantList().length;
        for (var i = 0; i < len; i++) {
            markers[i].setAnimation(null);
            markers[i].setIcon(self.defaultIcon);
        }
    };

    // This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
    this.populateInfoWindow = function (marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker !== marker) {
            self.clearMarkers();
            marker.setIcon(self.highlightedIcon);
            marker.setAnimation(google.maps.Animation.BOUNCE);
            // Clear the infowindow content. Gives JSON get time to load.
            infowindow.setContent('');
            infowindow.marker = marker;
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                infowindow.marker = null;
                marker.setIcon(self.defaultIcon);
                marker.setAnimation(null);
                self.currentRestaurant().selected(false);
            });

            // prepare elements for JSON get from Foursquare API to fetch photo
            var restaurantID = self.restaurantList()[marker.id].id();
            var foursquarePrefix = "https://api.foursquare.com/v2/venues/";
            var foursquareSuffix = "/photos";

            // get JSON info from Foursquare for venue photo.
            $.getJSON(foursquarePrefix + restaurantID + foursquareSuffix, {
                    limit: 1, // only one photo required
                    v: "20170801",
                    client_id: "PP3RWERUTIA1OI3DNHTIKX4T2WSJ0L1UEXUXPEZ1Z2BFY2RM",
                    client_secret: "FNI4MCR2USHA21HA4V0RHS3SFHZ4GXSHLMZACQESYYUKAODT"
                }, function (data) {
                    // even if successful get, make sure Foursquare API retrieved a photo
                    if (data.response.photos.count === 0) {
                        // if not, display error message in infoWindow
                        infowindow.setContent('<div>' + marker.title + '</div>' +
                            '<div>No Image Found</div>');
                    } else {
                        // if so, set elements for photo in html src
                        var imagePrefix = data.response.photos.items[0].prefix;
                        var imageSuffix = data.response.photos.items[0].suffix;
                        var size = "300x300";
                        var credit = data.response.photos.items[0].source.name;
                        var creditUrl = data.response.photos.items[0].source.url;
                        infowindow.setContent('<div class="infoWindow"><p>' + marker.title + '</p><div><img src="' + imagePrefix + size + imageSuffix + '" alt="' + marker.title + ' picture" ></div><p>Image credit: <a href="' + creditUrl + '">' + credit + '</a></p></div>');
                    }
                })
                .fail(function () {
                    infowindow.setContent('<div>' + marker.title + '</div>' +
                        '<div>No Image Found</div>');
                    alert("Unable to retrieve photo.");
                });
            infowindow.open(self.map, marker); // open infoWindow on associated marker
        }
    };
};

// make it go!
var vm = new ViewModel();
ko.applyBindings(vm);
