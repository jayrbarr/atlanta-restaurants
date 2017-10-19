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
