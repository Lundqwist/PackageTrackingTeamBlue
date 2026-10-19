
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

/*
  HOW THIS FILE IS USED
  ---------------------
  This file is loaded with a normal <script> tag in index.html and status.html.
  Everything declared at the top level here (STATUSES, packages, loadPackages, ...)
  becomes "global", which means the other scripts on the same page can use it.
  That is how status.html can call findPackage() even though it is written here.
*/

// An array (a list) of the possible statuses, in the order they happen.
// "const" means the variable can never be pointed at a new value.
// The position (index) in the list is used by the progress tracker:
//   0 = warehouse, 1 = pickedUp, 2 = inTransit, 3 = collectionPoint
const STATUSES = ["warehouse", "pickedUp", "inTransit", "collectionPoint"];

// "let" is used instead of "const" because we replace the empty list
// with the real data once it has been loaded from the JSON file.
let packages = [];

/*
  Loads all packages from data/packages.json.

  "async" means the function does work that takes time (downloading a file).
  An async function always returns a Promise: a "promise" of a value that
  will arrive later. The caller can wait for it with "await" or ".then()".

  The data is only downloaded once. The next time the function is called,
  the list we already have is returned straight away (a simple cache).
*/
async function loadPackages() {
    if (packages.length > 0) {
        return packages;
    }

    // fetch() asks the web server for a file. "await" pauses this function
    // until the answer comes back, without freezing the rest of the page.
    // NOTE: fetch does not work when you open the HTML file directly from disk
    // (file://). The page must be served by a web server, e.g. Live Server.
    const response = await fetch("data/packages.json");

    // response.ok is false for errors such as 404 (file not found).
    // "throw" stops the function and sends the error to whoever called it,
    // where it can be caught with try/catch or .catch().
    if (!response.ok) {
        throw new Error("Could not load package data");
    }

    // .json() reads the text of the file and turns it into JavaScript
    // objects and arrays that we can work with.
    packages = await response.json();
    return packages;
}

/*
  Finds one package by its id, e.g. "sl-100234 " finds "SL-100234".

  trim() removes spaces at the start and end, and toUpperCase() makes the
  search case-insensitive, because users don't always type exactly right.

  Array.find() goes through the list and returns the first item where the
  arrow function returns true. If nothing matches it returns undefined,
  so "|| null" turns that into null, which is easier to check for.
*/
function findPackage(packageId) {
    const id = packageId.trim().toUpperCase();
    return packages.find(p => p.packageId.toUpperCase() === id) || null;
}

// Returns which step (0-3) in the tracker the package has reached.
// indexOf() gives the position of a value in an array (or -1 if not found).
function getStatusIndex(pkg) {
    return STATUSES.indexOf(pkg.currentStatus);
}

// Turns "2026-10-21T14:00" into "2026-10-21 14:00".
// The "T" is part of the standard ISO date format used in the JSON file,
// but it looks nicer to the user with a space instead.
function formatDateTime(dateText) {
    return dateText.replace("T", " ");
}
