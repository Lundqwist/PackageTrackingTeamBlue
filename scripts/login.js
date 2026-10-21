/*
  login.js - NOT WRITTEN YET. This file only holds the plan.

  It is already loaded by index.html and status.html, so code written here
  will run on those pages without changing the HTML.

  THE PLAN
  --------
  1. Store a password in a JSON file (like data/packages.json).
  2. Load it with fetch(), the same way loadPackages() does in packagehandling.js.
  3. Compare it with what the user types in.
  4. Save the result in a boolean variable (a variable that is either true or
     false), e.g. let isLoggedIn = false; and set it to true if the password
     is correct.
  5. maptracking.js / status.html can then check isLoggedIn and only show
     the map to logged-in users.

  NOTE: this is fine for practice, but it is NOT real security. Anyone can open
  the JSON file in the browser and read the password. Real logins check the
  password on a server that the user cannot see into.
*/
