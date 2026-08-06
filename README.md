# Overview

This project is a browser-based GIS mapping application that displays landmark locations in Praia, Cabo Verde. It uses the ArcGIS SDK for JavaScript to render an interactive map with landmark markers, popups, filtering controls, and a sidebar listing.

The application loads landmark data from a local JSON file (`landmarks.json`) containing coordinates, category, and descriptive text for each landmark. Each landmark is drawn as a graphic on the ArcGIS map and includes a popup with the landmark name, category, and description.

# Features

* Interactive ArcGIS web map using the ArcGIS SDK for JavaScript
* Landmark filtering by category
* Search by landmark name, description, or category
* Sidebar list of landmarks with count display
* Marker popups with landmark details
* Reset button to restore initial map view and filters

# Usage

1. Open `index.html` in a modern browser.
2. The map loads automatically and displays landmarks from `landmarks.json`.
3. Use the category dropdown to filter landmarks by category.
4. Enter text in the search box to filter by name, description, or category.
5. Click the `Reset` button to return the map to the default center and clear filters.

# Data Source

Landmark information is stored locally in `landmarks.json`. The dataset includes locations such as:

* Praia Plateau
* Praia City Hall
* Presidential Palace
* National Library of Cape Verde
* Ethnographic Museum
* Quebra Canela Beach

The JSON file contains landmark name, latitude, longitude, category, and description values used to create map graphics.

The purpose of building this software is to improve practical web development skills in JavaScript, HTML, and CSS while learning how to represent geospatial data in a visual form. It is designed to demonstrate how location-based data can be presented in a clean, user-friendly interface.

# Development Environment

The software was developed using Visual Studio Code and runs entirely in the browser. The project uses HTML for structure, CSS for styling, and JavaScript for application logic.

This software uses the ArcGIS SDK for JavaScript to render the map, display landmarks as graphics, and handle interactive map controls. Landmark data is loaded from `landmarks.json` and displayed using ArcGIS map widgets.

# Useful Websites

Helpful ArcGIS resources used while developing this project:

* [ArcGIS SDK for JavaScript Tutorials](https://developers.arcgis.com/javascript/latest/tutorials/)
* [ArcGIS SDK for JavaScript - Display a Map Tutorial](https://developers.arcgis.com/javascript/latest/tutorials/display-a-map/)
* [ArcGIS SDK for JavaScript - Add a Point, line, polygon Tutorial](https://developers.arcgis.com/javascript/latest/tutorials/add-a-point-line-and-polygon/)

# Future Work

Future improvements for this project include:

* Enhance popup templates to include images, links, structured attributes, and related content for each landmark.
* Improve layout responsiveness so the map displays well on mobile devices.
* Add click behavior on sidebar items so selecting a landmark centers the map on that location.
