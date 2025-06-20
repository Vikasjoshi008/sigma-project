	mapboxgl.accessToken = maptoken;
    const map = new mapboxgl.Map({
        container: "map", // container ID
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 10, // starting zoom
        style: 'mapbox://styles/mapbox/standard',
    });

    // const marker= new mapboxgl.Marker({color: "red"})
    // .setLngLat(listing.geometry.coordinates) //listing.geometry.coordinates
    // .setPopup(new mapboxgl.Popup({offset: 25})
    // .setHTML(`<h4>${listing.location}</h4><p>Exact Location will be provided after booking!</p>`)
    // .setMaxWidth("300px")
    // .addTo(map))
    // .addTo(map);

    ///adding icon to the map
    map.on('load', () => {
        // Load an image from an external URL.
        map.loadImage(
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU-0sgMITwNqzwWbNZfDxjhGmmje755YgLHQ&s",
            (error, image) => {
                if (error) throw error;

                // Add the image to the map style.
                map.addImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU-0sgMITwNqzwWbNZfDxjhGmmje755YgLHQ&s", image);

                // Add a data source containing one point feature.
                map.addSource('point', {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [
                            {
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': listing.geometry.coordinates,
                                }
                            }
                        ]
                    }
                });

                // Add a layer to use the image to represent the data.
                map.addLayer({
                    'id': 'points',
                    'type': 'symbol',
                    'source': 'point', // reference the data source
                    'layout': {
                        'icon-image': "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU-0sgMITwNqzwWbNZfDxjhGmmje755YgLHQ&s", // reference the image
                        'icon-size': 0.25
                    }
                });
            }
        );
    });