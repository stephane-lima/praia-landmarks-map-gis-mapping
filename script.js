const [Graphic, Map, GraphicsLayer] = await $arcgis.import([
    "@arcgis/core/Graphic.js",
    "@arcgis/core/Map.js",
    "@arcgis/core/layers/GraphicsLayer.js"
]);

// Locate the ArcGIS web component in the page.
const mapElement = document.querySelector("arcgis-map");

// Create a graphics layer to hold all landmark markers.
const graphicsLayer = new GraphicsLayer();

// Initialize the map with a navigation basemap and attach the landmark layer.
mapElement.map = new Map({ basemap: "streets-navigation-vector", layers: [graphicsLayer] });


// Load landmarks from local JSON file and return parsed data.
// If loading fails, log the error to the console.
async function loadLandmarks () {
    try {
        // Fetch the local JSON file containing landmark data.
        const response = await fetch("landmarks.json");

        if (!response.ok) {
            // Throw an error when the file cannot be loaded.
            throw new Error("Failed to load landmarks.json");
        }

        // Parse the JSON response into a JavaScript object.
        const landmarks = await response.json();

        return landmarks;
    }
    catch (err) {
        // Log any fetch or parse errors to the console.
        console.error(err);
    }
}

let landmarks = await loadLandmarks();

// Return a simple marker symbol for the given category.
// The symbol color is chosen to match landmark categories on the map.
function getSymbol(category) {

    let color = "";

    if (category === "Historical") {
        // Use brown for historical sites.
        color = "#8b4513";
    }

    else if (category === "Museum") {
        // Use purple for museums.
        color = "#800080";
    }

    else if (category === "Park") {
        // Use green for parks.
        color = "#228b22";
    }

    else if (category === "Beach") {
        // Use blue for beaches.
        color = "#00a6d6";
    }

    else if (category === "Religious") {
        // Use gold for religious landmarks.
        color = "#daa520";
    }

    else if (category === "Cultural") {
        // Use dark gray for cultural locations.
        color = "#444444";
    }

    else {
        // Default symbol color for uncategorized landmarks.
        color = "#1f77b4";
    }

    // Return a simple marker with the selected fill color and white outline.
    return {
        type: "simple-marker",
        color: color,
        outline: {
            color: "white",
            width: 1
        }
    };
}

// Build a Graphic object for a single landmark.
// Includes location geometry, category symbol, and popup content.
function createLandmarkGraphic(landmark) {

    // Build a point geometry using the landmark coordinates.
    const point = {
        type: "point",
        longitude: landmark.longitude,
        latitude: landmark.latitude
    };

    return new Graphic({
        // Set the point geometry for the landmark marker.
        geometry: point,
        // Use the category-specific symbol color.
        symbol: getSymbol(landmark.category),
        // Attach the original landmark data to the graphic.
        atributes: landmark,
        popupTemplate: {
            // Use the landmark name as the popup title.
            title: `${landmark.name}`,
            content: [
                {
                    type: "text",
                    // Display category and description in the popup.
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

// Display landmarks on the map by clearing previous markers and adding new graphics.
function displayLandmarks(data) {
    // Clear existing map markers before drawing new ones.
    graphicsLayer.removeAll();

    // Convert each landmark object into a graphic for the map.
    const graphics = data.map(createLandmarkGraphic);

    // Add all generated graphics to the map layer.
    graphicsLayer.addMany(graphics);
}

// Update the sidebar list and count display for the visible landmarks.
function updateSidebar(data) {
    const list = document.getElementById("landmarkList");
    const count = document.getElementById("landmarkCount");

    // Clear the previous list items before rendering the new set.
    list.innerHTML = "";

    // Update the sidebar count to show how many landmarks are visible.
    count.textContent = `${data.length} landmark${data.length !== 1 ? "s" : ""}`;

    data.forEach(landmark => {
        // Create a container element for the sidebar entry.
        const item = document.createElement("div");

        // Apply the sidebar item style class.
        item.className = "landmark-item";

        // Use the landmark data to build the HTML content for the list.
        item.innerHTML = `
            <h3>${landmark.name}</h3>

            <p class="category">${landmark.category}</p>

            <p>${landmark.description}</p>
        `;

        // Add the landmark entry to the sidebar list.
        list.appendChild(item);
    });
}

// Filter landmarks by selected category and search input, then refresh the map and sidebar.
function filterLandmarks() {
    const category = document.getElementById("categoryFilter").value;

    // Normalize the search text for case-insensitive matching.
    const search = document.getElementById("searchBox").value.trim().toLowerCase();

    const filtered = landmarks.filter(landmark => {
        // Keep every landmark when the selected category is 'All'.
        // Otherwise only match the exact selected category.
        const matchesCategory = 
            category === "All" || 
            landmark.category === category;

        // Match landmark name, description, or category against the search term.
        const matchesSearch =
            landmark.name.toLowerCase().includes(search)
            ||
            landmark.description.toLowerCase().includes(search)
            ||
            landmark.category.toLowerCase().includes(search)

        // Only keep landmarks that match both the category and search filters.
        return ( matchesCategory && matchesSearch);
    });

    displayLandmarks(filtered);

    updateSidebar(filtered);
}

// Attach filter event listeners to update landmarks when the UI changes.
document.getElementById("categoryFilter").addEventListener("change", filterLandmarks);

document.getElementById("searchBox").addEventListener("input", filterLandmarks);

// Reset filters and return the map view to the default center.
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