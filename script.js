// const [
//     Map,
//     MapView,
//     Graphic,
//     GraphicsLayer
// ] = await Promise.all([
//     $arcgis.import("@arcgis/core/Map.js"),
//     $arcgis.import("@arcgis/core/views/MapView.js"),
//     $arcgis.import("@arcgis/core/Graphic.js"),
//     $arcgis.import("@arcgis/core/layers/GraphicsLayer.js")
// ]);

const [Graphic, Map, GraphicsLayer] = await $arcgis.import([
    "@arcgis/core/Graphic.js",
    "@arcgis/core/Map.js",
    "@arcgis/core/layers/GraphicsLayer.js",
]);

const viewElement = document.querySelector("arcgis-map");

const graphicsLayer = new GraphicsLayer();

viewElement.map = new Map({ basemap: "arcgis/streets", layers: [graphicsLayer] });

// const point = {
//     //Create a point
//     type: "point",
//     longitude: -118.80657463861,
//     latitude: 34.0005930608889,
//     };

const simpleMarkerSymbol = {
    type: "simple-marker",
    color: [226, 119, 40], // Orange
    outline: {
        color: [255, 255, 255], // White
        width: 1,
    },
};

// const pointGraphic = new Graphic({ geometry: point, symbol: simpleMarkerSymbol });
// graphicsLayer.add(pointGraphic);

// Load landmarks from the local JSON file and create a point for each
async function loadLandmarks() {
    try {
        const res = await fetch('landmarks.json');
        if (!res.ok) throw new Error(`Failed to load landmarks.json: ${res.status}`);
        const landmarks = await res.json();

        landmarks.forEach(lm => {
            const geom = {
                type: 'point',
                longitude: lm.longitude,
                latitude: lm.latitude
            };

            const attributes = {
                Name: lm.name,
                Category: lm.category,
                Description: lm.description
            };

            const popupTemplate = {
                title: '{Name}',
                content: '{Description}<br/><b>Category:</b> {Category}'
            };

            const g = new Graphic({ geometry: geom, symbol: simpleMarkerSymbol, attributes, popupTemplate });
            graphicsLayer.add(g);
        });
    } catch (err) {
        console.error(err);
    }
}

loadLandmarks();