
/*
This script handles package data for the application. It includes functions to load, process, and display package information.

PackageId
Recipient
Adress

From
Company
Adress

CurrentLocation
Longtitude
Latitude

CurrentStatus


*/

// The order of the steps shown in the status tracker
const STATUSES = ["warehouse", "pickedUp", "inTransit", "collectionPoint"];

let packages = [];

// Loads all packages from the JSON file (only fetched once)
async function loadPackages() {
    if (packages.length > 0) {
        return packages;
    }
    const response = await fetch("data/packages.json");
    if (!response.ok) {
        throw new Error("Could not load package data");
    }
    packages = await response.json();
    return packages;
}

// Finds a package by its id, ignoring case and extra spaces
function findPackage(packageId) {
    const id = packageId.trim().toUpperCase();
    return packages.find(p => p.packageId.toUpperCase() === id) || null;
}

// Returns which step (0-3) in the tracker the package has reached
function getStatusIndex(pkg) {
    return STATUSES.indexOf(pkg.currentStatus);
}

// Turns "2026-10-21T14:00" into "2026-10-21 14:00"
function formatDateTime(dateText) {
    return dateText.replace("T", " ");
}
