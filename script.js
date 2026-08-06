const [Graphic, Map, GraphicsLayer] = await $arcgis.import([
    "@arcgis/core/Graphic.js",
    "@arcgis/core/Map.js",
    "@arcgis/core/layers/GraphicsLayer.js"
]);

// Get Map Component
const mapElement = document.querySelector("arcgis-map");

// Create Landmark Graphics Layer
const graphicsLayer = new GraphicsLayer();

mapElement.map = new Map({ basemap: "streets-navigation-vector", layers: [graphicsLayer] });


// Load landmarks from local JSON file
async function loadLandmarks () {
    try {
        const response = await fetch("landmarks.json");

        if (!response.ok) {
            throw new Error("Failed to load landmarks.json");
        }

        const landmarks = await response.json();

        return landmarks;
    }
    catch (err) {
        console.error(err);
    }
}

let landmarks = await loadLandmarks();

// Category Symbol
function getSymbol(category) {
    let color = "#1f77b4";

    if (category === "Historical") {
        color = "#8b4513";
    }

    if (category === "Museum") {
        color = "#800080";
    }

    if (category === "Park") {
        color = "#228b22";
    }

    if (category === "Beach") {
        color = "#00a6d6";
    }

    if (category === "Religious") {
        color = "#daa520";
    }

    if (category === "Cultural") {
        color = "#444444";
    }

    return {
        type: "simple-marker",
        color: color,
        outline: {
            color: "white",
            width: 1
        }
    };
}

// Create Graphic
function createLandmarkGraphic(landmark) {

    const point = {
        type: "point",
        longitude: landmark.longitude,
        latitude: landmark.latitude
    };

    return new Graphic({
        geometry: point,
        symbol: getSymbol(landmark.category),
        atributes: landmark,
        popupTemplate: {
            title: `${landmark.name}`,
            content: [
                {
                    type: "text",
                    text: `
                        <b>Category:</b>
                        ${landmark.category}
                        <br><br>

                        ${landmark.description}
                    `
                }
            ]
        }
    });
}

// // Display Landmarks
function displayLandmarks(data) {
    graphicsLayer.removeAll();

    const graphics = data.map(createLandmarkGraphic);

    graphicsLayer.addMany(graphics);
}

// Update Sidebar
function updateSidebar(data) {
    const list = document.getElementById("landmarkList");
    const count = document.getElementById("landmarkCount");

    list.innerHTML = "";

    count.textContent = `${data.length} landmark${data.length !== 1 ? "s" : ""}`;

    data.forEach(landmark => {
        const item = document.createElement("div");

        item.className = "landmark-item";

        item.innerHTML = `
            <h3>${landmark.name}</h3>

            <p class="category">${landmark.category}</p>

            <p>${landmark.description}</p>
        `;

        list.appendChild(item);
    });
}

// Filter
function filterLandmarks() {
    const category = document.getElementById("categoryFilter").value;

    const search = document.getElementById("searchBox").value.trim().toLowerCase();

    const filtered = landmarks.filter(landmark => {
        const matchesCategory = 
            category === "All" || 
            landmark.category === category;

        const matchesSearch =
            landmark.name.toLowerCase().includes(search)
            ||
            landmark.description.toLowerCase().includes(search)
            ||
            landmark.category.toLowerCase().includes(search)

        return ( matchesCategory && matchesSearch);
    });

    displayLandmarks(filtered);

    updateSidebar(filtered);
}

// Filter Events
document.getElementById("categoryFilter").addEventListener("change", filterLandmarks);

document.getElementById("searchBox").addEventListener("input", filterLandmarks);

// Reset
document
    .getElementById("resetButton")
    .addEventListener(
        "click",
        () => {
            document.getElementById("categoryFilter").value = "All";

            document.getElementById("searchBox").value = "";

            filterLandmarks();

            mapElement.goTo({
                center: [-23.509, 14.918],
                zoom: 13
            });
        }
    );

// Initial display
displayLandmarks(landmarks);

// Update sidebar
updateSidebar(landmarks)