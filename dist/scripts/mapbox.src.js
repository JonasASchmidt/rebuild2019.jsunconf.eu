mapboxgl.accessToken = 'pk.eyJ1IjoianN1bmNvbmYiLCJhIjoiY2lqdTV3cjNwMDAxYnU5bTRnNzg3cWU0byJ9.tRs9vvtTl1JpoRUzqTbGaQ';

var map = new mapboxgl.Map({
    container: 'map-canvas',
    style: 'mapbox://styles/jsunconf/ciju5ysiq00fvbpm373dkh84x',
    center: [9.995, 53.570],
    zoom: 12,
    scrollZoom: false,
    touchZoomRotate: false
});

map.addControl(new mapboxgl.Navigation());

/*
 * Available marker types are: bar and university.
 * Can add more, just ping me.
 */
var markers = {
    type: 'FeatureCollection',
    features: [{
            type: 'Feature',
            properties: {
                'marker-symbol': 'university',
                description: '<strong>Berufliche Schule für Medien und Kommunikation</strong><br />Eulenkamp 46<br />22049 Hamburg<br /><br /><a href="https://www.google.de/maps/place/Berufliche+Schule+f%C3%BCr+Medien+und+Kommunikation/@53.58119,10.0685813,17z/data=!3m1!4b1!4m5!3m4!1s0x4163bb576c95a7df:0xa76f0c9d429e081f!8m2!3d53.58119!4d10.07077" target="_blank" title="Navigate">&raquo; Navigate here</a>'
            },
            geometry: {
                type: 'Point',
                coordinates: [10.070908, 53.581185]
            }
        }
        // , {
        //     type: 'Feature',
        //     properties: {
        //         'marker-symbol': 'bar',
        //         description: '<strong>Laundrette</strong><br />Ottenser Hauptstraße 56<br />22765 Hamburg<br /><br />Friday, April 20th 2018<br />Starting at 19h<br /><br /><a href="https://www.google.dk/maps/place/Laundrette/@53.5517547,9.9243693,17z/data=!3m1!4b1!4m5!3m4!1s0x47b1858541c9e3ad:0x4587af3a24012661!8m2!3d53.5517547!4d9.926558" target="_blank" title="Navigate">&raquo; Navigate here</a>'
        //     },
        //     geometry: {
        //         type: 'Point',
        //         coordinates: [9.9243693, 53.5517547]
        //     }
        // }, {
        //     type: 'Feature',
        //     properties: {
        //         'marker-symbol': 'bar',
        //         description: '<strong>Good Old Days</strong><br />Max-Brauer-Allee 275<br />22769 Hamburg<br /><br />Saturday, April 21st 2018<br />Starting at 20h<br /><br /><a href="https://www.google.de/maps/place/Good+Old+Days+Dance+Bar/@53.563565,9.9570948,17z/data=!3m1!4b1!4m2!3m1!1s0x47b18f42d354b6e7:0x2409f6f2f52cd803" target="_blank" title="Navigate">&raquo; Navigate here</a>'
        //     },
        //     geometry: {
        //         type: 'Point',
        //         coordinates: [9.95911, 53.5635]
        //     }
        // }
    ]
}

map.on('style.load', function() {
    map.addSource('markers', {
        type: 'geojson',
        data: markers
    });
    map.addLayer({
        id: 'markers',
        interactive: true,
        type: 'symbol',
        source: 'markers',
        layout: {
            'icon-allow-overlap': true,
            'icon-image': '{marker-symbol}',
            'icon-offset': [0, -16]
        }
    });
});

map.on('click', function(e) {
    map.featuresAt(e.point, { layer: 'markers', radius: 32, includeGeometry: true }, function(err, features) {
        if (err || !features.length) return;

        var feature = features[0];
        new mapboxgl.Popup()
            .setLngLat(feature.geometry.coordinates)
            .setHTML(feature.properties.description)
            .addTo(map);
    });
});

map.on('mousemove', function(e) {
    map.featuresAt(e.point, { layer: 'markers', radius: 32 }, function(err, features) {
        map.getCanvas().style.cursor = (!err && features.length) ? 'pointer' : '';
    });
});