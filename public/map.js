
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
container : 'map', // container ID
center: listings.geomentry.coordinates, // starting position [lng, lat]
zoom: 9 // starting zoom
})

// Create a new marker. 
const marker = new mapboxgl.Marker({color:"red"})
.setLngLat(listings.geomentry.coordinates)
.setPopup(new mapboxgl.Popup({offset: 25}).setHTML(`<h4>${listings.location}</h4><p>Exact location after search</p>`))
.addTo(map);