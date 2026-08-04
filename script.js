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

const point = {
    //Create a point
    type: "point",
    longitude: -118.80657463861,
    latitude: 34.0005930608889,
    };

    const simpleMarkerSymbol = {
    type: "simple-marker",
    color: [226, 119, 40], // Orange
    outline: {
        color: [255, 255, 255], // White
        width: 1,
    },
};

const pointGraphic = new Graphic({ geometry: point, symbol: simpleMarkerSymbol });
graphicsLayer.add(pointGraphic);


// const map = new Map({
//     // Utilize estes estilos antigos/públicos que não pedem chave:
//     basemap: "streets-vector" // ou "topo-vector", "satellite", "hybrid"
// });

// const view = new MapView({
//     container: "viewDiv",
//     map: map,
//     zoom: 14,
//     center: [-23.5133, 14.9177]
// });

